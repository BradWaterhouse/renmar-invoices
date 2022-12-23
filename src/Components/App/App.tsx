import React, {ReactElement, useEffect, useState} from 'react';
// @ts-ignore
import {saveAs} from 'file-saver';
import {pdf} from '@react-pdf/renderer';
// @ts-ignore
import {DateTime} from "luxon";
// @ts-ignore
import {Helmet} from 'react-helmet';
import './../../Assets/Css/App.css';
import 'bulma/css/bulma.css';
import Pdf from "../Pdf/Pdf";
import {AddActivity} from "../Activities/AddActivity";
import {General} from "../General/General";
import {Description} from "../Description/Description";
import {Address} from "../Address/Address";
import {AddItem} from "../AddItem/AddItem";

export const App = (): ReactElement => {
    const [invoiceNumber, setInvoiceNumber] = useState<string>("");
    const [projectName, setProjectName] = useState<string>("");
    const [clientName, setClientName] = useState<string>("");
    const [streetName, setStreetName] = useState<string>("");
    const [town, setTown] = useState<string>("");
    const [postcode, setPostcode] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [activities, setActivities] = useState<{ name: string; price: number }[]>([]);
    const [requirements, setRequirements] = useState<string[]>([]);
    const [exclusions, setExclusions] = useState<string[]>([]);

    useEffect((): void => setInvoiceNumber(DateTime.local().toFormat("yyMdHs")), []);

    const addActivity = (activity: { name: string; price: number }): void => {
        setActivities([...activities, activity])
    };

    const addRequirement = (requirement: string): void => {
        setRequirements([...requirements, requirement])
    };

    const addExclusion = (exclusion: string): void => {
        setExclusions([...exclusions, exclusion])
    };

    const removeActivity = (index: number): void => {
        const newActivities = [...activities];
        newActivities.splice(index, 1);

        setActivities(newActivities);
    };

    const removeRequirement = (index: number): void => {
        const newRequirements = [...requirements];
        newRequirements.splice(index, 1);

        setRequirements(newRequirements);
    };

    const removeExclusion = (index: number): void => {
        const newExclusions = [...exclusions];
        newExclusions.splice(index, 1);

        setExclusions(newExclusions);
    };

    const delay = (t: any): Promise<void> => new Promise((resolve) => setTimeout(resolve, t));

    const getProps = async (): Promise<{fakePromise: string}> => {
        await delay(1_000);
        return ({
            fakePromise: 'You waited 1 second for this',
        });
    };

    return (
        <div className="app m-3">
            <Helmet>
                <title>Invoice Generator</title>
            </Helmet>
            <h1 className="title has-text-centered mt-3">Invoice Generator</h1>

            <div className="columns">
                <div className="column is-6">
                    <General projectName={projectName} clientName={clientName} invoiceNumber={invoiceNumber} setProjectName={setProjectName}
                             setClientName={setClientName}/>
                </div>
                <div className="column is-6">
                    <Address streetName={streetName} town={town} postcode={postcode} setStreetName={setStreetName}
                             setTown={setTown} setPostcode={setPostcode}/>
                </div>
            </div>

            <hr/>

            <div className="columns">
                <div className="column is-6">
                    <Description description={description} setDescription={setDescription}/>
                </div>
                <div className="column is-6">
                    <AddActivity addActivity={addActivity}/>
                    {activities.map((activity: any, index: number) => (
                        <div className="columns">
                            <div className="column is-8">
                                <span className="is-capitalized">{activity.name} - £{activity.price.toFixed(2)}</span><span><button
                                className="delete ml-4 has-background-danger" onClick={(): void => removeActivity(index)}/></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr/>

            <div className="columns">
                <div className="column">
                    <h2 className="subtitle">Project Specific Requirements</h2>
                    <AddItem addItem={addRequirement} type='Requirement' />

                    {requirements.map((requirement: string, index: number) => (
                        <div className="columns">
                            <div className="column is-12">
                                <span className="is-capitalized">{requirement}</span><span>
                                <button
                                    className="delete ml-4 has-background-danger" onClick={(): void => removeRequirement(index)}/>
                            </span>
                            </div>
                        </div>
                    ))}
                </div>
                <hr/>

                <div className="column">
                    <h2 className="subtitle">Exclusions</h2>
                    <AddItem addItem={addExclusion} type='Exclusion' />

                    {exclusions.map((exclusion: string, index: number) => (
                        <div className="columns">
                            <div className="column is-12">
                                <span className="is-capitalized">{exclusion}</span><span>
                                <button
                                    className="delete ml-4 has-background-danger" onClick={(): void => removeExclusion(index)}/>
                            </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <hr/>


            {/*<Pdf projectName={projectName}*/}
            {/*     client={{name: clientName, streetName: streetName, town: town, postcode: postcode}}*/}
            {/*     description={description} activities={activities} requirements={requirements} exclusions={exclusions}/>*/}

            <button className="button is-primary mb-5" style={{backgroundColor: "#ff831e", color: "#0d0d0d"}}
                    onClick={async () => {
                        await getProps();
                        const doc = <Pdf invoiceNumber={invoiceNumber} projectName={projectName} client={{
                            name: clientName,
                            streetName: streetName,
                            town: town,
                            postcode: postcode
                        }} activities={activities} description={description} requirements={requirements}
                                         exclusions={exclusions}/>;
                        // @ts-ignore
                        const asPdf = pdf([]); // {} is important, throws without an argument
                        asPdf.updateContainer(doc);
                        const blob = await asPdf.toBlob();
                        saveAs(blob, 'invoice_' + invoiceNumber + '.pdf');
                    }}
            >Generate PDF Invoice
            </button>
        </div>
    );
}

import React, {ReactElement, ReactNode, useState} from 'react';
// @ts-ignore
import {saveAs} from 'file-saver';
import {pdf} from '@react-pdf/renderer';
// @ts-ignore
import {Helmet} from 'react-helmet';
import ReactDOM from 'react-dom';
import './../../Assets/Css/App.css';
import 'bulma/css/bulma.css';
import Pdf from "../Pdf/Pdf";
import {AddActivity} from "../Activities/AddActivity";
import {General} from "../General/General";
import {Description} from "../Description/Description";
import {Address} from "../Address/Address";
import {AddItem} from "../AddItem/AddItem";

export const App = (): ReactElement => {
    const [projectName, setProjectName] = useState<string>("");
    const [clientName, setClientName] = useState<string>("");
    const [streetName, setStreetName] = useState<string>("");
    const [town, setTown] = useState<string>("");
    const [postcode, setPostcode] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [activities, setActivities] = useState<{ name: string; price: number }[]>([]);
    const [requirements, setRequirements] = useState<string[]>([]);
    const [exclusions, setExclusions] = useState<string[]>([]);

    const addActivity = (activity: { name: string; price: number }) => {
        setActivities([...activities, activity])
    }

    const addRequirement = (requirement: string) => {
        setRequirements([...requirements, requirement])
    }

    const addExclusion = (exclusion: string) => {
        setExclusions([...exclusions, exclusion])
    }

    const delay = (t: any) => new Promise((resolve) => setTimeout(resolve, t));

    async function getProps() {
        await delay(1_000);
        return ({
            someString: 'You waited 1 second for this',
        });
    }

    return (
        <div className="container">
            <Helmet>
                <title>Invoice Generator</title>
            </Helmet>
            <h1 className="title has-text-centered mt-3">Renmar Construction Invoice Generator</h1>

            <General projectName={projectName} clientName={clientName} setProjectName={setProjectName}
                     setClientName={setClientName}/>
            <hr/>
            <Description description={description} setDescription={setDescription}/>
            <hr/>
            <Address streetName={streetName} town={town} postcode={postcode} setStreetName={setStreetName}
                     setTown={setTown} setPostcode={setPostcode}/>
            <hr/>

            <AddActivity addActivity={addActivity}/>

            {activities.map((activity: any) => (
                <div className="columns">
                    <div className="column is-8 is-offset-1 has-text-centered">
                        <span>{activity.name} - £{activity.price.toFixed(2)}</span><span><button
                        className="button is-small is-danger ml-2">Remove</button></span>
                    </div>
                </div>
            ))}
            <hr/>

            <h2 className="subtitle">Project Specific Requirements</h2>
            <AddItem addItem={addRequirement} type={'Requirement'}/>

            {requirements.map((requirement: string) => (
                <div className="columns">
                    <div className="column is-8 is-offset-1 has-text-centered">
                        <span>{requirement}</span><span><button
                        className="button is-small is-danger ml-2">Remove</button></span>
                    </div>
                </div>
            ))}
            <hr/>

            <h2 className="subtitle">Exclusions</h2>
            <AddItem addItem={addExclusion} type={'Exclusions'}/>

            {exclusions.map((exclusion: string) => (
                <div className="columns">
                    <div className="column is-8 is-offset-1 has-text-centered">
                        <span>{exclusion}</span><span><button
                        className="button is-small is-danger ml-2">Remove</button></span>
                    </div>
                </div>
            ))}
            <hr/>


            <Pdf projectName={projectName}
                 client={{name: clientName, streetName: streetName, town: town, postcode: postcode}}
                 description={description} activities={activities} requirements={requirements} exclusions={exclusions}/>

            <button className="button is-primary"
                    onClick={async () => {
                        await getProps();
                        const doc = <Pdf projectName={projectName} client={{
                            name: clientName,
                            streetName: streetName,
                            town: town,
                            postcode: postcode
                        }} activities={activities} description={description} requirements={requirements} exclusions={exclusions}/>;
                        // @ts-ignore
                        const asPdf = pdf([]); // {} is important, throws without an argument
                        asPdf.updateContainer(doc);
                        const blob = await asPdf.toBlob();
                        saveAs(blob, 'doc2.pdf');
                    }}
            >Download PDF
            </button>
        </div>
    );
}

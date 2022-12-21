import React, {FC, ReactElement} from "react";

interface Props {
    projectName: string;
    clientName: string;
    invoiceNumber: string;
    setProjectName: (projectName: string) => void;
    setClientName: (clientName: string) => void;
}

export const General: FC<Props> = (props: Props): ReactElement => {

    return (
        <>
            <h2 className="subtitle">General Information</h2>
            <div className="columns is-multiline">
                <div className="column is-12">
                    <label className="label" htmlFor="invoice">Invoice Number</label>
                    <input className="input" id="invoice" name="invoice" type="text" value={props.invoiceNumber} readOnly={true} />
                </div>
                <div className="column is-12">
                    <label className="label" htmlFor="project">Project Name</label>
                    <input className="input" id="project" name="project" type="text" value={props.projectName}
                           onChange={(event) => props.setProjectName(event.target.value)}/>
                </div>
                <div className="column is-12">
                    <label className="label" htmlFor="project">Client Name</label>
                    <input className="input" id="client" name="client" type="text" value={props.clientName}
                           onChange={(event) => props.setClientName(event.target.value)}/>
                </div>
            </div>
        </>
    );
}

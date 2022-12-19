import React, {FC, ReactElement} from "react";

interface Props {
    projectName: string;
    clientName: string;
    setProjectName: (projectName: string) => void;
    setClientName: (clientName: string) => void;
}

export const General: FC<Props> = (props: Props): ReactElement => {

    return (
        <>
            <h2 className="subtitle">General Information</h2>
            <div className="columns">
                <div className="column is-6">
                    <label className="label" htmlFor="project">Project Name</label>
                    <input className="input" id="project" name="project" type="text" value={props.projectName}
                           onChange={(event) => props.setProjectName(event.target.value)}/>
                </div>
                <div className="column is-6">
                    <label className="label" htmlFor="project">Client Name</label>
                    <input className="input" id="client" name="client" type="text" value={props.clientName}
                           onChange={(event) => props.setClientName(event.target.value)}/>
                </div>
            </div>
        </>
    );
}

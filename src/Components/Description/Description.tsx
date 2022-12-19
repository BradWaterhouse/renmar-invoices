import React, {FC, ReactElement} from "react";

interface Props {
    description: string;
    setDescription: (description: string) => void;
}

export const Description: FC<Props> = (props: Props): ReactElement => {

    return (
        <>
            <h2 className="subtitle">Nature Of Work</h2>
            <div className="columns">
                <div className="column is-12">
                    <label className="label" htmlFor="description">Project description</label>
                    <textarea className="textarea" id="description" name="description" value={props.description}
                              onChange={(event) => props.setDescription(event.target.value)}/>
                </div>
            </div>
        </>
    );
}

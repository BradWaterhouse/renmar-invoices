import React, {FC, ReactElement, useState} from "react";

interface Props {
    type: string
    addItem: (requirement: string) => void;
}

export const AddItem: FC<Props> = (props: Props): ReactElement => {
    const [name, setName] = useState<string>("");

    const handleAdd = (): void => {
        props.addItem(name);
        setName("");
    }

    return (
        <div className="columns">
            <div className="column is-8 is-offset-1-desktop is-offset-1-tablet">
                <input className="input" id={props.type} name={props.type} type="text" placeholder={props.type}
                       value={name}
                       onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className="column is-1 has-text-centered">
                <button className="button is-primary" id="add" name="add" disabled={name === ""}
                        onClick={handleAdd}>Add
                </button>
            </div>
        </div>
    );
}

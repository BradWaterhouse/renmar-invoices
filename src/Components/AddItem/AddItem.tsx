import React, {FC, FormEvent, ReactElement, useState} from "react";

interface Props {
    type: string
    addItem: (requirement: string) => void;
}

export const AddItem: FC<Props> = (props: Props): ReactElement => {
    const [name, setName] = useState<string>("");

    const handleAdd = (event: FormEvent): void => {
        event.preventDefault();
        props.addItem(name);
        setName("");
    }

    return (
        <form onSubmit={handleAdd}>
            <div className="columns">
                <div className="column is-10">
                    <input className="input" id={props.type} name={props.type} type="text" placeholder={props.type}
                           value={name}
                           onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="column is-1 has-text-centered">
                    <button className="button is-primary"
                            style={{backgroundColor: "#ff831e", color: "#0d0d0d"}} id="add" name="add"
                            disabled={name === ""}
                            onClick={handleAdd}>Add
                    </button>
                </div>
            </div>
        </form>
    );
}

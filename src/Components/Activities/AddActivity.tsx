import React, {FC, ReactElement, useState} from "react";

interface Props {
    addActivity: (activity: { name: string, price: number }) => void;
}

export const AddActivity: FC<Props> = (props: Props): ReactElement => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const handleAdd = (): void => {
        props.addActivity({name, price});
        setName("");
        setPrice(0);
    }

    return (
        <>
            <h2 className="subtitle">Main Activities</h2>
            <div className="columns">
                <div className="column is-4 is-offset-1-desktop is-offset-1-tablet">
                    <input className="input" id="name" name="name" type="text" placeholder="Activity Name" value={name}
                           onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="column is-4">
                    <input className="input" id="price" name="price" type="number" placeholder="Activity Price"
                           value={price} onChange={(event) => setPrice(event.target.valueAsNumber)}/>
                </div>
                <div className="column is-1 has-text-centered">
                    <button className="button is-primary" id="add" name="add" disabled={name === ""}
                            onClick={handleAdd}>Add
                    </button>
                </div>
            </div>
        </>
    );
}

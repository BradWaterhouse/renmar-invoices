import React, {FC, FormEvent, ReactElement, useState} from "react";

interface Props {
    addActivity: (activity: { name: string, price: number }) => void;
}

export const AddActivity: FC<Props> = (props: Props): ReactElement => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const handleAdd = (event: FormEvent): void => {
        event.preventDefault();
        props.addActivity({name, price});
        setName("");
        setPrice(0);
    }

    return (
        <>
            <h2 className="subtitle">Main Activities</h2>
            <form onSubmit={handleAdd}>
                <div className="columns">
                    <div className="column is-8">
                        <label className="label" htmlFor="name">Name</label>
                        <input className="input" id="name" name="name" type="text" placeholder="Activity Name"
                               value={name}
                               required={true}
                               onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div className="column is-2">
                        <label className="label" htmlFor="price">Price</label>
                        <input className="input" id="price" name="price" type="number" placeholder="Activity Price"
                               value={price} onChange={(event) => setPrice(event.target.valueAsNumber)}/>
                    </div>
                    <div className="column is-1 has-text-centered">
                        <button className="button mt-5" style={{backgroundColor: "#ff831e", color: "#0d0d0d"}} id="add"
                                name="add" disabled={name === ""}
                                onClick={handleAdd}>Add
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

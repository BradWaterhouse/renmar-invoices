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
                    <div className="column is-7">
                        <label className="label" htmlFor="name">Name</label>
                        <input className="input" id="name" name="name" type="text" placeholder="Activity Name"
                               value={name}
                               required={true}
                               onChange={(event): void => setName(event.target.value)}/>
                    </div>
                    <div className="column is-3">
                        <label className="label" htmlFor="price">Price</label>
                        <div className="field has-addons">
                            <p className="control">
                                <a className="button is-static">
                                    £
                                </a>
                            </p>
                            <p className="control is-expanded">
                                <input className="input" type="number" id="price" name="price" placeholder="Activity Price" value={price} onChange={(event) => setPrice(event.target.valueAsNumber)} />
                            </p>
                        </div>
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

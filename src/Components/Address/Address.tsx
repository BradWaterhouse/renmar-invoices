import React, {FC, ReactElement} from "react";

interface Props {
    streetName: string;
    town: string;
    postcode: string;
    setStreetName: (streetName: string) => void;
    setTown: (town: string) => void;
    setPostcode: (setPostcode: string) => void;
}

export const Address: FC<Props> = (props: Props): ReactElement => {

    return (<>
        <h2 className="subtitle">Address Information</h2>
        <div className="columns">
            <div className="column is-4">
                <label className="label" htmlFor="street">Street Name</label>
                <input className="input" id="street" name="street" type="text" value={props.streetName}
                       onChange={(event) => props.setStreetName(event.target.value)}/>
            </div>
            <div className="column is-4">
                <label className="label" htmlFor="town">Town</label>
                <input className="input" id="town" name="town" type="text" value={props.town}
                       onChange={(event) => props.setTown(event.target.value)}/>
            </div>
            <div className="column is-4">
                <label className="label" htmlFor="postcode">Postcode</label>
                <input className="input" id="postcode" name="postcode" type="text" value={props.postcode}
                       onChange={(event) => props.setPostcode(event.target.value)}/>
            </div>
        </div>
    </>);
}

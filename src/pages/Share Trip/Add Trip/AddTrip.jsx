// importing styles
import { useEffect } from "react";

// importing styles
import "./AddTrip.css"

// importing components
import UserAvatar from "../../../components/Avatar/Avatar";
import AddTripModal from "./Modal/AddTripModal";
import { Message, Typography } from "@arco-design/web-react";

const AddTrip = ({data}) => {
    return(
        <>
        <div className="add-trip-component">
            <div className="avatar">
                <UserAvatar initials={data.name} size={40} />
                <Typography.Text>
                    {data.name}
                </Typography.Text>
            </div>
            <div className="input-field">
                <AddTripModal data={data}/>
            </div>
        </div>
        </>
    )
}

export default AddTrip;
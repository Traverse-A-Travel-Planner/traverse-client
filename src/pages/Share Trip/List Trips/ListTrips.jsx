import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// importing style
import "./ListTrip.css"

// importing appwrite function and constants
import { Databases } from "appwrite";
import appwriteClient from "../../../Services/appwriteClient";
import { databaseId } from "../../../Services/config";

// importing arco-design components
import { Message, Select, Skeleton, Tag, Typography } from "@arco-design/web-react";

// importing components
import UserAvatar from "../../../components/Avatar/Avatar";
import DropdownActions from "../../../components/Actions/Dropdown/DropdownActions";
import userDataExtractor from "../../../Services/UserDataExtractor";
import { IconCheckCircleFill, IconClockCircle, IconCloseCircle } from "@arco-design/web-react/icon";

const Option = Select.Option;
const options = ["Recent", "Ratings", "Oldest"];

const actions = {
    delete: "Are you sure you want to remove this review?",
};

const ListTrip = () => {
    const [sharedTrips, setSharedTrips] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try{
                const db = new Databases(appwriteClient);

                const {documents: sharedTripsList} = await db.listDocuments(databaseId, "sharedTrips")
                const newData = await userDataExtractor(sharedTripsList);

                if (newData.success === false){
                    Message.error(newData.message)
                    setSharedTrips(sharedTripsList)
                    setLoading(false)
                    return
                }

                setSharedTrips(newData.data)
                setLoading(false)
                return
            } catch (error) {
                setLoading(false)
                Message.error("Failed to fetch shared trips")
            }
        })()
    }, [])

    console.log(sharedTrips)

    const handleFilterClick = async (value) => {
    };

    return(
        <div className="sharedTrip-wrapper">
        <div className="header-block">
          <div className="content-header">
            <Typography.Title heading={5} className="ms-4 label-header">
              Shared Trips
            </Typography.Title>
          </div>
          <div className="filter-buttons">
            <Select
              placeholder="Filter Trips"
              style={{ width: 154 }}
              onChange={handleFilterClick}
            >
              {options.map((option, index) => (
                <Option key={option} disabled={index === 3} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="sharedTrip-list">
        {loading === true ? (
          <Skeleton
            style={{ margin: "0px 0 0 0px" }}
            loading={loading}
            text={{
              rows: 3,
              width: "100%",
              style: {
                minWidth: 200,
                width: "100%",
                height: 100,
              },
            }}
            animation
          />
        ) : sharedTrips.length === 0 ? (
          <Typography.Title className="ms-4 pb-3" heading={6} bold>
            No trips shared yet
          </Typography.Title>
        ) : (
          sharedTrips.map((item, index) => {
            return (
              <>
               <div className="sharedTrip" key={item.$id}>
                <div className="left">
                  <div className="avatar">
                    <UserAvatar initials={item.name} size={40} />
                  </div>
                </div>
                <div className="row-right">
                  <div className="right">
                    <div className="sharedTrip-header">
                      <div className="sharedTrip-details">
                        <Typography.Title heading={6} className="my-0 ">
                          {item.name}
                        </Typography.Title>
                        <Typography.Text type="secondary" className="mt-1">
                            Shared on{" "}
                            {new Date(item.$createdAt).toLocaleDateString()} at{" "}
                            {new Date(item.$createdAt).toLocaleTimeString()}
                        </Typography.Text>
                      </div>
                    </div>

                    <div className="shared-trip-content mt-3">
                        <Typography.Title 
                        style={{fontSize: '17px', color: '#892BE1'}}
                        heading={6} 
                        className="my-0">
                            {item.location} {
                                item.status === "active" ? (
                                    <Tag className="ms-2" color="green" icon={<IconCheckCircleFill />}>Active</Tag>
                                ) : (
                                    item.status === "ended" ? (
                                        <Tag className="ms-2" color="red" icon={<IconClockCircle />}>Ended</Tag>
                                    ) : (
                                        <Tag className="ms-2" color="red" icon={<IconCloseCircle />}>Cancelled</Tag>
                                    )
                                )
                            }
                        </Typography.Title>
                        <Typography.Text type="secondary" className="my-0 ">
                            <i className="bi bi-airplane me-1"></i> Departure: {item.departure_date}
                        </Typography.Text>
                    </div>

                    <div className="proposals mt-3 text-muted">
                        There are 
                        <Typography.Text type="success" bold>
                            {" " + item.total_proposals + " "}
                        </Typography.Text>
                        proposals for this shared trip
                    </div>

                    <div className="description mt-3">
                      <div className="text">
                        <Typography.Text>
                          {item.message}
                        </Typography.Text>
                      </div>
                    </div>

                    <div className="contact-menu">
                        <button 
                            disabled={item.status === "active" ? false : true}
                            onClick={() => {}}
                            className="btn btn-dark shadow-sm contact-sharer-btn">
                                <i className="bi bi-chat-left-dots me-1"></i> Contact
                        </button>
                    </div>

                  </div>
                </div>
                <div className="sharedTrip-actions">
                  {item.author_id === localStorage.getItem("userId") ? (
                    <DropdownActions
                      actions={actions}
                      type="sharedTrips"
                      payload={{ ...item, id: item.$id }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              </>
            );
          })
        )}
        </div>
    </div>
    )
}

export default ListTrip;
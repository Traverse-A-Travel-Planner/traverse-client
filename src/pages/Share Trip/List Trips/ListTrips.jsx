import { useEffect, useState } from "react";

// importing style
import "./ListTrip.css";

// importing appwrite function and constants
import { Databases } from "appwrite";
import appwriteClient from "../../../Services/appwriteClient";
import { databaseId } from "../../../Services/config";

// importing arco-design components
import {
  Message,
  Select,
  Skeleton,
  Tag,
  Typography,
} from "@arco-design/web-react";

// importing components
import UserAvatar from "../../../components/Avatar/Avatar";
import DropdownActions from "../../../components/Actions/Dropdown/DropdownActions";
import userDataExtractor from "../../../Services/UserDataExtractor";
import {
  IconCheckCircleFill,
  IconClockCircle,
  IconCloseCircle,
} from "@arco-design/web-react/icon";
import { formatDateToLocal } from "../../../Services/helper";

const Option = Select.Option;
const options = ["Recent", "Ratings", "Oldest"];

const actions = {
  delete: "Are you sure you want to remove this review ?",
  cancel: "Do you want to cancel the trip ?",
};

const ListTrip = () => {
  const [sharedTrips, setSharedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSharedTrips();
  }, []);

  document.addEventListener("sharedTripCancelled", async () => {
    await fetchSharedTrips();
  });

  async function fetchSharedTrips() {
    try {
      const db = new Databases(appwriteClient);

      const { documents: sharedTripsList } = await db.listDocuments(
        databaseId,
        "sharedTrips"
      );

      const newData = await userDataExtractor(sharedTripsList);

      if (newData.success === false) {
        Message.error(newData.message);
        setLoading(false);
        return;
      }

      setSharedTrips(newData.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Message.error("Failed to fetch shared trips");
    }
  }

  document.addEventListener("newTripAdded", async () => {
    await fetchSharedTrips();
  });

  const handleFilterClick = async (value) => {};

  return (
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
            style={{ margin: "0px 0 0 20px", width: '90%', display: 'flex' }}
            loading={loading}
            text={{ 
              rows: 8,
              width: ['50%', '40%', "0%", '35%', '40%', "0%", '75%', '20%']
            }}
            image={{ shape: 'circle' }}
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

                        <Typography.Title
                          style={{ 
                            fontSize: "17px", 
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '98%',
                          }}
                          heading={6}
                          className="my-0"
                        >
                          <div>
                            {item.location}
                          </div>
                        </Typography.Title>
                        <Typography.Text type="secondary" className="my-0 ">
                          <i className="bi bi-airplane me-1"></i> Departing on{" "}
                          {formatDateToLocal(item.departure_date)}
                        </Typography.Text>
                        </div>
                      </div>

                      <div className="shared-trip-content mt-3">
                        <Typography.Text className="">
                          Shared by <Typography.Text bold>{item.name}</Typography.Text>
                        </Typography.Text>
                          <br />
                        <Typography.Text type="secondary" className="mt-1">
                          On{" "}
                          {formatDateToLocal(item.$createdAt)} at{" "}
                          {new Date(item.$createdAt).toLocaleTimeString()}
                        </Typography.Text>
                      </div>

                      <div className="description mt-3">
                        <div className="text mt-1">
                          <Typography.Text>{item.message}</Typography.Text>
                        </div>
                      </div>

                      {(item.author_id !== localStorage.getItem("userId")) && (
                          <div className="contact-menu">
                            <button
                              disabled={item.status === "active" ? false : true}
                              onClick={() => {}}
                              className="btn btn-dark shadow-sm contact-sharer-btn"
                            >
                              <i className="bi bi-chat-left-dots me-1"></i> Message {" "} {(item.name).split(" ")[0]}
                            </button>
                          </div>
                        )}
                      
                    </div>
                  </div>
                  <div className="sharedTrip-actions">
                    <div 
                    style={{
                      display: 'flex', 
                      flexDirection: 'row', 
                      gap: '0 0.5em'
                    }}
                    >
                      {item.status === "active" ? (
                          <Tag
                            color="green"
                            icon={<IconCheckCircleFill />}
                          >
                            Active
                          </Tag>
                        ) : item.status === "ended" ? (
                          <Tag
                            color="red"
                            icon={<IconClockCircle />}
                          >
                            Expired
                          </Tag>
                        ) : (
                          <Tag
                            color="red"
                            icon={<IconCloseCircle />}
                          >
                            Cancelled
                          </Tag>
                      )}

                      {
                        (item.author_id === localStorage.getItem("userId")) && (
                          <DropdownActions
                            actions={actions}
                            type="sharedTrips"
                            payload={{ ...item, id: item.$id }}
                          />
                        )
                      }
                    </div>

                    <div className="mt-1">
                        <Tag>{item.total_proposals + " "} proposals </Tag>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};
export default ListTrip;

import {
  Avatar,
  Typography,
  Image,
  Notification,
  Divider,
  Rate,
} from "@arco-design/web-react";
import { Select, Message } from "@arco-design/web-react";
import { Link } from "react-router-dom";

import { Databases, Query, Account } from "appwrite";
import appwriteClient from "../../../../utils/appwriteClient";

// importing styles
import "./PlacesList.css";
import { useEffect, useState } from "react";
import { databaseId } from "../../../../utils/config";

const Option = Select.Option;
const options = ["Recent", "Ratings", "Oldest"];

function capitalizeFirstCharacter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const ListPlaces = ({ data }) => {
  const [contributions, setContributions] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "Loading ...",
  });

  const handleFilterClick = (value) => {
    Message.info({
      content: `You select ${value}.`,
      showIcon: true,
    });
  };

  const getInitials = (name) => {
    if (!name) return;
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0));
    return initials.join("");
  };

  useEffect(() => {
    (async function () {
        const db = new Databases(appwriteClient);
        const account = new Account(appwriteClient);

        try {
            const { documents: myContributions } = await db.listDocuments(
            databaseId,
            "places",
            [Query.equal("author_id", localStorage.getItem("userId"))]
            );

            setContributions(myContributions);

            const myDetails = await account.get();
            setUserDetails(myDetails);
        } catch (error) {
            Notification.success({
            title: "Success",
            content: error.message,
            });
        }
        })();
  }, []);

  console.log(contributions)

  return (
    <div className="contributed-places-list">
      <div className="header-block">
        <div className="content-header">
          <Typography.Title heading={5} className="ms-4 label-header">
            Contributions
          </Typography.Title>
        </div>
        <div className="filter-buttons">
          <Select
            placeholder="Filter places"
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

      {contributions.length === 0 && <><Typography.Title className="ms-4 pb-3" heading={6} bold>No contributions yet</Typography.Title></>}
      {contributions &&
        contributions.map((item, index) => {
          return (
            <div className="contributed-place" key={item.$id}>
              <div className="left">
                <div className="avatar">
                  <Avatar>{getInitials(userDetails.name)}</Avatar>
                </div>
              </div>
              <div className="row-right">
                <div className="right">
                  <Typography.Title heading={6} className="my-0">{item.title}</Typography.Title>
                  <Typography.Text> {item.location_description}</Typography.Text>
                  <Typography.Text type="secondary" className="mt-1">
                    Contributed on {new Date(item.$createdAt).toLocaleDateString()} at {new Date(item.$createdAt).toLocaleTimeString()}
                  </Typography.Text>

                  <div className="description mt-2">
                    <Rate readonly defaultValue={3.5} />
                    <Typography.Text type='success'>Reviewed by {3} people</Typography.Text>

                    <div className="text">
                      <Typography.Text>
                        {item.place_description}
                      </Typography.Text>
                    </div>
                  </div>

                  <button className="btn btn-dark shadow-sm view-contributed-place-btn">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/dashboard"
                    >
                      View Details
                    </Link>
                  </button>
                </div>
                <div className="image">
                    {
                        !item.image.length ? (
                            <Image
                                width={145}
                                height={130}
                                style={{borderRadius: '5px'}}
                                src='some-error.png'
                                alt='No images found for this place'
                            />
                        ) : (
                            <Image
                                width={145}
                                height={130}
                                style={{borderRadius: '5px'}}
                                src={item.image[0]}
                                alt={item.location_description}
                            />
                        )
                    }
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListPlaces;

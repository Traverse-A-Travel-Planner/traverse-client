import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// importing styles
import "./PlacesList.css";

// importing appwrite libs and constants
import { Databases, Query, Account } from "appwrite";
import appwriteClient from "../../../../Services/appwriteClient";
import { databaseId } from "../../../../Services/config";

// arco-design components and icons
import {
  Typography,
  Image,
  Notification,
  Rate,
  Spin,
  Tag,
  Select,
  Message
} from "@arco-design/web-react";
import { IconCheckCircleFill, IconClockCircle, IconCloseCircle } from "@arco-design/web-react/icon";

// importing custom components
import UserAvatar from "../../../../components/Avatar/Avatar";
import DropdownActions from "../../../../components/Actions/Dropdown/DropdownActions";

const Option = Select.Option;
const options = ["Recent", "Ratings", "Oldest"];

const actions = {
  delete: "Are you sure you want to remove this contribution?",
};

const ListPlaces = () => {
    const [eventTriggered, setEventTriggered] = useState(false)
    const [loading, setLoading] = useState(true);
    const [contributions, setContributions] = useState([]);
    const [userDetails, setUserDetails] = useState({
        name: "Loading ...",
    });

    const navigate = useNavigate()

    const handleFilterClick = (value) => {
        Message.info({
        content: `You select ${value}.`,
        showIcon: true,
        });
    };

    async function fetchContributions() {
        const db = new Databases(appwriteClient);
        const account = new Account(appwriteClient);

        try {
        const { documents: myContributions } = await db.listDocuments(
            databaseId,
            "places",
            [Query.equal("author_id", localStorage.getItem("userId"))]
        );

        setContributions(myContributions);
        setLoading(false);

        const myDetails = await account.get();
        setUserDetails(myDetails);
        } catch (error) {
        setLoading(false);
        Notification.success({
            title: "Success",
            content: error.message,
        });
        }
    }

    useEffect(() => {
        fetchContributions();
    }, [eventTriggered]);

    // when custom event triggered, refetch the conttributions
    document.addEventListener("contributionDeleted", async () => {
        try {
            setEventTriggered(!eventTriggered)
        } catch (error) {
            setEventTriggered(!eventTriggered)
            Message.error({
                content: error.message,
            });
        }
    });

    return (
        <div className="contributed-places-list">
        <div className="header-block">
            <div className="content-header">
            <Typography.Title heading={5} className="ms-2 label-header">
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

        {loading === true ? (
            <Spin className="ms-4 mt-3 mb-2" />
        ) : contributions.length === 0 ? (
            <Typography.Title className="ms-4 pb-3" heading={6} bold>
                No contributions yet
            </Typography.Title>
        ) : (
            contributions.map((item, index) => {
            return (
                <div className="contributed-place" key={item.$id}>
                <div className="left">
                    <div className="avatar">
                    <UserAvatar initials={userDetails.name} size={40} />
                    </div>
                </div>
                <div className="row-right">
                    <div className="right">
                    <div className="contribution-header">
                        <Typography.Title heading={6} className="my-0">
                            {item.title} 
                            {
                                item.verification_status === "verified" ? (
                                    <Tag className="ms-2" icon={<IconCheckCircleFill />} color="green">Complete</Tag>
                                ) : item.verification_status === "pending" ? (
                                    <Tag className="ms-2" icon={<IconClockCircle />} color="arcoblue">Pending</Tag>
                                ) : (
                                    <Tag className="ms-2" icon={<IconCloseCircle />} color="red">Rejected</Tag>
                                )
                            }
                        </Typography.Title>
                        <Typography.Text>
                            {" "}
                            {item.location_description}
                        </Typography.Text>
                        <Typography.Text type="secondary" className="mt-1">
                            Contributed on{" "}
                            {new Date(item.$createdAt).toLocaleDateString()} at {" "}
                            {new Date(item.$createdAt).toLocaleTimeString()}
                        </Typography.Text>
                    </div>

                    <div className="description mt-2">
                        <Rate readonly defaultValue={3.5} />
                        <Typography.Text type="success" style={{color: 'rgb(var(--warning-6))'}}>
                            Reviewed by {3} people
                        </Typography.Text>

                        <div className="text">
                        <Typography.Text>
                            {item.place_description}
                        </Typography.Text>
                        </div>
                    </div>

                    <button 
                    onClick={() => navigate(`place?id=${item.$id}`)}
                    className="btn btn-dark shadow-sm view-contributed-place-btn">
                        View Details
                    </button>
                    </div>
                    <div className="image">
                    {!item.image.length ? (
                        <Image
                        width={145}
                        height={130}
                        style={{ borderRadius: "5px" }}
                        src="some-error.png"
                        alt="No images found for this place"
                        />
                    ) : (
                        <Image
                        width={145}
                        height={130}
                        style={{ borderRadius: "5px" }}
                        src={item.image[0]}
                        alt={item.location_description}
                        />
                    )}
                    </div>
                </div>
                <div className="review-actions">
                    <DropdownActions
                    actions={actions}
                    type={"contribution"}
                    payload={{ id: item.$id }}
                    />
                </div>
                </div>
            );
            })
        )}
        </div>
    );
};

export default ListPlaces;

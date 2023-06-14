import { useEffect, useState } from "react";

// importing styles
import "./GeneralDescription.css";

// arco-design components
import { Rate, Tag, Typography, Message } from "@arco-design/web-react";
import { IconCheckCircleFill, IconClockCircle, IconCloseCircle } from "@arco-design/web-react/icon";

// importing components
import { capitalizeFirstCharacter } from "../../../../Services/helper";
import UserAvatar from "../../../../components/Avatar/Avatar";
import userDataExtractor from "../../../../Services/UserDataExtractor";

const GeneralDescription = ({ state }) => {
  const [data, setData] = useState(state.placeData);

  useEffect(() => {
    (async function () {
      const newData = await userDataExtractor(data);
      if (newData.success === false){
        Message.error(newData.message)
        return
      }

      setData(newData.data)
    })()
  }, []);

  return (
    <>
      <div className="general-description-container">
        <div className="header-block">
          <div className="text-container">
            <Typography.Title heading={4} className="my-0">
              {data.title}
            </Typography.Title>
            <Typography.Title heading={6} type="secondary" className="mt-0">
              {data.location_description}
            </Typography.Title>
          </div>
          <div className="badge-container">
          {
            data.verification_status === "verified" ? (
                <Tag className="ms-2" bordered icon={<IconCheckCircleFill />} color="green">Verified</Tag>
            ) : data.verification_status === "pending" ? (
                <Tag className="ms-2" bordered icon={<IconClockCircle />} color="arcoblue">Pending</Tag>
            ) : (
                <Tag className="ms-2" bordered icon={<IconCloseCircle />} color="red">Rejected</Tag>
            )
          }
          </div>
        </div>
        <div className="keyword mt-2">
          <Tag color="gray" bordered>
            {capitalizeFirstCharacter(data.keyword)}
          </Tag>
        </div>
        <div className="rating-block">
          <Rate
            readonly
            defaultValue={data.average_rating}
            style={{ fontSize: "25px !important" }}
          />
          <Typography.Text type="success">
            {data.average_rating} star average rating
          </Typography.Text>
          <Typography.Text type="secondary" className="">
            Total of{" "}
            <Typography.Text bold>{data.total_reviews}</Typography.Text> reviews
            are posted for {data.title}
          </Typography.Text>
        </div>
        <div className="author-block mt-2">
          <Typography.Title heading={6} className="mb-1">
            Author
          </Typography.Title>
          <UserAvatar initials={data.name} size={20} />
          <Typography.Text type="secondary" className="ms-2">
            {data.name}
          </Typography.Text>
        </div>
        <div className="actions-block">
          <button className="btn btn-dark shadow-sm view-map-btn">
            <a
              href="#bottom-tab-div"
              style={{ textDecoration: "none", color: "white" }}
            >
              View Map
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default GeneralDescription;

import { Rate, Tag, Typography } from "@arco-design/web-react";
import { IconCheckCircleFill } from '@arco-design/web-react/icon';

// importing styles
import "./GeneralDescription.css"

// importing components
import { capitalizeFirstCharacter } from "../../../../Services/helper";
import UserAvatar from "../../../../components/Avatar/Avatar";

const GeneralDescription = ({state}) => {
    const data = state.placeData;
    return(
        <>
        <div className="general-description-container">
            <div className="header-block">
                <div className="text-container">
                    <Typography.Title heading={4} className="my-0">{data.title}</Typography.Title>
                    <Typography.Title heading={6} type="secondary" className="mt-0">{data.location_description}</Typography.Title>
                </div>
                <div className="badge-container">
                    <Tag 
                    bordered
                    icon={<IconCheckCircleFill />}
                    color="green">
                        {capitalizeFirstCharacter(data.verification_status)}
                    </Tag>
                </div>
            </div>
            <div className="keyword mt-2">
                <Tag 
                color="gray"
                bordered>
                    {capitalizeFirstCharacter(data.keyword)}
                </Tag>
            </div>
            <div className="rating-block">
                <Rate readonly defaultValue={data.average_rating} style={{fontSize: '25px !important'}}/>
                <Typography.Text type="success">
                    {data.average_rating} star average rating
                </Typography.Text>
                <Typography.Text type="secondary" className="">
                    Total of <Typography.Text bold>{data.total_reviews}</Typography.Text> reviews are posted for {data.title}
                </Typography.Text>
            </div>
            <div className="author-block mt-2">
                <Typography.Title heading={6} className="mb-1">Author</Typography.Title>
                <UserAvatar initials={data.author_id} size={20} />
                <Typography.Text type="secondary" className="ms-2">
                    {data.author_id}
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
    )
}

export default GeneralDescription;
import { Rate, Tag, Typography } from "@arco-design/web-react";

// importing styles
import "./GeneralDescription.css"
import { capitalizeFirstCharacter } from "../../../../Services/helper";

const GeneralDescription = ({state}) => {
    const data = state.placeData;
    console.log(data)
    return(
        <>
        <div className="general-description-container">
            <div className="header-block">
                <div className="text-container">
                    <Typography.Title heading={4} className="my-0">{data.title}</Typography.Title>
                    <Typography.Title heading={6} type="secondary" className="mt-0">{data.location_description}</Typography.Title>
                </div>
                <div className="badge-container">
                    <Tag color="#00b42a">{capitalizeFirstCharacter(data.keyword)}</Tag>
                </div>
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
            <div className="author-block"></div>
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
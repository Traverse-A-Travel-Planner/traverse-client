import {
  Typography,
  Rate,
  Image,
  Button,
  Notification,
  Spin
} from "@arco-design/web-react";
import { Select, Message } from "@arco-design/web-react";

// importing styles
import "./ListReviews.css";
import "../css/dashboardGeneric.css";

import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RatingInsights from "../components/Ratings Insights/RatingInsights";
import UserAvatar from "../../../components/Avatar/Avatar";

import { Databases, Query } from "appwrite";
import appwriteClient from "../../../Services/appwriteClient";
import { useEffect, useState } from "react";
import { databaseId } from "../../../Services/config";
import { Link } from "react-router-dom";
import DropdownActions from "../../../components/Actions/Dropdown/DropdownActions";

const Option = Select.Option;
const options = ["Recent", "Ratings", "Oldest"];

const actions = {
  delete: "Are you sure you want to remove this review?",
};

const ListReviews = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [insights, setInsights] = useState({
    totalReviewsPublished: 0,
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  });

  async function calculateInsights(reviews) {
    let obj = {
      totalReviewsPublished: 0,
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
    };

    let ratings = [0, 0, 0, 0, 0]; // Use an array to store ratings count
    let total = 0;

    for (let i = 0; i < reviews.length; i++) {
      let currentItem = parseInt(reviews[i].rating);
      total += 1;

      if (currentItem >= 1 && currentItem <= 5) {
        ratings[currentItem - 1] += 1; // Increment the corresponding rating count
      }
    }

    // updating the ratings object
    obj.oneStar = Math.floor((ratings[0] / total) * 100);
    obj.twoStar = Math.floor((ratings[1] / total) * 100);
    obj.threeStar = Math.floor((ratings[2] / total) * 100);
    obj.fourStar = Math.floor((ratings[3] / total) * 100);
    obj.fiveStar = Math.floor((ratings[4] / total) * 100);
    obj.totalReviewsPublished = total;
    setInsights(obj);
  }

  useEffect(() => {
    (async function () {
      try {
        const db = new Databases(appwriteClient);
        const { documents: myReviews } = await db.listDocuments(
          databaseId,
          "reviews",
          [Query.equal("author_id", localStorage.getItem("userId"))]
        );

        if (myReviews.length === 0){
          setLoading(false);
          return
        };
        const { documents: reviewedPlaces } = await db.listDocuments(
          databaseId,
          "places",
          [
            Query.equal(
              "$id",
              myReviews.map((item) => item["place_id"])
            ),
          ]
        );

        const finalReviewData = myReviews.map((item, i) => {
          let obj = {};
          obj = {
            ...item,
            location_description: reviewedPlaces[i].location_description,
            title: reviewedPlaces[i].title,
            image: reviewedPlaces[i].image[0],
          };

          return obj;
        });

        setReviews(finalReviewData);
        calculateInsights(finalReviewData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Notification.error({
          title: "Error",
          content: error.message,
        });
      }
    })();
  }, []);

  const handleFilterClick = (value) => {
    Message.info({
      content: `You select ${value}.`,
      showIcon: true,
    });
  };

  return (
    <div className="main-body">
      <Header />
      <div className="dashboard-content reviews">
        <Sidebar data={data} />
        <div className="content">
          <div className="url-path">Dashboard / Reviews</div>
          <div className="reviews-wrapper">
            <div className="review-list">
              <div className="header-block">
                <div className="content-header">
                  <Typography.Title heading={5} className="ms-4 label-header">
                    Reviews
                  </Typography.Title>
                </div>
                <div className="filter-buttons">
                  <Select
                    placeholder="Filter Reviews"
                    style={{ width: 154 }}
                    onChange={handleFilterClick}
                  >
                    {options.map((option, index) => (
                      <Option
                        key={option}
                        disabled={index === 3}
                        value={option}
                      >
                        {option}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              {loading === true ? (
                <Spin className="ms-4 mt-3 mb-4" />
              ) : reviews.length === 0 ? (
                <Typography.Title className="ms-4 pb-3" heading={6} bold>
                  No reviews posted yet
                </Typography.Title>
              ) : (
                reviews.map((item, index) => {
                  return (
                    <div className="review" key={item.$id}>
                      <div className="left">
                        <div className="avatar">
                          <UserAvatar initials={data?.full_name} size={40} />
                        </div>
                      </div>
                      <div className="row-right">
                        <div className="right">
                          <div className="review-header">
                            <div className="place-details">
                              <Typography.Title heading={6} className="my-0 ">
                                {item.title}
                              </Typography.Title>
                              <Typography.Text type="secondary">
                                {item.location_description}
                              </Typography.Text>
                            </div>
                          </div>

                          <div className="rating mt-2">
                            <Rate readonly defaultValue={item.rating} />
                            <Typography.Text type="success">
                              {item.rating} star review
                            </Typography.Text>
                            <Typography.Text type="secondary" className="">
                              Reviewed on{" "}
                              {new Date(item.$createdAt).toLocaleDateString()}{" "}
                              at{" "}
                              {new Date(item.$createdAt).toLocaleTimeString()}
                            </Typography.Text>
                          </div>

                          <div className="description mt-3">
                            <div className="text">
                              <Typography.Text>
                                {item.review_description}
                              </Typography.Text>
                            </div>
                          </div>

                          <button className="btn btn-dark shadow-sm view-review-btn">
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to="/reviews"
                            >
                              View Details
                            </Link>
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
                              src={item.image}
                              alt={item.title}
                            />
                          )}
                        </div>
                      </div>
                      <div className="review-actions">
                        <DropdownActions actions={actions} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="review-details">
              <div className="header-block">
                <div className="content-header">
                  <Typography.Title heading={5} className="my-0 mb-1">
                    Insights
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    General overview of reviews published
                  </Typography.Text>
                </div>
              </div>

              <div className="insights-details">
                <Typography.Title heading={6} className="my-0">
                  {insights.totalReviewsPublished} reviews published
                </Typography.Title>
                <RatingInsights insights={insights} />
              </div>

              <div className="bottom-block">
                <Typography.Title heading={6} className="mt-4 mb-1">
                  Write more reviews?
                </Typography.Title>
                <Typography.Text type="secondary">
                  Explore featured collections on Traverse
                </Typography.Text>

                <Button
                  className="mt-3"
                  type="outline"
                  style={{
                    width: "max-content",
                    color: "black",
                    border: "1px solid black",
                  }}
                >
                  View featured
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListReviews;

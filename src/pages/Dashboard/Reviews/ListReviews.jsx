import {
  Typography,
  Rate,
  Image,
  Button,
  Notification,
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

const Option = Select.Option;
const options = ["Recent", "Ratings", "Oldest"];

const url =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp";

const ListReviews = ({ data }) => {
  const db = new Databases(appwriteClient);

  const [reviews, setReviews] = useState([]);

  const [insights, setInsights] = useState({
    totalReviewsPublished: 0,
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  });

  useEffect(() => {
    (async function () {
      try {
        const { documents: myReviews } = await db.listDocuments(
          databaseId,
          "647a14b15f4e0e6a13be",
          [Query.equal("author_id", localStorage.getItem("userId"))]
        );

        if (myReviews.length === 0) return;
        const { documents: reviewdPlaces } = await db.listDocuments(
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
            location_description: reviewdPlaces[i].location_description,
            title: reviewdPlaces[i].title,
            image: reviewdPlaces[i].image[0],
          };

          return obj;
        });

        setReviews(finalReviewData);
        calculateInsights(finalReviewData);
      } catch (error) {
        Notification.error({
          title: "Error",
          content: error.message,
        });
      }
    })();
  }, []);

  async function calculateInsights(reviews) {
    let obj = {
      totalReviewsPublished: 0,
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
    };

    let oneStar = 0,
      twoStar = 0,
      threeStar = 0,
      fourStar = 0,
      fiveStar = 0,
      total = 0;
    for (let i = 0; i < reviews.length; i++) {
      let currentItem = reviews[i].rating;
      currentItem = parseInt(currentItem);
      total += 1;
      switch (currentItem) {
        case 1:
          oneStar += 1;
          break;
        case 2:
          twoStar += 1;
          break;
        case 3:
          threeStar += 1;
          break;
        case 4:
          fourStar += 1;
          break;
        case 5:
          fiveStar += 1;
          break;
      }
    }

    obj.oneStar = (oneStar / total) * 100;
    obj.twoStar = (twoStar / total) * 100;
    obj.threeStar = (threeStar / total) * 100;
    obj.fourStar = (fourStar / total) * 100;
    obj.fiveStar = (fiveStar / total) * 100;
    obj.totalReviewsPublished = total;
    setInsights(obj);
  }

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
              {reviews.length === 0 ? <h1>No reviews published yet.</h1> : ""}
              {reviews &&
                reviews.map((item, index) => {
                  return (
                    <div className="review" key={item.$id}>
                      <div className="left">
                        <div className="avatar">
                          <UserAvatar initials={item.title} size={40} />
                        </div>
                      </div>
                      <div className="row-right">
                        <div className="right">
                          <Typography.Title heading={6} className="my-0 ">
                            {item.title}
                          </Typography.Title>
                          <Typography.Text type="secondary">
                            {item.location_description}
                          </Typography.Text>

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
                        </div>
                        <div className="image">
                          <Image
                            width={120}
                            src={item.image}
                            alt={item.title}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
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

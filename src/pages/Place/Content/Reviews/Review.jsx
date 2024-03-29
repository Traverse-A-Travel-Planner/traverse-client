import { useState, useCallback, useEffect } from "react";

// importing styles
import "./Review.css";

// importing components from arco-design
import {
  Typography,
  Select,
  Message,
  Rate,
  Button,
  Skeleton,
} from "@arco-design/web-react";

// importing appwrite libs
import { Databases, Query } from "appwrite";
import appwriteClient from "../../../../Services/appwriteClient";
import { databaseId } from "../../../../Services/config";

// importing components
import UserAvatar from "../../../../components/Avatar/Avatar";
import DropdownActions from "../../../../components/Actions/Dropdown/DropdownActions";
import RatingInsights from "../../../Dashboard/components/Ratings Insights/RatingInsights";
import filterData from "../../../../components/Filters/filterList.js";
import userDataExtractor from "../../../../Services/UserDataExtractor";

const Option = Select.Option;
const options = ["Recent", "Ratings", "Oldest"];

const actions = {
  delete: "Are you sure you want to remove this review?",
};

const ReviewTab = ({ state }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState({
    totalReviewsPublished: 0,
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  });

  const [eventTriggered, setEventTriggered] = useState(false);

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
    obj.oneStar = Math.floor((ratings[0] / total) * 100) || 0;
    obj.twoStar = Math.floor((ratings[1] / total) * 100) || 0;
    obj.threeStar = Math.floor((ratings[2] / total) * 100) || 0;
    obj.fourStar = Math.floor((ratings[3] / total) * 100) || 0;
    obj.fiveStar = Math.floor((ratings[4] / total) * 100) || 0;
    obj.totalReviewsPublished = total;
    setInsights(obj);
  }

  const handleFilterClick = async (value) => {
    const newData = filterData(reviews, value);

    setReviews(newData);

    Message.info({
      content: `Filtered reviews to ${value}.`,
      showIcon: true,
    });
  };

  // memoized function to fetch place details for the ID
  const fetchPlaceReviews = useCallback(() => {
    (async () => {
      try {
        if (!state.placeData || !state.placeData.$id) return;

        const db = new Databases(appwriteClient);

        let { documents: reviews } = await db.listDocuments(
          databaseId,
          "reviews",
          [Query.equal("place_id", state.placeData.$id)]
        );

        if (reviews.length > 0) {
          const finalData = await userDataExtractor(reviews);

          if (finalData.success === false) {
            Message.error(finalData.message);
          }

          setReviews(finalData.data);
          calculateInsights(finalData.data);
          setLoading(false);
          return;
        }

        setReviews([]);
        calculateInsights([]);
        setLoading(false);
        return;
      } catch (error) {
        setLoading(false);
        return Message.error("Something went wrong");
      }
    })();
  }, [state]);

  useEffect(() => {
    fetchPlaceReviews();
  }, [fetchPlaceReviews]);

  useEffect(() => {
    fetchPlaceReviews();
  }, [eventTriggered]);

  document.addEventListener("reviewDeleted", async () => {
    try {
      setEventTriggered(!eventTriggered);
    } catch (error) {
      setEventTriggered(!eventTriggered);
      Message.error({
        content: error.message,
      });
    }
  });

  document.addEventListener("newReviewAdded", async () => {
    fetchPlaceReviews();
  });

  return (
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
                <Option key={option} disabled={index === 3} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {loading === true ? (
          <Skeleton
            style={{ margin: "15px 0 0 20px" }}
            loading={loading}
            text={{
              rows: 3,
              width: ["80%", "60%", "90%"],
              style: {
                minWidth: 250,
                width: "100%",
                height: 100,
              },
            }}
            image={{
              shape: "square",
              style: {
                width: 50,
                height: 50,
              },
            }}
            animation
          />
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
                    <UserAvatar initials={item.name} size={40} />
                  </div>
                </div>
                <div className="row-right">
                  <div className="right">
                    <div className="review-header">
                      <div className="place-details">
                        <Typography.Title heading={6} className="my-0 ">
                          {item.name}
                        </Typography.Title>
                      </div>
                    </div>

                    <div className="rating">
                      <Rate readonly defaultValue={item.rating} />
                      <Typography.Text type="success">
                        {item.rating} star review
                      </Typography.Text>
                      <Typography.Text type="secondary" className="">
                        Reviewed on{" "}
                        {new Date(item.$createdAt).toLocaleDateString()} at{" "}
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
                </div>
                <div className="review-actions">
                  {item.author_id === localStorage.getItem("userId") ? (
                    <DropdownActions
                      actions={actions}
                      type="reviews"
                      payload={{ ...item, id: item.$id }}
                    />
                  ) : (
                    <></>
                  )}
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
  );
};

export default ReviewTab;

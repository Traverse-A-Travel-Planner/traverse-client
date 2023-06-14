import React, { useState } from "react";

// arco-design components
import { Rate, Space, Input, Button, Message, Typography } from "@arco-design/web-react";

// importing appwrite libs and configs
import { Databases, ID, Query } from "appwrite";
import appwriteClient from "../../../../Services/appwriteClient";
import { databaseId } from "../../../../Services/config";

const TextArea = Input.TextArea;

// creating a new db instance
const db = new Databases(appwriteClient);

const AddReview = ({ state }) => {
  const [rating, setRating] = useState(1);
  const [review_description, setReviewDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddReview = async () => {
    try {
      if (!rating || !review_description) {
        resetForm();
        return Message.error("All the fields are required.");
      }
      setLoading(true);

      const hasPreviousReview = await db.listDocuments(databaseId, "reviews", [
        Query.equal("author_id", localStorage.getItem("userId")),
        Query.equal("place_id", state.placeData.$id),
      ]);

      if (hasPreviousReview.total > 0) {
        setLoading(false);
        resetForm();

        return Message.error(
          "You have already posted a review for this place."
        );
      }

      await db.createDocument(databaseId, "reviews", ID.unique(), {
        rating,
        review_description,
        author_id: localStorage.getItem("userId"),
        place_id: state.placeData.$id,
      });
      setLoading(false);
      Message.success("Thanks for your feedback.");
      resetForm();
      document.dispatchEvent(new CustomEvent("newReviewAdded", {}));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Message.error(error.message);
    }
  };

  function resetForm() {
    setRating(1);
    setReviewDescription("");
  }

  return (
    <Space direction="vertical" size="large">
      <div 
      style={{ 
        display: "flex", 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "flex-start" 
      }}>
        <Typography.Text 
        style={{ 
          marginRight: 10, 
          fontSize: "15px" 
        }}>
          Rating
        </Typography.Text>
        <Rate
          className="rating add-place-review-rating" 
          style={{fontSize: '25px'}}
          defaultValue={1}
          count={5}
          value={rating}
          onChange={(e) => setRating(e)}
        />{" "}
      </div>

      <div 
      className="review"
      style={{ 
        display: "flex", 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "flex-start" 
      }}
      >
        <Typography.Text 
        style={{ 
          marginRight: 10, 
          fontSize: "15px" 
        }}>
          Feedback
        </Typography.Text>

        <TextArea
          autoSize={{ minRows: 2, maxRows: 6 }}
          style={{ minHeight: "100px", width: "400px", marginTop: 10 }}
          placeholder="Your feedback about this place."
          onChange={(e) => setReviewDescription(e)}
          value={review_description}
        />
      </div>

      <Button
        style={{ background: "black", color: "white" }}
        loading={loading}
        onClick={() => handleAddReview()}
      >
        Add Review
      </Button>
    </Space>
  );
};

export default AddReview;

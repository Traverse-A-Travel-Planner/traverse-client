import React, { useState } from "react";
import { Rate, Space, Input, Button, Message } from "@arco-design/web-react";
import { Databases, ID, Query } from "appwrite";
import appwriteClient from "../../../../Services/appwriteClient";
import { databaseId } from "../../../../Services/config";

const TextArea = Input.TextArea;

const db = new Databases(appwriteClient);

const AddReview = ({ state }) => {
  const [rating, setRating] = useState(1);
  const [review_description, setReviewDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddReview = async () => {
    try {
      if (!rating || !review_description) {
        resetForm();
        return Message.error("All fields are required.");
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
      console.log(error);
      Message.error(error.message);
    }
  };

  function resetForm() {
    setRating(1);
    setReviewDescription("");
  }

  return (
    <Space direction="vertical">
      <div className="rating" style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <span style={{ marginRight: 10, fontSize: "1.2rem" }}>
          Rating:
        </span>{" "}
        <Rate
          defaultValue={1}
          count={5}
          value={rating}
          onChange={(e) => setRating(e)}
        />{" "}
      </div>

      <div className="review">
        <span style={{ marginRight: 10, fontSize: "1.2rem" }}>Feedback:</span>
        <TextArea
          style={{ minHeight: "200px", width: "300px" }}
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

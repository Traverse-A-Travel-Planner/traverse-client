import { Modal, Message, Button } from "@arco-design/web-react";
import "./DeleteModal.css";
import { Databases } from "appwrite";
import appwriteClient from "../../../Services/appwriteClient";
import { databaseId } from "../../../Services/config";

const db = new Databases(appwriteClient);

function handleAction(content, type, payload) {
  Modal.confirm({
    title: "Confirm deletion",
    content: content,
    okText: "Delete",
    okButtonProps: {
      status: "danger",
    },
    onOk: async () => {
      try {
        let collectionId = "";
        let event;
        if (type == "contribution") {
          collectionId = "places";
          event = new CustomEvent("contributionDeleted", {});
        } else {
          collectionId = "reviews";
          event = new CustomEvent("reviewDeleted", {});
        }

        await db.deleteDocument(databaseId, collectionId, payload.id);

        document.dispatchEvent(event);

        Message.success({
          content: "Contribution deleted successfully.",
        });
      } catch (e) {
        Message.error({
          content: "Failed to delete!",
        });
        throw e;
      }
    },
  });
}

const DeleteModal = ({ content, type, payload }) => {
  return (
    <Button
      type="secondary"
      onClick={() => handleAction(content, type, payload)}
      style={{
        width: "100%",
        background: "transparent",
        textAlign: "left",
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteModal;

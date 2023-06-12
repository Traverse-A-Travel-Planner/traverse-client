import { Modal, Message, Button } from "@arco-design/web-react";
import "./EditModal.css";
import { Databases } from "appwrite";
import appwriteClient from "../../../Services/appwriteClient";
import { databaseId } from "../../../Services/config";
import { capitalizeFirstCharacter } from "../../../Services/helper";

const db = new Databases(appwriteClient);

function handleAction(content, type, payload) {
  Modal.confirm({
    title: "Confirm",
    content: content,
    okText: "Cancel Trip",
    okButtonProps: {
      status: "danger",
    },
    onOk: async () => {
      try {
        let collectionId = "";
        let event;
        if (type === "contribution") {
          collectionId = "places";
          event = new CustomEvent("contributionEdited", {});
        } else if (type === "reviews") {
          collectionId = "reviews";
          event = new CustomEvent("reviewEdited", {});
        } else if (type === "sharedTrips") {
            collectionId = "sharedTrips"
            event = new CustomEvent("sharedTripCancelled", {})
        }

        console.log("payload: ", payload)

        await db.updateDocument(databaseId, collectionId, payload.$id, { status: "cancelled" })

        document.dispatchEvent(event);

        Message.success({
          content:  `Trip cancelled successfully.`,
        });
      } catch (e) {
        Message.error({
          content: "Failed to perform action!",
        });
        throw e;
      }
    },
  });
}

const EditModal = ({ content, type, payload }) => {
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
      Cancel
    </Button>
  );
};

export default EditModal;

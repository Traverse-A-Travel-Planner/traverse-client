import React, { useRef, useState } from "react";
import {
  Form,
  Input,
  Select,
  Message,
  Typography,
  Upload,
  Notification,
} from "@arco-design/web-react";

import { databaseId, bucketId } from "../../../../utils/config";

// importing styles
import "./ContributePlaces.css";

import { Storage, ID, Databases } from "appwrite";
import appwriteClient from "../../../../utils/appwriteClient";
import { useNavigate } from "react-router-dom";

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const KeywordOptions = [
  {
    label: "Historic",
    value: "historic",
  },
  {
    label: "Religious",
    value: "religious",
  },
  {
    label: "Park",
    value: "park",
  },
  {
    label: "Nature",
    value: "nature",
  },
  {
    label: "Others",
    value: "others",
  },
];

const ContributePlaces = ({ data }) => {
  const navigate = useNavigate();

  const formRef = useRef();
  const [imageFiles, setImageFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [location_description, setLocationDescription] = useState("");
  const [coordinates, setCoordinates] = useState([80, 27]);
  const [place_description, setPlaceDescription] = useState("");
  const [keyword, setKeyWord] = useState("");
  let author_id;

  const storage = new Storage(appwriteClient);
  const db = new Databases(appwriteClient);

  const userId = localStorage.getItem("userId");
  author_id = userId;

  const handleAddPlace = async () => {
    try {
      setCoordinates([80, 27]);
      if (!author_id) {
        Notification.error({
          title: "Error",
          content: "You are not logged in.",
        });
        return;
      }

      if (!coordinates) {
        Notification.error({
          title: "Error",
          content: "Please select the location on map.",
        });
        return;
      }

      if (!place_description) {
        Notification.error({
          title: "Error",
          content: "All fields are required.",
        });
        return;
      }

      let image = [];

      for (let i = 0; i < imageFiles.length; i++) {
        let imageFile = imageFiles[i].originFile;
        let response = await storage.createFile(
          "traverse",
          ID.unique(),
          imageFile
        );
        let imageUrl = storage.getFilePreview(bucketId, response.$id).href;
        image.push(imageUrl);
      }

      const dbResponse = await db.createDocument(
        databaseId,
        "places",
        ID.unique(),
        {
          image,
          title,
          location_description,
          place_description,
          keyword,
          author_id,
          coordinates,
        }
      );

      Notification.success({
        title: "Success",
        content: "Place successfully added.",
      });

      navigate("/");
    } catch (error) {
      Notification.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  // Image -> url store
  // Title
  // Coordinates -> [ lat, long ]
  // Location Description -> “Patan Durbar Square”
  // place Description
  // Keyword: [Historic, Religious, Park, Nature] <- 1 only
  // Itinerary - things to do (Chat gpt) [array of strings (in order) ]
  // Author (added by) / Contributor
  // -> (default: admin else /username)
  // Verified status -> [ pending, approved, rejected ]
  // Reviews

  return (
    <div className="add-place-section">
      <Form
        autoComplete="off"
        layout="vertical"
        size="large"
        onSubmit={(e) => {
          return;
        }}
        ref={formRef}
      >
        <div className="left item">
          <Form.Item
            label="Place Images"
            field="images"
            triggerPropName="fileList"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture-card"
              imagePreview
              multiple
              name="files"
              autoUpload={false}
              onChange={(e) => setImageFiles(e)}
            />
          </Form.Item>

          <FormItem
            label="Title"
            field="title"
            tooltip={<div>Title is the name of place </div>}
            rules={[{ required: true }]}
          >
            <Input
              style={{ width: 350 }}
              placeholder="What's the place about ?"
              value={title}
              onChange={(e) => setTitle(e)}
            />
          </FormItem>

          <FormItem
            label="Location"
            field="location_description"
            tooltip={<div>Location</div>}
            rules={[{ required: true }]}
          >
            <Input
              style={{ width: 350 }}
              placeholder="Location"
              value={location_description}
              onChange={(e) => setLocationDescription(e)}
            />
          </FormItem>

          <FormItem label="Keyword" field="post" rules={[{ required: true }]}>
            <Select
              style={{ width: 350 }}
              placeholder="Please select keyword."
              options={KeywordOptions}
              allowClear
              value={keyword}
              onChange={(e) => setKeyWord(e)}
            />
          </FormItem>

          <FormItem>
            <button
              htmltype="submit"
              className="dashboard-form-submit-btn"
              onClick={async () => {
                if (formRef.current) {
                  try {
                    await formRef.current.validate();
                    handleAddPlace();
                  } catch (err) {
                    console.log(formRef.current.getFieldsError());
                    Message.error("All field are required");
                  }
                }
              }}
              type="primary"
              style={{ marginRight: 24 }}
            >
              <i className="bi bi-folder2-open me-1"></i> Save details
            </button>
          </FormItem>
        </div>
        <div className="right item">
          <label>
            {" "}
            <Typography.Text type="secondary">
              Place Description
            </Typography.Text>
          </label>
          <TextArea
            className="mt-2"
            value={place_description}
            onChange={(e) => setPlaceDescription(e)}
            placeholder="Please enter ..."
            defaultValue="This is the contents of the textarea. "
            autoSize
            style={{ width: 350, minHeight: 35 }}
          />
        </div>
      </Form>
    </div>
  );
};

export default ContributePlaces;

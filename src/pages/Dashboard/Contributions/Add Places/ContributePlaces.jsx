import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// importing styles
import "./ContributePlaces.css";

// import appweite functions and constants
import { Storage, ID, Databases } from "appwrite";
import appwriteClient from "../../../../Services/appwriteClient";
import { databaseId, bucketId } from "../../../../Services/config";

// arco-design components
import {
  Form,
  Steps,
  Notification
} from '@arco-design/web-react';

// import components
import RenderContent from './renderSteps';

const Step = Steps.Step;

const ContributePlaces = ({ data }) => {
  const [current, setCurrent] = useState(1);

  const navigate = useNavigate();
  const formRef = useRef();

  const [loadingSave, setLoadingSave] = useState(false)
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
      setLoadingSave(true)
      if (!author_id) {
        setLoadingSave(false)
        Notification.error({
          title: "Error",
          content: "You are not logged in.",
        });
        return;
      }

      if (!coordinates) {
        setLoadingSave(false)
        Notification.error({
          title: "Error",
          content: "Please select the location on map.",
        });
        return;
      }

      if (!place_description) {
        setLoadingSave(false)
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

      console.log(dbResponse)

      Notification.success({
        title: "Success",
        content: "Place successfully added.",
      });

      setLoadingSave(false)
      navigate("/");
    } catch (error) {
      setLoadingSave(false)
      Notification.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  let state = {
    current, 
    setCurrent, 
    formRef,
    setImageFiles,
    setTitle,
    setLocationDescription,
    setCoordinates,
    place_description,
    setPlaceDescription,
    setKeyWord,
    handleAddPlace,
    loadingSave
  }

  return (
    <div className="add-place-section">
    <div style={{
        width: '100%', 
        height: '100%',
    }}>
      <Form
      autoComplete='off'
      layout="vertical"
      size='large'
      >
      <Steps current={current} direction='vertical' style={{minWidth: 250, height: '100%'}}>
        <Step 
          icon={<i className="bi bi-postcard"></i>}
          title='General' 
          description="Add general details and images" />
          
        <Step 
          icon={<i className="bi bi-geo-alt"></i>}
          title='Location' 
          description="Add location details" />

        <Step 
          icon={<i className="bi bi-card-text"></i>}
          title='Description' 
          description="Add place description" />
      </Steps>
      {<RenderContent state={state} />}
      </Form>
    </div>
    </div>
  )
}

export default ContributePlaces;

import React, { useState } from "react";
import {
  Timeline,
  Button,
  Space,
  Typography,
  Message
} from "@arco-design/web-react";

// importing appwrite functions and constants
import appwriteClient from "../../../../Services/appwriteClient";
import { Functions } from "appwrite";

const TimelineItem = Timeline.Item;
const functions = new Functions(appwriteClient);

function Itinerary({ state }) {
  const [data, setData] = useState(state.placeData);

  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateItinerary = async (title, location) => {
    try {
      if (itinerary.length > 0) return;
      setLoading(true);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const prompt = `Plan a itinerary for ${title}, ${location} in the month of ${
        months[new Date().getMonth()]
      } in short. Each itinerary must be strictly in this format example: 'June 1 - Do this' [No extra info just plain itinerary max 6. seperate day and task by hyphen. One task per day.]`;

      let response = await functions.createExecution(
        "openAI",
        JSON.stringify({ prompt })
      );

      setLoading(false);

      response = JSON.parse(response.response);

      if (!response.success) {
        return Message.error(response.error);
      }

      console.log(response.data.choices[0].text);

      response.data.choices[0].text.split("\n").map((item) => {
        if (item === "" || !item) return;
        item = item.split("-");
        let label = item[0];
        let task = item[1];

        setItinerary((prev) => [...prev, { label, task }]);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      Message.error("Error generating AI response.");
    }
  };

  return (
    <div style={{padding: '1em 1.5em'}}>
      <Space style={{ marginBottom: "25px" }} direction="vertical">
        <Typography.Text style={{fontSize: 16}}>
          Ask AI or Artifical Intelligence for things to do in <strong>{data.title}</strong>
        </Typography.Text>
        <Button
          loading={loading}
          style={{background: 'black', color: 'white', padding: '0 20px 0 15px', margin: '7.5px 0 10px 0'}}
          onClick={() =>
            handleGenerateItinerary(data.title, data.location_description)
          }
        >
          <i className="bi bi-robot ms-1 me-2"></i> {loading ? "Thinking" : "Ask AI"}
        </Button>
      </Space>

      <Typography.Title 
      type="success"
      heading={5} 
      className="mt-1 mb-3">
        <i className="bi bi-check2-circle me-2"></i> Timeline
      </Typography.Title>
              
      <Timeline>
        {itinerary &&
          itinerary.map((item, key) => {
            return (
              <TimelineItem 
              key={key} 
              label={item.label}>
                {item.task}
              </TimelineItem>
            );
          })}
      </Timeline>
    </div>
  );
}

export default Itinerary;

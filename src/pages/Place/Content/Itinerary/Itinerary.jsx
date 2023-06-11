import React, { useState } from "react";
import {
  Timeline,
  Button,
  Space,
  Typography,
  Message,
  Spin,
} from "@arco-design/web-react";

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

      //    const prompt = `Plan a itinerary for ${title}, ${location} in below format:
      //    [{date: Date, "description": Description here}] just array not extra details, min 4 max
      //    `

      let response = await functions.createExecution(
        "openAI",
        JSON.stringify({ prompt })
      );

      setLoading(false);

      response = JSON.parse(response.response);

      if (!response.success) {
        return Message.error(response.error);
      }

      //   let dummyResponseText = {
      //     text: "\n\nJune 1 - Arrive in Agra. Check into hotel. \nJune 2 - Visit Taj Mahal \nJune 3 - Visit Agra Fort \nJune 4 - Depart Agra",
      //     index: 0,
      //     logprobs: null,
      //     finish_reason: "stop",
      //   };

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
    <div>
      <Space style={{ marginBottom: "20px" }} direction="vertical">
        <Typography.Text>
          Ask AI for things to do in this <strong>{data.title}</strong> in
          current time:
        </Typography.Text>
        <Button
          type="primary"
          loading={loading}
          onClick={() =>
            handleGenerateItinerary(data.title, data.location_description)
          }
        >
          {loading ? "Thinking ..." : "Ask AI"}
        </Button>
      </Space>

      <hr />

      {loading ? (
        <Spin />
      ) : (
        <Timeline>
          {itinerary &&
            itinerary.map((item, key) => {
              return (
                <TimelineItem key={key} label={item.label}>
                  {item.task}
                </TimelineItem>
              );
            })}
        </Timeline>
      )}
    </div>
  );
}

export default Itinerary;

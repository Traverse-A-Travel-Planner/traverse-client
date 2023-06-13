// importing styles
import "./TripsInsight.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Message } from "@arco-design/web-react";
import { Databases } from "appwrite";
import appwriteClient from "../../../Services/appwriteClient";
import userDataExtractor from "../../../Services/UserDataExtractor";
import { databaseId } from "../../../Services/config";

import { Typography } from "@arco-design/web-react";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const db = new Databases(appwriteClient);

const TripsInsight = () => {
  const [data, setData] = useState({
    labels: ["Total Trips", "Active Trips", "Cancelled Trips"],
    datasets: [
      {
        label: "Trips",
        data: [300, 50, 100],
        backgroundColor: ["rgb(54, 162, 235)", "green", "red"],
        hoverOffset: 4,
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSharedTrips();
  }, []);
  document.addEventListener("sharedTripCancelled", async () => {
    await fetchSharedTrips();
  });
  async function fetchSharedTrips() {
    try {
      const { documents: sharedTripsList } = await db.listDocuments(
        databaseId,
        "sharedTrips"
      );

      const newData = await userDataExtractor(sharedTripsList);
      if (newData.success === false) {
        Message.error(newData.message);
        setLoading(false);
        return;
      }

      if (!newData) return;

      let active = 0;
      let cancelled = 0;
      let total = 0;

      for (let i = 0; i < newData.data.length; i++) {
        let item = newData.data[i];
        total += 1;
        if (item.status === "active") {
          active += 1;
        } else {
          cancelled += 1;
        }
      }


      setData({
        labels: ["Total Trips", "Active Trips", "Cancelled Trips"],
        datasets: [
          {
            label: "Trips",
            data: [total, active, cancelled],
            backgroundColor: ["rgb(54, 162, 235)", "green", "red"],
            hoverOffset: 4,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Message.error("Failed to fetch shared trips");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title>Insights</Typography.Title>
      <Typography.Text style={{ marginBottom: "10px" }}>
        General overview of shared trips.
      </Typography.Text>
      <Doughnut data={data} />;
    </div>
  );
};

export default TripsInsight;

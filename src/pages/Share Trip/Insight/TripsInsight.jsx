import { useEffect, useState } from "react";

// importing appwrite's functions and constants
import { Databases } from "appwrite";
import appwriteClient from "../../../Services/appwriteClient";
import { databaseId } from "../../../Services/config";

// importing custom functions
import userDataExtractor from "../../../Services/UserDataExtractor";

// chartJS components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// arco-design components
import { Typography, Message } from "@arco-design/web-react";

// create an instance of ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

// creating a new db instance
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

    } catch (error) {
      Message.error("Failed to fetch shared trips");
    }
  }

  return (
    <div style={{ padding: "0px 25px 35px 25px" }}>
      <Typography.Title heading={4} className="mb-0">Insights</Typography.Title>
      <Typography.Text type="secondary" style={{ marginTop: "10px" }}>
        General overview of shared trips
      </Typography.Text>
      <div style={{ marginTop: "25px" }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default TripsInsight;

import { Tabs, Typography } from "@arco-design/web-react";

//importing styles
import "./PlaceContent.css";

// importing components
import PlaceMap from "./Map/Map";
import ReviewTab from "./Reviews/Review";
import Itinerary from "./Itinerary/Itinerary";
import AddReview from "./Add Review/AddReview";
import SpaceComponent from "@arco-design/web-react/es/Space";

const TabPane = Tabs.TabPane;
const style = {
  textAlign: "center",
  marginTop: 20,
};

const PlaceContent = ({ state }) => {
  return (
    <div id="bottom-tab-div">
      <Tabs defaultActiveTab="reviews">
        <TabPane
          key="reviews"
          title={
            <span>
              <i className="bi bi-sticky"></i> Reviews
            </span>
          }
        >
          <ReviewTab state={state} />
        </TabPane>
        <TabPane
          key="addReview"
          title={
            <span>
              <i className="bi bi-plus-circle"></i> Add Review
            </span>
          }
        >
          <AddReview state={state} />
        </TabPane>
        <TabPane
          key="maps"
          title={
            <span>
              <i className="bi bi-geo-alt"></i> Map
            </span>
          }
        >
          <PlaceMap state={state} />
        </TabPane>
        <TabPane
          key="itinerary"
          title={
            <span>
              <i className="bi bi-robot"></i> Itinerary
            </span>
          }
        >
          <Itinerary state={state} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PlaceContent;

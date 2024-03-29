// importing styles
import "./ShareTrip.route.css"

// importing components
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import AddTrip from "./Add Trip/AddTrip";
import TripsInsight from "./Insight/TripsInsight";
import ListTrip from "./List Trips/ListTrips";

const ShareTrip = ({data}) => {
    return(
        <>
        <div className="share-trip-container">
            <div className="header-block">
                <Header />
            </div>
            <div className="share-trip-wrapper">
                <div className="share-trip-feed">
                    <div className="add-share-trip-box">
                        <AddTrip data={data}/>
                    </div>
                    <div className="list-share-trip">
                        <ListTrip data={data}/>
                    </div>
                </div>
                <div className="share-trip-insight">
                    <TripsInsight />
                </div>
            </div>
            <div className="footer-block">
                <Footer />
            </div>
        </div>
        </>
    )
}

export default ShareTrip;
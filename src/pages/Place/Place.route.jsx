import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// importing styles
import "./Place.route.css"

// importing appwrite libs and configs
import { Databases, Query } from "appwrite";
import appwriteClient from "../../Services/appwriteClient";
import { databaseId } from "../../Services/config";

// importing arco design components
import { Message } from "@arco-design/web-react";

// importing custom components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GeneralDetails from "./General/GeneralDetails";
import PlaceContent from "./Content/PlaceContent";

const PlaceSpecificPage = () => {
    // get place id from query params of url
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    // set place data
    const [placeData, setPlaceData] = useState([]);
    const [loading, setLoading] = useState(true)

    // memoized function to fetch place details for the ID
    const fetchPlaceData = useCallback(() => {
        (async () => {
            try{
                const db = new Databases(appwriteClient);
                let { documents: place } = await db.listDocuments(
                  databaseId,
                  "places",
                  [Query.equal("$id", [id])]
                );
        
                setPlaceData(place[0])
                setLoading(false)
                return place[0];
            } catch (error) {
                setLoading(false)
                Message.error("Something went wrong")
            }
        })()
    }, [id])

    useEffect(() => {
        fetchPlaceData()
    }, [fetchPlaceData])

    // state props
    let stateProps = {
        loading,
        placeData
    }
    
    return(
        <div className="place-page-wrapper">
        <div className="header">
            <Header />
        </div>
        <div className="place-content">
            <div className="top">
                <GeneralDetails state={stateProps} />
            </div>
            <div className="bottom">
                <PlaceContent state={stateProps} />
            </div>
        </div>
        <div className="footer">
            <Footer />
        </div>
        </div>
    )
}

export default PlaceSpecificPage;
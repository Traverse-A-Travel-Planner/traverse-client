
// importing styles
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ShareTrip.route.css"

const ShareTrip = () => {
    return(
        <>
        <div className="share-trip-container">
            <div className="header-block">
                <Header />
            </div>
            <div className="share-trip-wrapper">
                <div className="share-trip-feed"></div>
                <div className="share-trip-insight"></div>
            </div>
            <div className="footer-block">
                <Footer />
            </div>
        </div>
        </>
    )
}

export default ShareTrip;
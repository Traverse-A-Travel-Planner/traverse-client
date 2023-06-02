// importing styles
import "./addPlaces.css"

// importing components
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const AddPlaces = () => {
    return(
        <div className="wrapper">
        <Header />
        <div className="add-places-container">
            this is add places page
        </div>
        <Footer />
        </div>
    )
}

export default AddPlaces;
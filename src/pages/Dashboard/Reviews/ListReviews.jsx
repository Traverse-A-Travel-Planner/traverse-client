import Header from "../../../components/Header/Header"
import Sidebar from "../../../components/Sidebar/Sidebar";

// importing styles
import "./ListReviews.css"

const ListReviews = ({data}) => {
    return(
    <div className="main-body">
      <Header />
      <div className="dashboard-content reviews">
        <Sidebar data={data} />
        <div class="content">
            <div class="url-path">Home / Dashboard / Reviews</div>
            <div className="review-list">
                This are reviews
            </div>
        </div>
      </div>
    </div>
    )
}

export default ListReviews;
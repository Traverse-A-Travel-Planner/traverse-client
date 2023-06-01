import React from "react";
// import { backendUrl } from "../../../../utils/config";

const SearchResult = ({ title, searchResultData }) => {
  const handleAddFavourites = async (obj) => {
    console.log(obj);
    // const options = {
    //   method: "POST",
    //   headers: {
    //     authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(obj),
    // };
    // const res = await fetch(`${backendUrl}/favourites/add`, options);
    // const data = await res.json();
    // if (data.success === false) return toast.error("Something went wrong.");

    // toast.success("Added to favourites.");
  };

  return (
    <>
      <h5 className="text-bold mt-4">{title} places</h5>
      <div className="recommended-places">
        <div className="places-list">
          {[1 ,2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              return (
                <div className="place-item" key={index}>
                  <div className="image">
                    <img src="https://www.nepaltraveladventure.com/blog/wp-content/uploads/2020/03/patan-durbar-square.jpg" alt="img"/>
                  </div>
                  <div className="title">Patan Durbar Square</div>
                  <div className="description text-muted">
                    Location: Lalitpur, Nepal
                  </div>
                  <div className="price">NPR 250</div>
                  <div
                    className="favourites"
                    onClick={() =>
                      handleAddFavourites({
                        image: "",
                        name: "",
                        description: "item.des",
                        location: "",
                        visited: "",
                      })
                    }
                  >
                    <i className="bi bi-heart"></i>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchResult;

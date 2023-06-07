import React from "react";

//importing styles
import "./searchResults.css";

function capitalizeFirstCharacter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const SearchResult = ({ title, searchResultData, handleAddFavourites }) => {
  return (
    <>
      <h5 className="text-bold mt-4">{title} places</h5>
      <div className="recommended-places">
        <div className="places-list">
          {searchResultData &&
            searchResultData.map((item, index) => {
              return (
                <div className="place-item" key={item.$id}>
                  <div className="image">
                    <img src={item.image[0]} alt="img" />
                  </div>
                  <div className="title">{item.title}</div>
                  <div className="description text-muted">
                    {item.location_description}
                  </div>
                  <div className="keyword">
                    {capitalizeFirstCharacter(item.keyword)}
                  </div>
                  <div
                    className="favourites"
                    onClick={() =>
                      handleAddFavourites({
                        user_id: localStorage.getItem("userId"),
                        place_id: item.$id,
                        isFavourite: item.isFavourite,
                        favouriteDocId: item.favouriteDocId || undefined,
                      })
                    }
                  >
                    {item.isFavourite ? (
                      <i className="bi bi-bookmark-check-fill"></i>
                    ) : (
                      <i className="bi bi-bookmark"></i>
                    )}
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

import React, { useEffect, useState } from "react";

//importing styles
import "./searchResults.css";
import { Skeleton, Spin } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

function capitalizeFirstCharacter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ResultCard = ({ item, handleAddFavourites, searchResultLoading }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handlePageRouting = (item) => {
    navigate(`place?id=${item.$id}`)
  }

  useEffect(() => {
    console.log(searchResultLoading)
  }, [searchResultLoading])

  return (
    <>
    <div className="place-item" onClick={() => handlePageRouting(item)}>
      <div className="image">
        <img src={item.image[0]} alt="img" />
      </div>
      <div className="title">{item.title}</div>
      <div className="description text-muted">
        {item.location_description}
      </div>
      <div className="keyword">{capitalizeFirstCharacter(item.keyword)}</div>
      <div
        className="favourites"
        onClick={async () => {
          setLoading(true);
          await handleAddFavourites({
            user_id: localStorage.getItem("userId"),
            place_id: item.$id,
            isFavourite: item.isFavourite,
            favouriteDocId: item.favouriteDocId || undefined,
          });
          setLoading(false);
        }}
      >
        {loading === true ? (
          <Spin />
        ) : item.isFavourite ? (
          <i className="bi bi-bookmark-check-fill favourited"></i>
        ) : (
          <i className="bi bi-bookmark"></i>
        )}
      </div>
    </div>
    </>
  );
};

const SearchResult = ({ title, searchResultData, handleAddFavourites, searchResultLoading }) => {
  return (
    <>
      <h5 className="text-bold mt-4">
        {capitalizeFirstCharacter(title)} places
      </h5>
      <div className="recommended-places">
        <div className="places-list">
          {
            searchResultLoading === true ? (
              [1, 2, 3, 4].map((_, index) => (
                <Skeleton
                key={index}
                style={{
                  margin: '15px 0 0 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1em'
                }}
                loading={searchResultLoading}
                text={{
                    rows: 2, 
                    style: {
                        width: 290,
                        height: 100, 
                    } 
                }}
                image={{ 
                    shape: "square", 
                    style: {
                        width: 290,
                        height: 170,
                    } 
                }}
                animation
              />
              ))
            ) : (
              searchResultData &&
              searchResultData.map((item) => (
                <ResultCard
                  searchResultLoading={searchResultLoading}
                  key={item.$id}
                  item={item}
                  handleAddFavourites={handleAddFavourites}
                />
              ))  
            )
          }
        </div>
      </div>
    </>
  );
};

export default SearchResult;

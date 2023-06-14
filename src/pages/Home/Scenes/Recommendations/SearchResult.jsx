import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//importing styles
import "./searchResults.css";

// importing keyoword's svgs
import historic from "./assets/historic.png"
import religious from "./assets/religious.png"
import nature from "./assets/nature.png"
import park from "./assets/park.png"

// arco-design components
import { Skeleton, Spin } from "@arco-design/web-react";
import { capitalizeFirstCharacter } from "../../../../Services/helper";

const ResultCard = ({ item, handleAddFavourites, searchResultLoading }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handlePageRouting = (item) => {
    navigate(`place?id=${item.$id}`)
  }

  const KeywordTextGenerator = ({keyword}) => {
    const keywordText = capitalizeFirstCharacter(keyword)
    let imgUrl;
    
    switch (keyword) {
      case "historic": 
        imgUrl = historic
        break
      case "religious":
        imgUrl = religious
        break
      case "nature":
        imgUrl = nature
        break
      case "park":
        imgUrl = park
        break
      default:
        break
    }
    
    return(
      <>
      {(keyword !== "others" && (
        <img src={imgUrl} style={{marginRight: 3, width: 15}} alt={keyword} />
      ))}
      {" " + keywordText}
      </>
    )
  }

  return (
    <>
    <div className="place-item">
      <div className="image" onClick={() => handlePageRouting(item)}>
        <img src={item.image[0]} alt="img" />
      </div>
      <div className="title">{item.title}</div>
      <div className="description text-muted">
        {item.location_description}
      </div>
      <div className="keyword">
        <KeywordTextGenerator keyword={item.keyword} />
      </div>
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

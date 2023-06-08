function filterByRecent(params) {
    const {data} = params;

    const newData = data.sort((a, b) => {
      const dateA = new Date(a.$createdAt);
      const dateB = new Date(b.$createdAt);
      return dateB - dateA;
    });

    console.log("recent", newData)
    return newData
}

function filterByRating(params) {
    const {data} = params;

    const newData = data.sort((a, b) => b.rating - a.rating);
    console.log("rating", newData)
    return newData
}
  
function filterByOldest(params) {
    const {data} = params;

    const newData = data.sort((a, b) => {
      const dateA = new Date(a.$createdAt);
      const dateB = new Date(b.$createdAt);
      return dateA - dateB;
    });

    console.log("oldest", newData)
    return newData
}

function filterData(data, filterType) {
  const params = { data, filterType }

    console.log(filterType)
    var newData = [];
    switch (filterType) {
      case "Recent":
        newData = filterByRecent(params);
        return newData
      case "Oldest":
        newData = filterByOldest(params);
        return newData;
      case "Ratings":
        newData = filterByRating(params);
        return newData;
      default:
        return data
    }
}

export default filterData;
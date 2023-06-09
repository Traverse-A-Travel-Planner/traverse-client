function filterByRecent(params) {
  const { data } = params;
  console.log("filter by recent.");
  const newData = data.sort((a, b) => {
    const dateA = new Date(a.$createdAt);
    const dateB = new Date(b.$createdAt);
    return dateB - dateA;
  });

  return newData;
}

function filterByRating(params) {
  const { data } = params;
  console.log("filter by rating.");
  const newData = data.sort((a, b) => b.rating - a.rating);
  return newData;
}

function filterByOldest(params) {
  const { data } = params;
  console.log("filter by oldest.");
  const newData = data.sort((a, b) => {
    const dateA = new Date(a.$createdAt);
    const dateB = new Date(b.$createdAt);
    return dateA - dateB;
  });

  return newData;
}

function filterData(data, filterType) {
  const params = { data, filterType };

  var newData = [];
  switch (filterType) {
    case "Recent":
      newData = filterByRecent(params);
      break;
    case "Oldest":
      newData = filterByOldest(params);
      break;
    case "Ratings":
      newData = filterByRating(params);
      break;
    default:
      newData = data;
  }
  return newData;
}

export default filterData;

function filterByActive(params) {
  const { data } = params;
  const newData = data.filter((item) => item.status === "active");
  return newData;
}

//   filter by total number of proposal.
function filterByProposal(params) {
  const { data } = params;
  const newData = data.sort((a, b) => {
    if (a.total_proposals === null) {
      a.total_proposals = 0;
    }

    if (b.total_proposals === null) {
      b.total_proposals = 0;
    }

    return a.total_proposals - b.total_proposals;
  });

  return newData;
}

function filterShareTrips(data, filterType) {
  const params = { data, filterType };

  var newData = [];
  switch (filterType) {
    case "Active":
      newData = filterByActive(params);
      break;
    case "Proposal":
      newData = filterByProposal(params);
      break;
    default:
      newData = data;
  }
  return newData;
}

export default filterShareTrips;

const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const account = new sdk.Account(client);
  const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const health = new sdk.Health(client);
  const locale = new sdk.Locale(client);
  const storage = new sdk.Storage(client);
  const teams = new sdk.Teams(client);
  const users = new sdk.Users(client);

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  let data = req.variables["APPWRITE_FUNCTION_EVENT_DATA"];

  data = JSON.parse(data);

  const { databaseId, collectionId } = req.variables;

  const { place_id, rating } = data;

  const { documents } = await database.listDocuments(databaseId, collectionId, [
    sdk.Query.equal("$id", place_id),
  ]);

  let { total_reviews, average_rating, $id } = documents[0];

  if (!total_reviews) {
    total_reviews = 0;
  }

  if (!average_rating) {
    average_rating = 0;
  }

  total_reviews += 1;
  average_rating = Math.floor((average_rating + rating) / total_reviews);

  delete documents.$id;

  await database.updateDocument(databaseId, collectionId, $id, {
    average_rating,
    total_reviews,
  });

  res.json({
    message: "Function triggered successfully.",
  });
};

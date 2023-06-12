const sdk = require("node-appwrite");
const sendMail = require("./utils/sendMail");

const actions = require("./enums/actions.enum");
const sendShareTripMail = require("./utils/sendShareTripMail");

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
  try {
    const client = new sdk.Client();

    const database = new sdk.Databases(client);

    if (
      !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
      !req.variables["APPWRITE_FUNCTION_API_KEY"] ||
      !req.variables["GMAIL_APP_USERNAME"] ||
      !req.variables["GMAIL_APP_PASSWORD"]
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

    let payload = req.payload;
    payload = JSON.parse(payload);

    switch (payload.action) {
      case actions.shareTripMail:
        const { receiver, sender, message, tripId } = payload.data;

        const { GMAIL_APP_USERNAME, GMAIL_APP_PASSWORD } = req.variables;

        if (!receiver || !message || !tripId || !sender) {
          return res.json({
            success: false,
            error: "All fields are required.",
          });
        }

        const response = await database.getDocument(
          "traverse",
          "sharedTrips",
          tripId
        );

        if (!response) {
          return res.json({
            success: false,
            error: "Invalid parameters.",
          });
        }

        const newNumberOfProposals = response.total_proposals + 1;

        await database.updateDocument("traverse", "sharedTrips", tripId, {
          total_proposals: newNumberOfProposals,
        });

        const placeName = response.location;

        await sendShareTripMail(
          GMAIL_APP_USERNAME,
          GMAIL_APP_PASSWORD,
          receiver,
          sender,
          message,
          placeName
        );

        break;
      default:
      // do nothing
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

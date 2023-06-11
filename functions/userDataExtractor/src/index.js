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
  try {
    const client = new sdk.Client();
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

    let payload = req.payload;
    payload = JSON.parse(payload);

    const { userId } = payload;

    const userDetails = await users.list([ sdk.Query.equal("$id", [userId]) ])

    res.json({
      success: true,
      userDetails,
    });
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      error: error.message,
    });
  }
};

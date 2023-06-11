const sdk = require("node-appwrite");
const fetch = require("node-fetch");

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

    let payload = JSON.parse(req.payload);

    if (!payload.prompt) {
      return res.json({ success: false, error: "Prompt is required." });
    }

    const apiKey = req.variables["OPENAI_API_KEY"];

    const apiUrl =
      "https://api.openai.com/v1/engines/text-davinci-002/completions";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: payload.prompt,
        max_tokens: 100,
        temperature: 0.7,
        // Add any other parameters as needed
      }),
    });

    const data = await response.json();

    res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error.message });
  }
};

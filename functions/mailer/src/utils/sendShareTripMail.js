const sendMail = require("./sendMail");
const { generateShareTripMail } = require("../templates/shareTripMail.template")

async function sendShareTripMail(
  GMAIL_APP_USERNAME,
  GMAIL_APP_PASSWORD,
  receiver,
  sender,
  message,
 placeName
) {
  try {
    const content = generateShareTripMail(placeName, message, sender)
    sendMail(GMAIL_APP_USERNAME, GMAIL_APP_PASSWORD, receiver, content);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

module.exports = sendShareTripMail;

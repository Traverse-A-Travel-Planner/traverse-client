const sendMail = require("../utils/sendMail");
const dotenv = require("dotenv");
const {
  generateShareTripMail,
} = require("../templates/shareTripMail.template");

dotenv.config({ path: "../../.env" });

const { GMAIL_APP_USERNAME, GMAIL_APP_PASSWORD } = process.env;

console.log({ GMAIL_APP_PASSWORD });

const receiver = "021a325@sxc.edu.np";
const content = generateShareTripMail(
  "Kathmandu",
  "Lets go this place",
  "mymail@gmail.com"
);

sendMail(GMAIL_APP_USERNAME, GMAIL_APP_PASSWORD, receiver, content);

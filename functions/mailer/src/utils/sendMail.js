const nodemailer = require("nodemailer");

function sendMail(
  GMAIL_APP_USERNAME,
  GMAIL_APP_PASSWORD,
  receiver_address,
  content
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_APP_USERNAME,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: GMAIL_APP_USERNAME,
      to: receiver_address,
      subject: "Email Confirmation",
      html: content,
      subject: "Traverse: New proposal received for trip sharing.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}

module.exports = sendMail;

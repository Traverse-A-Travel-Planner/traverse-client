function generateShareTripMail(placeName, message, sender) {
  let template = `<!DOCTYPE html>
  <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Proposal for sharing trip.</title>
      <style type="text/css">
        a:hover {
          text-decoration: underline !important;
        }
      </style>
    </head>
  
    <body
      marginheight="0"
      topmargin="0"
      marginwidth="0"
      style="margin: 0px; background-color: #f2f3f8"
      leftmargin="0"
    >
      <!-- 100% body table -->
      <table
        cellspacing="0"
        border="0"
        cellpadding="0"
        width="100%"
        bgcolor="#f2f3f8"
        style="
          @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
          font-family: 'Open Sans', sans-serif;
        "
      >
        <tr>
          <td>
            <table
              style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
  
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table
                    width="95%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      max-width: 670px;
                      background: #fff;
                      border-radius: 3px;
                      text-align: center;
                      -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    "
                  >
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 35px">
                        <h1
                          style="
                            color: #1e1e2d;
                            font-weight: 500;
                            margin: 0;
                            font-size: 32px;
                            font-family: 'Rubik', sans-serif;
                          "
                        >
                          Proposal for ${placeName} trip.
                        </h1>
                        <p
                          style="
                            font-size: 15px;
                            color: #455056;
                            margin: 8px 0 0;
                            line-height: 24px;
                          "
                        >
                          ${message}
                        </p>
                        <span
                          style="
                            display: inline-block;
                            vertical-align: middle;
                            margin: 29px 0 26px;
                            border-bottom: 1px solid #cecece;
                            width: 100px;
                          "
                        ></span>
                        <p
                          style="
                            color: #455056;
                            font-size: 18px;
                            line-height: 20px;
                            margin: 0;
                            font-weight: 500;
                          "
                        >
                          <strong
                            style="
                              display: block;
                              font-size: 13px;
                              margin: 0 0 4px;
                              color: rgba(0, 0, 0, 0.64);
                              font-weight: normal;
                            "
                            >Reply to this mail for confirming trip with this proposal sender.</strong
                          > ${sender}
                          <br>
                          <br />
                          <span style="color: red; font-size: 12px;">
                            If you don't want to receive proposals, please change
                            the trip status to ended from Traverse website.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align: center">
                  <p
                    style="
                      font-size: 14px;
                      color: rgba(69, 80, 86, 0.7411764705882353);
                      line-height: 18px;
                      margin: 0 0 0;
                    "
                  >
                    &copy; <strong>Traverse</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--/100% body table-->
    </body>
  </html>
  `;

  return template;
}

module.exports = { generateShareTripMail };

# mailer

It is used to send emails to the users. It supports mailing for different kinds of actions based
on the payload provided by the user. The mail service is powered by GMAIL smtp. Later we might make it customizable.

## 🤖 Documentation

_Example input:_

`action` means the event or purpose of email. Currently we have following actions.

- `shareTripMail`

```json
{
  "action": "shareTripMail",
  "data": {
    "receiver": "test@gmail.com",
    "sender": "sender@gmail.com",
    "message": "Message to the receiver.",
    "tripId": "Document id of trip."
  }
}
```

_Example output:_

Email sent success output:

```json
{
  "success": true
}
```

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_PROJECT_ID** - Project id of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - Appwrite API Key
- **GMAIL_APP_USERNAME** - Gmail app username
- **GMAIL_APP_PASSWORD** - Gmail app password

## 🚀 Deployment

There are two ways of deploying the Appwrite function, both having the same results, but each using a different process. We highly recommend using CLI deployment to achieve the best experience.

### Using CLI

Make sure you have [Appwrite CLI](https://appwrite.io/docs/command-line#installation) installed, and you have successfully logged into your Appwrite server. To make sure Appwrite CLI is ready, you can use the command `appwrite client --debug` and it should respond with green text `✓ Success`.

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.

### Manual using tar.gz

Manual deployment has no requirements and uses Appwrite Console to deploy the tag. First, enter the folder of your function. Then, create a tarball of the whole folder and gzip it. After creating `.tar.gz` file, visit Appwrite Console, click on the `Deploy Tag` button and switch to the `Manual` tab. There, set the `entrypoint` to `src/index.js`, and upload the file we just generated.

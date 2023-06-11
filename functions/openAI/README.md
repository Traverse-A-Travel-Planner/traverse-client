# openAI

Take in prompt and returns answer. It is powered by OpenAI.

## 🤖 Documentation

_Example input:_

```json
{
  "prompt": "Plan a itinerary for Pashupatinath Nepal in the month of June in short [no extra info]."
}
```

_Example output:_

```json
{
  id: 'cmpl-7QGleVGpFs4FgjxIuUeqnu5tL2nm7',
  object: 'text_completion',
  created: 1686495338,
  model: 'text-davinci-002',
  choices: [
    {
      text: '\n' +
        '\n' +
        '1. Arrive in Kathmandu and transfer to your hotel\n' +
        '\n' +
        '2. Explore the city of Kathmandu and visit some of the key sights including Durbar Square, Swayambhunath and Boudhanath\n' +
        '\n' +
        '3. Drive to the town of Pokhara and explore the lakeside town\n' +
        '\n' +
        '4. Take a boat trip on Phewa Lake and visit some of the nearby temples\n' +
        '\n' +
        '5. Hike up to Sarangkot for spectacular',
      index: 0,
      logprobs: null,
      finish_reason: 'length'
    }
  ],
  usage: { prompt_tokens: 23, completion_tokens: 100, total_tokens: 123 }
}
```

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_PROJECT_ID** - Project ID of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - Appwrite API Key
- **OPENAI_API_KEY** - Open AI API key
<!-- Add your custom environment variables -->

## 🚀 Deployment

There are two ways of deploying the Appwrite function, both having the same results, but each using a different process. We highly recommend using CLI deployment to achieve the best experience.

### Using CLI

Make sure you have [Appwrite CLI](https://appwrite.io/docs/command-line#installation) installed, and you have successfully logged into your Appwrite server. To make sure Appwrite CLI is ready, you can use the command `appwrite client --debug` and it should respond with green text `✓ Success`.

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.

### Manual using tar.gz

Manual deployment has no requirements and uses Appwrite Console to deploy the tag. First, enter the folder of your function. Then, create a tarball of the whole folder and gzip it. After creating `.tar.gz` file, visit Appwrite Console, click on the `Deploy Tag` button and switch to the `Manual` tab. There, set the `entrypoint` to `src/index.js`, and upload the file we just generated.

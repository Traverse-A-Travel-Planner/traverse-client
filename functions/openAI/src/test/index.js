const fetch = require('node-fetch');
const dotenv = require("dotenv");

dotenv.config({ path: "../../.env" });

// Set your OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

// Set the prompt you want to ask
const prompt = 'Plan a itinerary for Pashupatinath Nepal in the month of June in short [no extra info].';

const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';


fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    prompt: prompt,
    max_tokens: 100,
    temperature: 0.7
    // Add any other parameters as needed
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
});
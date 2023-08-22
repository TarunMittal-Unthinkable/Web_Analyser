chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "getSummary") {
    console.log("Hi");
    try {
      // let content = document.body.innerText; // Extract the page's text content
      let url = window.location.href;
      // console.log("Hi2", content);
      // Use GPT-4 to generate a coherent summary
      const summarized = await generateSummaryUsingGPT(url);
      console.log("Hello", summarized);

      sendResponse({ error: false, data: summarized });
      // if (summarized) {
      //   console.log("Tarun");
      //   sendResponse({ error: false, data: "hi" });
      // } else {
      //   sendResponse({ error: true, data: null });
      // }
    } catch (error) {
      sendResponse({ error: true, data: null });
    }
  }

  if (request.action === "getPoints") {
    try {
      // let content = document.body.innerText; // Extract the page's text content
      // let url = window.location.href;
      //Use GPT-4 to extract major points
      const extractedPoints = await extractMajorPointsUsingGPT(content);

      sendResponse({ error: false, data: extractedPoints });
    } catch (error) {
      sendResponse({ error: true, data: null });
    }
  }

  return true; // Required to allow sendResponse to be called asynchronously
});

async function generateSummaryUsingGPT(url) {
  // const prompt = `Extract the major points from the following webpage:\n${url}`;
  const prompt = `Summarize the text I give you in an appropriate amount of concise bulletpoints and start with a short, high-quality one-sentence summary. Pick a suitable emoji for every bullet point. 
  Your response should be in English. Use the following content: ${url}`;
  //console.log(prompt);
  return await callLanguageModelAPI(prompt);
}

async function extractMajorPointsUsingGPT(content) {
  const prompt = `Extract the major points from the following text:\n${content}`;
  return await callLanguageModelAPI(prompt);
}

async function callLanguageModelAPI(prompt) {
  // const API_URL = "https://api.openai.com/v1/chat/completions"; // Replace with the API URL
  const API_URL = "https://api.openai.com/v1/completions";
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ",
    },
    body: JSON.stringify({
      // messages: [{ role: "user", content: prompt }],
      prompt: prompt,
      model: "text-davinci-003",
      max_tokens: 2048, // Adjust based on your requirements
      // Add other relevant parameters here
    }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const data = await response.json();
  return data.choices[0].text.trim();
}

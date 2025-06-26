const { GoogleGenAI } = require("@google/genai");

// Initialize Google's GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getTechQuote() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // or "gemini-pro" depending on your access
      contents:
        "Create a tweet that explains a specific use case of open-source tools in FullStack web2,  Web3 development, devops, clis, sdlc, backend, frontend . Add 3 hashtags.",
    });
    return response.text;
  } catch (error) {
    console.error("Error generating tech quote:", error);
    return "Code is poetry. Keep creating!";
  }
}

module.exports = { getTechQuote };


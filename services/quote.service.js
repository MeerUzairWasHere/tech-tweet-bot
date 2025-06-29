const { GoogleGenAI } = require("@google/genai");

// Initialize Google's GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getTechQuote() {
  try {
    const prompt = `
    Generate a **random** tech-related tweet (under 280 chars) with **3 hashtags**.  
    **Rules:**
    - Topics: SDLC, Web2, Web3, Frontend, Backend, Fullstack.  
    - Styles: Fun fact, myth vs reality, quick tip, comparison, or "Did you know?"  
    - Avoid repeating the same structure (e.g., no "Frontend vs Backend" every time).  
    - Hashtags must match the topic (e.g., #Blockchain for crypto-related tweets).  
  `;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating tech quote:", error);
    return "Code is poetry. Keep creating!";
  }
}

module.exports = { getTechQuote };

const { GoogleGenAI } = require("@google/genai");

// Initialize Google's GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getTechQuote() {
  try {
    const topics = [
      "MongoDB",
      "SQL",
      "PostgreSQL",
      "MySQL",
      "MERN Stack",
      "MEAN Stack",
      "Frontend Development",
      "Backend Development",
      "Web Development",
      "Full Stack Development",
      "React.js",
      "Vue.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "AI",
      "JavaScript",
      "TypeScript",
      "HTML & CSS",
      "Web3",
      "Solana",
      "Rust",
      "C#",
      "ASP.NET",
      "Blockchain",
      "Smart Contracts",
      "Solidity",
      "DevOps",
      "CI/CD",
      "Git & GitHub",
      "APIs",
      "REST",
      "GraphQL",
      "Firebase",
      "AWS",
      "GCP",
      "SaaS",
      "PaaS",
      "CMS",
      "Linux",
      "Agile",
      "Scrum",
      "Testing & QA",
      "Unit Testing",
      "UI/UX Design",
      "Figma",
      "Tailwind CSS",
    ];

    const prompt = `
    Generate a **random** tech-related tweet (under 280 chars) with **3 hashtags**.  
    **Rules:**
    - Topics:  ${topics[Math.floor(Math.random() * topics.length)]}
    _ Topics should like facts or any short knowledge that can be used to explain the topic.
    - Hashtags must match the topic.
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

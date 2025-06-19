const axios = require("axios");

async function getTechQuote() {
  try {
    const response = await axios.get("https://techy-api.vercel.app/api/json");
    return response.data.message;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Stay curious, keep coding! #Tech #Programming";
  }
}

module.exports = { getTechQuote };

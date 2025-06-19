require("dotenv").config();
const express = require("express");
const { postTweet } = require("./services/twitter.service");
const { getTechQuote } = require("./services/quote.service");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to post a random tech tweet
app.post("/api/tweet", async (req, res) => {
  try {
    const quote = await getTechQuote();
    const tweet = await postTweet(quote);
    res.json({ success: true, tweet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Manual trigger endpoint
app.get("/api/tweet-now", async (req, res) => {
  try {
    const quote = await getTechQuote();
    const tweet = await postTweet(quote);
    res.json({ success: true, tweet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

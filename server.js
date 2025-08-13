require("dotenv").config();
const cron = require("node-cron");
const axios = require("axios");
const express = require("express");
const { postTweet } = require("./services/twitter.service");
const { getTechQuote } = require("./services/quote.service");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/tweet-now", async (req, res) => {
  try {
    const quote = await getTechQuote();
    const tweet = await postTweet(quote);
    res.json({ success: true, tweet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/v1/healthz", (req, res) => {
  res.json({ success: true, msg: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios.get(
      `https://tech-tweet-bot.onrender.com/api/v1/healthz`
    );
    console.log(`Health check successful: ${response.data.msg}`);
  } catch (error) {
    console.error(`Health check failed: ${error.message}`);
  }
});

 cron.schedule("0 9,17 * * *", async () => {
  try {
    const response = await axios.post(
      `https://tech-tweet-bot.onrender.com/api/tweet-now`
    );
    console.log(`Tweet triggered successfully: ${response.data.msg}`);
  } catch (error) {
    console.error(`Tweet failed: ${error.message}`);
  }
});
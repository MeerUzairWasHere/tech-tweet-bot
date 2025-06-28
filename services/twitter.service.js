const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function postTweet(text) {
  try {
    const response = await client.v2.tweet(text);
    return response.data;
  } catch (error) {
    console.error("Twitter API Error:", {
      status: error.code,
      message: error.message,
      data: error.data,
      stack: error.stack, // Helps trace the error
    });
    throw error;
  }
}

async function verifyCredentials() {
  try {
    const me = await client.v2.me(); // Updated method
    console.log("Authenticated as:", me.data.name);
    return true;
  } catch (error) {
    console.error("Auth failed:", {
      error: error.message,
      details: error.data,
    });
    return false;
  }
}

// Test function
(async () => {
  await verifyCredentials();
})();

module.exports = { postTweet, verifyCredentials };

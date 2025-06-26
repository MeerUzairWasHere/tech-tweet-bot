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
    console.log(text)
    const response = await client.v2.tweet(text);
    return response.data;
  } catch (error) {
    console.error("Twitter API Error Details:", {
      status: error.code,
      message: error.message,
      data: error.data,
    });
    throw error;
  }
}
async function verifyCredentials() {
  try {
    const user = await client.currentUser();
    console.log("Authenticated as:", user.name);
    return true;
  } catch (error) {
    console.error("Auth failed:", error);
    return false;
  }
}

module.exports = { postTweet, verifyCredentials };

import "dotenv/config";
import process from "process";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
	appKey: process.env.API_KEY,
	appSecret: process.env.API_SECRET_KEY,
	accessToken: process.env.ACCESS_TOKEN,
	accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

const rwClient = client.readWrite;

export { client, rwClient };

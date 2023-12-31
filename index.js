import TweetGenerator from "./lib/tweetGenerator.js";
import MidjourneyPromptGenerator from "./lib/midjourneyPromptGenerator.js";
import MidjourneyImage from "./lib/midjourneyImagine.js";
import { client, rwClient } from "./lib/twitterClient.js";
import { mediaTweet } from "./lib/mediaTweet.js";
import { downloadImage } from "./lib/downloadImage.js";
import cron from "node-cron";

const midjourneyPromptGenerator = new MidjourneyPromptGenerator();
const midjourneyImage = new MidjourneyImage();
const tweetGenerator = new TweetGenerator();

async function main() {
	const rollDice = Math.floor(Math.random() * 100);
	if (rollDice < 25) {
		const { tweet, error } = await tweetGenerator.generate();
		if (error) {
			throw error;
		}
		await rwClient.v2.tweet(tweet);
		return;
	}

	const prompt = await midjourneyPromptGenerator.generate();
	const { msg, error } = await midjourneyImage.Chain(prompt);
	if (error) {
		throw error;
	}
	const image = await downloadImage(msg.uri);
	await mediaTweet(
		image,
		"Check this image out by #MidjourneyAI #midjourneyartwork"
	);
}

cron.schedule("0 8,12,16 * * *", () => {
	main().catch((err) => {
		console.error(err);
	});
});

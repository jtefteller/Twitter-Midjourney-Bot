import { Configuration, OpenAIApi } from "openai";
import topics from "../ideas/topics.json" assert { type: "json" };

export default class TweetGenerator {
	constructor() {
		this.configuration = new Configuration({
			apiKey: process.env.OPENAI_API_KEY,
		});
		this.openai = new OpenAIApi(this.configuration);
		this.topics = topics;
	}

	async generate() {
		let tweet, error;
		const topic = this.pickTopic();
		try {
			const completion = await this.openai.createChatCompletion({
				model: "gpt-4",
				messages: [
					{
						role: "system",
						content:
							"You are a helpful assistant that will help me create tweets for a twitter account.",
					},
					{
						role: "system",
						content: "This twitter account will mostly focus on programming",
					},
					{
						role: "system",
						content:
							"Do not break this rule: There can only be 240 characters in a tweet.",
					},
					{
						role: "user",
						content: `Write an intertesting tweet with this topic: ${topic.topic}`,
					},
					{
						role: "user",
						content:
							"Generate only one interesting fact and discussion point about said topic.",
					},
				],
			});
			tweet = completion?.data?.choices[0]?.message?.content;

			return {
				tweet,
				error,
			};
		} catch (err) {
			return {
				tweet,
				error,
			};
		}
	}
	async generateMedia(filePath = "", tweetText = "") {
		try {
			const mediaId = await client.v1.uploadMedia(filePath);
			await rwClient.v2.tweet({
				text: tweetText,
				media: { media_ids: [mediaId] },
			});
			console.log("success");
		} catch (e) {
			console.error(e);
		}
	}

	pickTopic() {
		const randomIndex = Math.floor(Math.random() * (this.topics.length + 1));
		return this.topics[randomIndex];
	}
}

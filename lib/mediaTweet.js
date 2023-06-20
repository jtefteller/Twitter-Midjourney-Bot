import { client, rwClient } from "./twitterClient.js";
export const mediaTweet = async (filePath = "", tweetText = "") => {
	try {
		const mediaId = await client.v1.uploadMedia(filePath, {
			mimeType: "image/png",
		});
		await rwClient.v2.tweet({
			text: tweetText,
			media: { media_ids: [mediaId] },
		});
		console.log("success");
	} catch (e) {
		console.error(e);
	}
};

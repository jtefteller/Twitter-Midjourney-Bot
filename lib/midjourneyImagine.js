import { Midjourney } from "midjourney";
export default class MidjourneyImage {
	constructor() {
		this.client = new Midjourney({
			ServerId: process.env.SERVER_ID,
			ChannelId: process.env.CHANNEL_ID,
			SalaiToken: process.env.SALAI_TOKEN,
			SessionId: process.env.SALAI_TOKEN,
			Debug: false,
		});
	}

	async Chain(prompt, callback) {
		let msg = {};
		let error;
		try {
			const randomIdx = Math.floor(Math.random() * 4) + 1;
			msg = await this.client.Imagine(prompt, callback);
			msg = await this.client.Upscale({
				index: randomIdx,
				msgId: msg.id,
				hash: msg.hash,
				content: msg.content,
			});
			return { msg, error };
		} catch (error) {
			return { msg, error };
		}
	}
}

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
			msg = await this.client.Imagine(prompt, callback);
			return { msg, error };
		} catch (error) {
			return { msg, error };
		}
	}
}

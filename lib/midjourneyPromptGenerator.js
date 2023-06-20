import promptDetails from "../ideas/midjourney_prompts.json" assert { type: "json" };
export default class MidjourneyPromptGenerator {
	constructor() {
		this.promptDetails = promptDetails;
	}

	generate() {
		const object = this.pickObject();
		const artist = this.pickArtist();
		const style = this.pickStyle();
		const flags = this.pickFlags();
		const prompt = `${object} by ${artist} ${style.join(", ")} ${flags}`;
		return prompt;
	}

	pickObject() {
		const randomIndex = Math.floor(
			Math.random() * (this.promptDetails.objects.length + 1)
		);
		return this.promptDetails.objects[randomIndex];
	}

	pickArtist() {
		const randomIndex = Math.floor(
			Math.random() * (this.promptDetails.artists.length + 1)
		);
		return this.promptDetails.artists[randomIndex];
	}
	pickStyle() {
		const randomI = Math.floor(Math.random() * 4);
		const indecies = {};
		for (let i = 0; i < randomI; i++) {
			const randomIndex = Math.floor(
				Math.random() * (this.promptDetails.style.length + 1)
			);
			indecies[randomIndex] = true;
		}
		return Object.keys(indecies).map((i) => this.promptDetails.style[i]);
	}

	pickFlags() {
		return this.promptDetails.flags[0];
	}
}

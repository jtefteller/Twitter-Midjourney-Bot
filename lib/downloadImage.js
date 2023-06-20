const downloadImage = async (url) => {
	const response = await fetch(url);
	const blob = await response.blob();
	const arrayBuffer = await blob.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	console.log(buffer);
	return buffer;
};

export { downloadImage };

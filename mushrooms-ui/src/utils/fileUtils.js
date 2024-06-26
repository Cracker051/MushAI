// TODO: duplicate code, refactor
export async function fetchFile(url) {
	let response = await fetch(url);
	let data = await response.blob();
	let metadata = {
		type: 'image/png',
	};
	return new File([data], 'example_mushroom.png', metadata);
}

export const file2Base64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = (error) => reject(error);
	});
};

export const dataUrlToFile = async (url, fileName, mimeType) => {
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();

	return new File([buffer], fileName, { type: mimeType });
};

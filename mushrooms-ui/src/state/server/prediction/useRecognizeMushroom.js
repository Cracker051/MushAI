import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function recognizeMushroom({ imageFile }) {
	const formData = new FormData();
	formData.append('image', imageFile);
	console.log(formData, imageFile);
	const response = await fetch(BACKEND_URL + '/prediction/mushroom/', {
		method: 'POST',
		headers: {
			// 'Content-Type': 'multipart/form-data',
		},
		body: formData,
	});
	if (!response.ok) throw new Error('Failed on recognize request', response);

	return await response.json();
}

export function useRecognizeMushroomMutation() {
	const recognizeMushroomMutation = useMutation({
		mutationFn: ({ imageFile }) =>
			toast.promise(recognizeMushroom({ imageFile }), {
				error: 'Oops.. Error on recognize. Try again!',
				success: 'Success!',
				loading: 'Processing...',
			}),
		// onSuccess: (data) => {},
		// onError: (error) => {},
	});

	return recognizeMushroomMutation;
}

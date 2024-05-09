import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { dataUrlToFile } from '../../../utils/fileUtils';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

async function createBlogPost({ user_id, title, content, is_draft, imgBase64 }) {
	const formData = new FormData();
	formData.append('blog', JSON.stringify({ user_id, title, content, is_draft }));
	imgBase64 &&
		formData.append(
			'img',
			await dataUrlToFile(imgBase64, `blog-preview-${Math.random(10000000)}.png`, 'image/png'),
		);
	const response = await fetch(BACKEND_URL + '/blog/', {
		method: 'POST',
		body: formData,
	});
	if (!response.ok) throw new Error('Failed on create blog post request', response);

	return await response.json();
}

export function useCreateBlogPost({ user_id }) {
	const queryClient = useQueryClient();

	const createBlogPostMutation = useMutation({
		mutationFn: ({ title, content, is_draft, imgBase64 }) =>
			toast.promise(createBlogPost({ user_id, title, content, is_draft, imgBase64 }), {
				error: 'Oops.. Error on creating blog post. Try again!',
				success: 'Success!',
				loading: 'Processing...',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries([`blog-posted-page`]);
		},
		// onError: (error) => {},
	});

	return createBlogPostMutation;
}

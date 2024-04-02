import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

async function postBlogComment({ user_id, blog_id, parent_id, body }) {
	const response = await fetch(BACKEND_URL + '/comment/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ user_id, blog_id, parent_id, body }),
	});
	if (!response.ok) throw new Error('Failed on create comment request', response);

	return response;
}

export function usePostBlogComment({ blog_id }) {
	const queryClient = useQueryClient();

	const postBlogCommentMutation = useMutation({
		mutationFn: ({ user_id, parent_id, body }) =>
			toast.promise(postBlogComment({ user_id, blog_id, parent_id, body }), {
				error: 'Oops.. Error on creating comment. Try again!',
				success: 'Success!',
				loading: 'Processing...',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries([`blog-${blog_id}-comments`]);
		},
		// onError: (error) => {},
	});

	return postBlogCommentMutation;
}

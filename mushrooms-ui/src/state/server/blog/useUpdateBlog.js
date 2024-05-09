import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetch } from '../../../utils/apiAuth';

export async function updateBlogPost({ id, values }) {
	console.log('updateBlogPost', id, values);
	const response = await fetch(`/blog/${id}/`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	});
	if (!response.ok) throw new Error('Failed on update blog request', response);

	return await response.json();
}

export function useUpdateBlogPost({ id }) {
	const queryClient = useQueryClient();

	const updateBlogPostMutation = useMutation({
		mutationFn: ({ values }) => updateBlogPost({ id, values }),
		onSuccess: () => {
			queryClient.invalidateQueries([`blog-${id}`]);
		},
	});

	return updateBlogPostMutation;
}

import { useMutation } from '@tanstack/react-query';

import { fetch } from '../../../utils/apiAuth';
import { dataUrlToFile } from '../../../utils/fileUtils';

export async function updateBlogPostIcon({ id, newImageBase64 }) {
	const formData = new FormData();
	formData.append(
		'img',
		await dataUrlToFile(newImageBase64, `icon-${Math.random(10000000)}.png`, 'image/png'),
	);
	const response = await fetch(`/blog/${id}/`, {
		method: 'PUT',
		body: formData,
	});
	if (!response.ok) throw new Error('Failed on update blog icon request', response);

	return await response.json();
}

export function useUpdateBlogPostIcon() {
	const updateBlogPostIconMutation = useMutation({
		mutationFn: ({ id, newImageBase64 }) => updateBlogPostIcon({ id, newImageBase64 }),
		onSuccess: () => {},
	});

	return updateBlogPostIconMutation;
}

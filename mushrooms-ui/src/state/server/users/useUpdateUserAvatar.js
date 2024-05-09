import { useMutation } from '@tanstack/react-query';

import { fetch } from '../../../utils/apiAuth';
import { dataUrlToFile } from '../../../utils/fileUtils';

export async function updateUserAvatar({ id, newImageBase64 }) {
	const formData = new FormData();
	formData.append(
		'img',
		await dataUrlToFile(newImageBase64, `avatar-${Math.random(10000000)}.png`, 'image/png'),
	);
	const response = await fetch(`/users/${id}/avatar/`, {
		method: 'PUT',
		body: formData,
	});
	if (!response.ok) throw new Error('Failed on update user avatar request', response);

	return await response.json();
}

export function useUpdateUserAvatar() {
	const updateUserAvatarMutation = useMutation({
		mutationFn: ({ id, newImageBase64 }) => updateUserAvatar({ id, newImageBase64 }),
		onSuccess: () => {},
	});

	return updateUserAvatarMutation;
}

import { useMutation } from '@tanstack/react-query';
import { fetch } from '../../../utils/apiAuth';

export async function updateUser({ id, values }) {
	const response = await fetch(`/users/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(values),
	});
	if (!response.ok) throw new Error('Failed on update user request', response);

	return await response.json();
}

export function useUpdateUser() {
	const updateUserMutation = useMutation({
		mutationFn: ({ id, values }) => updateUser({ id, values }),
		onSuccess: () => {},
	});

	return updateUserMutation;
}

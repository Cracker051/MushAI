import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetch } from '../../../utils/apiAuth';

export async function updateUser({ values }) {
	const response = await fetch(`/users/me`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	});
	if (!response.ok) throw new Error('Failed on update user request', response);

	return await response.json();
}

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const updateUserMutation = useMutation({
		mutationFn: ({ values }) => updateUser({ values }),
		onSuccess: () => {
			queryClient.invalidateQueries(['user-data']);
		},
	});

	return updateUserMutation;
}

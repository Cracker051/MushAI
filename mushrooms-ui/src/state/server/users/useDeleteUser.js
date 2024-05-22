import { useMutation } from '@tanstack/react-query';
import { fetch } from '../../../utils/apiAuth';
import toast from 'react-hot-toast';

export async function deleteUser({ id }) {
	const response = await fetch(`/shared/users/` + id, {
		method: 'DELETE',
	});
	if (!response.ok) throw new Error('Failed on delete user request', response);

	// resetState();

	return true;
}

export function useDeleteUser({ id }) {
	const deleteUserMutation = useMutation({
		mutationFn: () =>
			toast.promise(deleteUser({ id }), {
				error: 'Oops.. Error on delete user account. Try again!',
				success: 'Success!',
				loading: 'Processing...',
			}),
		onSuccess: () => {},
	});

	return deleteUserMutation;
}

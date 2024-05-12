import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetState } from '../../client/authStore';
import { fetch } from '../../../utils/apiAuth';

export async function logOut() {
	const response = await fetch('/auth/jwt/logout', {
		method: 'POST',
	});

	if (!response.ok && response.status !== 401)
		throw new Error('Failed on logout request', response);

	resetState();
}

export function useLogOut(notify = true) {
	const queryClient = useQueryClient();

	const { mutate: logOutMutation } = useMutation({
		mutationFn: () =>
			notify
				? toast.promise(logOut(), {
						error: 'Oops.. Error on log out. Try again!',
						success: 'Success!',
						loading: 'Processing...',
				})
				: logOut(),
		retry: false,
		onSuccess: () => {
			queryClient.invalidateQueries(['user-data']);
		},
		// onSuccess: (data) => {},
		// onError: (error) => {},
	});

	return logOutMutation;
}

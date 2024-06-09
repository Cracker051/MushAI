import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function requestVerifyEmail({ email }) {
	const response = await fetch(BACKEND_URL + '/auth/request-verify-token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
	if (!response.ok) throw new Error('Failed on requesting verify email', response);

	return await response.json();
}

export function useRequestVerifyEmail() {
	const queryClient = useQueryClient();

	const requestVerifyEmailMutation = useMutation({
		mutationFn: ({ email }) =>
			toast.promise(requestVerifyEmail({ email }), {
				error: 'Oops.. Error requesting verify email. Try again!',
				success: 'Verify email requested successfully!',
				loading: 'Processing...',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries(['user-data']);
		},
	});

	return requestVerifyEmailMutation;
}

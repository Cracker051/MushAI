import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function verifyEmail({ token }) {
	const response = await fetch(BACKEND_URL + '/auth/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token }),
	});
	if (!response.ok) throw new Error('Failed on verify email request', response);

	return await response.json();
}

export function useVerifyEmail() {
	const queryClient = useQueryClient();

	const verifyEmailMutation = useMutation({
		mutationFn: ({ token }) =>
			toast.promise(verifyEmail({ token }), {
				error: 'Oops.. Error on verify email. Try again!',
				success: 'Email confirmed successfully!',
				loading: 'Processing...',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries(['user-data']);
		},
	});

	return verifyEmailMutation;
}

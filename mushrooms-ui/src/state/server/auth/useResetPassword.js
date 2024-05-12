import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function resetPassword({ token, password }) {
	const response = await fetch(BACKEND_URL + '/auth/password/reset-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token, password }),
	});
	if (!response.ok) throw new Error('Failed on reset password request', response);

	return await response.json();
}

export function useResetPassword() {
	const resetPasswordMutation = useMutation({
		mutationFn: ({ token, password }) =>
			toast.promise(resetPassword({ token, password }), {
				error: 'Oops.. Error on reset password. Try again!',
				success: 'Email confirmed successfully!',
				loading: 'Processing...',
			}),
	});

	return resetPasswordMutation;
}

import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function sendPasswordRecovery({ email }) {
	const response = await fetch(BACKEND_URL + '/auth/password/forgot-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
	if (!response.ok) throw new Error('Failed on send password recovery request', response);

	return await response.json();
}

export function useSendPasswordRecovery() {
	const sendPasswordRecoveryMutation = useMutation({
		mutationFn: ({ email }) =>
			toast.promise(sendPasswordRecovery({ email }), {
				error: 'Oops.. Error on send password recovery. Try again!',
				success: 'Email confirmed successfully!',
				loading: 'Processing...',
			}),
	});

	return sendPasswordRecoveryMutation;
}

import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setAuthAccessToken } from '../../client/authStore';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function signIn({ email, password }) {
	const response = await fetch(BACKEND_URL + '/auth/jwt/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({ username: email, password }),
	});
	if (!response.ok) throw new Error('Failed on sign in request', response);

	return await response.json();
}

export function useSignIn() {
	const navigate = useNavigate();

	const { mutate: signInMutation } = useMutation({
		mutationFn: ({ email, password }) =>
			toast.promise(signIn({ email, password }), {
				error: 'Oops.. Error on log in. Try again!',
				success: 'Success!',
				loading: 'Processing...',
			}),
		onSuccess: (data) => {
			setAuthAccessToken(data.access_token);
			navigate('/profile');
		},
		// onError: (error) => {},
	});

	return signInMutation;
}

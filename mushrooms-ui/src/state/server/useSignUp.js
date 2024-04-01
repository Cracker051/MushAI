import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signIn } from './useSignIn';
import { setAuthAccessToken } from '../client/authStore';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

async function signUp({ name, surname, email, password }) {
	const response = await fetch(BACKEND_URL + '/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, surname, email, password }),
	});
	if (!response.ok) throw new Error('Failed on sign up request', response);

	const responseLogin = await signIn({ email, password });
	return responseLogin;
}

export function useSignUp() {
	const navigate = useNavigate();

	const { mutate: signUpMutation } = useMutation({
		mutationFn: ({ name, surname, email, password }) =>
			toast.promise(signUp({ name, surname, email, password }), {
				error: 'Oops.. Error on sign up. Try again!',
				success: 'Success!',
				loading: 'Processing...',
			}),
		onSuccess: (data) => {
			setAuthAccessToken(data.access_token);
			navigate('/profile');
		},
		// onError: (error) => {},
	});

	return signUpMutation;
}

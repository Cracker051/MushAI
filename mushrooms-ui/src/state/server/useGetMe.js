import { useMutation } from '@tanstack/react-query';
import { setAuthUser } from '../client/authStore';
import { fetch } from '../../utils/apiAuth';

export async function getMe() {
	const response = await fetch('/users/me', {
		method: 'GET',
	});
	if (!response.ok) throw new Error('Failed on get me request', response);

	return await response.json();
}

export function useGetMe() {
	const getMeMutation = useMutation({
		mutationFn: () => getMe(),
		onSuccess: (data) => {
			setAuthUser(data);
		},
		// onError: (error) => {},
	});

	return getMeMutation;
}

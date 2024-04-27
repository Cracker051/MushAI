import { useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getUser({ id }) {
	const response = await fetch(BACKEND_URL + '/shared/users' + `/${id}`, {
		method: 'GET',
	});
	if (!response.ok) throw new Error('Failed fetching user', response);

	return await response.json();
}

export function useGetUser({ id }) {
	const getUserQuery = useQuery({
		queryKey: [`user-${id}`],
		queryFn: async () => await getUser({ id }),
		retry: false,
	});

	return getUserQuery;
}

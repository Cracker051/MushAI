import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetch } from '../../../utils/apiAuth';

export async function getMe() {
	const response = await fetch('/users/me', {
		method: 'GET',
	});
	if (!response.ok) throw new Error('Failed on get me request', response);

	return await response.json();
}

export function useGetMe({ enabled = true }) {
	const getMeQuery = useQuery({
		queryFn: async () => await getMe(),
		queryKey: ['user-data'],
		enabled,
		retry: 2,
		staleTime: 0,
		gcTime: 0,
		placeholderData: keepPreviousData,
	});
	return getMeQuery;
}

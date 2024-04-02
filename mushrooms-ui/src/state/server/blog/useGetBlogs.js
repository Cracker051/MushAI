import { useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getBlogs() {
	const response = await fetch(BACKEND_URL + '/blog/', {
		method: 'GET',
	});
	if (!response.ok) throw new Error('Failed fetching blogs', response);

	return await response.json();
}

export function useGetBlogs() {
	const getBlogsQuery = useQuery({
		queryKey: ['blog-list'],
		queryFn: () => getBlogs(),
	});

	return getBlogsQuery;
}

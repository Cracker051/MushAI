import { useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getPostedBlogs() {
	const response = await fetch(BACKEND_URL + '/blog/posted/', {
		method: 'GET',
	});
	if (!response.ok) throw new Error('Failed fetching blogs', response);

	return await response.json();
}

export function useGetPostedBlogs() {
	const getBlogsQuery = useQuery({
		queryKey: ['blog-posted-list'],
		queryFn: () => getPostedBlogs(),
	});

	return getBlogsQuery;
}

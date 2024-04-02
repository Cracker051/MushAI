import { useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getBlogComments({ id }) {
	const response = await fetch(BACKEND_URL + '/comment' + '/blog' + `/${id}`, {
		method: 'GET',
	});
	if (!response.ok) throw new Error('Failed fetching blogs', response);

	return await response.json();
}

export function useGetBlogComments({ id }) {
	const getBlogCommentsQuery = useQuery({
		queryKey: [`blog-${id}-comments`],
		queryFn: async () => getBlogComments({ id }),
	});

	return getBlogCommentsQuery;
}

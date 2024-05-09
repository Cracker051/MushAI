import { useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getBlogComments({ id, page }) {
	const response = await fetch(
		BACKEND_URL + '/comment' + '/blog' + `/${id}?` + new URLSearchParams({ page }),
		{
			method: 'GET',
		},
	);
	if (!response.ok) throw new Error('Failed fetching blogs', response);

	return await response.json();
}

export function useGetBlogComments({ id, page }) {
	const getBlogCommentsQuery = useQuery({
		queryKey: [`blog-${id}-comments`, page],
		queryFn: async () => getBlogComments({ id, page }),
	});

	return getBlogCommentsQuery;
}

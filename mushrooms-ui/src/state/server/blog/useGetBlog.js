import { useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getBlog({ id }) {
	const response = await fetch(BACKEND_URL + '/blog' + `/${id}`, {
		method: 'GET',
	});
	if (!response.ok) throw new Error('Failed fetching blogs', response);

	return await response.json();
}

export function useGetBlog({ id, enabled = true }) {
	const getBlogQuery = useQuery({
		queryKey: [`blog-${id}`],
		queryFn: async () => await getBlog({ id }),
		retry: false,
		enabled,
	});

	return getBlogQuery;
}

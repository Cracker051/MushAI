import { keepPreviousData, useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getPostedBlogs({ page, size }) {
	const response = await fetch(
		BACKEND_URL + '/blog/posted/?' + new URLSearchParams({ page, size }),
		{
			method: 'GET',
		},
	);
	if (!response.ok) throw new Error('Failed fetching blogs', response);

	return await response.json();
}

export function useGetPostedBlogs({ page, size }) {
	const getBlogsQuery = useQuery({
		queryKey: ['blog-posted-page', page, size],
		queryFn: () => getPostedBlogs({ page, size }),
		placeholderData: keepPreviousData,
	});

	return getBlogsQuery;
}

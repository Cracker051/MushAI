import { keepPreviousData, useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getPostedBlogsByUser({ id, page, size }) {
	const response = await fetch(
		BACKEND_URL + `/blog/posted/${id}?` + new URLSearchParams({ page, size }),
		{
			method: 'GET',
		},
	);
	if (!response.ok) throw new Error('Failed fetching blogs', response);

	return await response.json();
}

export function useGetPostedBlogsByUser({ id, page, size }) {
	const getBlogsByUserQuery = useQuery({
		queryKey: [`blog-posted-page-user-${id}`, page, size],
		queryFn: () => getPostedBlogsByUser({ id, page, size }),
		placeholderData: keepPreviousData,
	});

	return getBlogsByUserQuery;
}

import { keepPreviousData, useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export async function getDraftBlogsByUser({ id, page, size }) {
	const response = await fetch(
		BACKEND_URL + `/blog/drafts/${id}?` + new URLSearchParams({ page, size }),
		{
			method: 'GET',
		},
	);
	if (!response.ok) throw new Error('Failed fetching blogs', response);

	return await response.json();
}

export function useGetDraftBlogsByUser({ id, page, size }) {
	const getBlogsByUserQuery = useQuery({
		queryKey: [`blog-draft-page-user-${id}`, page, size],
		queryFn: () => getDraftBlogsByUser({ id, page, size }),
		placeholderData: keepPreviousData,
	});

	return getBlogsByUserQuery;
}

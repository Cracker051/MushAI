import { useState } from 'react';

import { useQuery } from '../utils/useQuery';
import { useGetDraftBlogsByUser } from '../state/server/blog/useGetDraftBlogsByUser';

import BlogPost from './BlogPost';
import Pagination from './Pagination';

const UserPosts = ({ user, pageSize }) => {
	const query = useQuery();
	const [currentPage, setCurrentPage] = useState(query.get('page') ?? 1);
	const blogsQuery = useGetDraftBlogsByUser({ id: user.id, page: currentPage, size: pageSize });

	return (
		<>
			{blogsQuery.data?.items.length > 0 ? (
				<>
					<div className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
						{blogsQuery.data?.items.map((post) => (
							<BlogPost
								post={{
									...post,
									user,
								}}
								key={post.id}
							/>
						))}
					</div>
					{blogsQuery.data && blogsQuery.data.pages > 1 && (
						<Pagination
							currentPage={currentPage}
							onChangePage={setCurrentPage}
							pageCount={blogsQuery.data?.pages}
						/>
					)}
				</>
			) : (
				<p className="p-16 text-4xl font-extrabold text-center uppercase text-msh-light ">
					No drafts found 🥺
				</p>
			)}
		</>
	);
};

export default UserPosts;

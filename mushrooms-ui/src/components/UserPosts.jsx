import { useState } from 'react';

import { useQuery } from '../utils/useQuery';
import { useGetPostedBlogsByUser } from '../state/server/blog/useGetPostedBlogsByUser';

import BlogPost from './BlogPost';
import Pagination from './Pagination';

const UserPosts = ({ user, pageSize }) => {
	const query = useQuery();
	const [currentPage, setCurrentPage] = useState(query.get('page') ?? 1);
	const blogsQuery = useGetPostedBlogsByUser({ id: user?.id, page: currentPage, size: pageSize });

	return (
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
	);
};

export default UserPosts;

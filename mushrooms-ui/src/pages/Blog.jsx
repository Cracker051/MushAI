import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BlogPost from '../components/BlogPost';
import Pagination from '../components/Pagination';

import { useQuery } from '../utils/useQuery';
import { useAuthStore } from '../state/client/authStore';
import { useGetPostedBlogs } from '../state/server/blog/useGetBlogs';

const Selector = ({ onClick, linkTo, children, isActive }) => {
	return (
		<Link
			onClick={onClick}
			to={linkTo}
			className={
				'block p-1 uppercase' +
				(isActive
					? ' border-b-2 border-white'
					: ' transition-colors border-b-2 border-transparent hover:border-white')
			}>
			{children}
		</Link>
	);
};

const options = ['all', 'popular', 'new', 'your', 'our'];
const pageSize = 20;

const Blog = () => {
	const query = useQuery();
	const navigate = useNavigate();
	const token = useAuthStore((state) => state.token);

	const tabOptions = useMemo(
		() => (token ? options : options.filter((option) => option !== 'your')),
		[token],
	);
	const currentTab = query.get('tab');

	const [currentPage, setCurrentPage] = useState(query.get('page') ?? 1);

	const changeURL = useCallback(
		(newTab) => {
			navigate(`/blog/?tab=${newTab}&page=${currentPage}`);
		},
		[currentPage, navigate],
	);

	useEffect(() => {
		if (!currentTab || !tabOptions.includes(currentTab)) changeURL(tabOptions[0]);
		else changeURL(currentTab);
	}, [changeURL, currentPage, currentTab, navigate, tabOptions]);

	const blogsQuery = useGetPostedBlogs({ page: currentPage, size: pageSize });

	return (
		<>
			<section className="bg-msh-dark text-msh-light">
				<div className="container px-6 py-6 mx-auto">
					<div className="space-y-1">
						<h2 className="text-5xl font-semibold">ALL POSTS</h2>
						<div className="flex flex-wrap gap-4 text-lg font-semibold uppercase select-none">
							{tabOptions.map((tab, index) => (
								<Selector key={index} linkTo={`/blog/?tab=${tab}`} isActive={currentTab === tab}>
									{tab}
								</Selector>
							))}
						</div>
					</div>
					<div className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
						{blogsQuery.data?.items.map((post) => (
							<BlogPost
								post={{
									...post,
								}}
								key={post.id}
							/>
						))}
					</div>
					{blogsQuery.data && (
						<Pagination
							currentPage={currentPage}
							onChangePage={setCurrentPage}
							pageCount={blogsQuery.data?.pages}
						/>
					)}
				</div>
			</section>
		</>
	);
};

export default Blog;

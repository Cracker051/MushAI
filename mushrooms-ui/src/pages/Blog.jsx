import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BlogPost from '../components/BlogPost';

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

const Blog = () => {
	const query = useQuery();
	const navigate = useNavigate();
	const token = useAuthStore((state) => state.token);

	const tabOptions = useMemo(
		() => (token ? options : options.filter((option) => option !== 'your')),
		[token],
	);
	const currentTab = query.get('tab');

	useEffect(() => {
		const changeTab = (newTab) => {
			navigate(`/blog/?tab=${newTab}`);
		};
		if (!currentTab || !tabOptions.includes(currentTab)) changeTab(tabOptions[0]);
	}, [currentTab, navigate, tabOptions]);

	const blogsQuery = useGetPostedBlogs();

	return (
		<>
			<section className="bg-stone-900 text-stone-100">
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
						{blogsQuery.data?.map((post) => (
							<BlogPost
								post={{
									...post,
								}}
								key={post.id}
							/>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Blog;

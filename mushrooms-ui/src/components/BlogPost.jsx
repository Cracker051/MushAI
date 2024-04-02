import { Link } from 'react-router-dom';

import { isDateBeforeTodayForOneWeek } from '../utils/dateUtils';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;
const fallbackImageSrc = '/88b86b40aaaa67af60b3ddd61d873685.png';

const BlogPost = ({ post }) => {
	const isPostNew = isDateBeforeTodayForOneWeek(post.created_at);
	return (
		<Link to={`/blog/${post.id}`} className="transition-opacity hover:opacity-60">
			<div className="relative select-none">
				{isPostNew && (
					<div className="absolute px-1 font-medium text-black rounded-md top-5 left-5 bg-amber-400">
						New
					</div>
				)}
				<img
					src={post.avatar ? BACKEND_URL + `/${post.avatar}` : ''}
					onError={(e) => {
						if (e.target.src !== fallbackImageSrc) {
							e.target.src = fallbackImageSrc;
						}
					}}
					alt=""
					className="object-cover w-full h-80"
				/>
			</div>
			<div className="py-3 text-center uppercase">
				<p className="text-lg font-black">{post.title}</p>
				<p className="text-lg font-semibold">
					{post.user.name} {post.user.surname}
				</p>
			</div>
		</Link>
	);
};

export default BlogPost;

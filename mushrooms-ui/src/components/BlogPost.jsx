import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => {
	return (
		<Link to={`/blog/${post.id}`} className="transition-opacity hover:opacity-60">
			<div className="relative select-none">
				{post.new && (
					<div className="absolute px-1 font-medium text-black rounded-md top-5 left-5 bg-amber-400">
						New
					</div>
				)}
				<img src={post.imageSrc} alt="" className="object-cover w-full h-80" />
			</div>
			<div className="py-3 text-center uppercase">
				<p className="text-lg font-black">{post.title}</p>
				<p className="text-lg font-semibold">{post.author}</p>
			</div>
		</Link>
	);
};

export default BlogPost;

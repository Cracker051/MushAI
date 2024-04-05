import { Link } from 'react-router-dom';

import BlogPost from '../components/BlogPost';

import { useGetPostedBlogs } from '../state/server/blog/useGetBlogs';

const mushs = [
	{
		imageSrc: 'bdd9d595744a59b5a215cb88e4205be7.png',
	},
	{
		element: (
			<div className="flex flex-col items-center justify-center h-full gap-1 text-center max-sm:16 max-lg:py-20">
				<p className="text-3xl font-bold">POST YOUR MUSH</p>
				<Link
					to={'/sign-up'}
					className="px-4 py-2 text-3xl font-extrabold leading-none text-black transition-colors rounded-2xl bg-msh-light hover:bg-stone-300/80">
					JOIN
				</Link>
			</div>
		),
	},
	{
		imageSrc: 'c1eaa624fdf26995b6e925048924f7dd.png',
	},
	{
		imageSrc: 'd45fc58b08d4d82e4149fea6816b8ed5.png',
	},
	{
		imageSrc: '5b1278dc114bc089eddb8b0bb5587cd0.png',
	},
	{
		imageSrc: 'f0e58abfb3648741492039ec158736a8.png',
	},
];

const Community = () => {
	const blogsQuery = useGetPostedBlogs();
	return (
		<>
			<div className="bg-cover text-4xl bg-opacity-80 bg-center bg-[url('/community_bg.png')] lg:bg-[url('/community_bg_2x.png')] text-center text-msh-light">
				<div className="px-2 py-40 sm:py-72">
					<h1 className="font-black lg:text-5xl drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
						DISCOVER THE MAGIC
					</h1>
				</div>
				<h3 className="py-6 text-center max-sm:text-3xl">
					Mush
					<span className="px-1 mx-1 leading-none rounded-md text-msh-dark bg-msh-light">AI</span>
				</h3>
			</div>
			<section className="bg-msh-dark text-msh-light">
				<div className="container px-10 py-6 mx-auto">
					<h3 className="text-2xl font-extrabold">NEW POSTS</h3>
					<div className="grid grid-cols-1 gap-5 py-6 lg:grid-cols-4">
						{blogsQuery.data?.slice(0, 4).map((post) => (
							<BlogPost
								post={{
									...post,
								}}
								key={post.id}
							/>
						))}
					</div>
					<div className="text-right">
						<Link
							to={'/blog/?tab=all'}
							className="font-semibold transition-opacity hover:opacity-60">
							WATCH ALL
						</Link>
					</div>
				</div>
			</section>
			<section className="bg-msh-dark text-msh-light">
				<div className="container px-10 py-6 mx-auto">
					<div className="grid grid-cols-1 py-6 lg:grid-cols-3">
						{mushs?.map((mush, id) => (
							<div key={mush.imageSrc + id}>
								{mush.imageSrc ? (
									<img
										src={'/mushs/' + mush.imageSrc}
										alt=""
										className="object-cover w-full h-52 sm:h-80"
									/>
								) : (
									mush.element
								)}
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Community;

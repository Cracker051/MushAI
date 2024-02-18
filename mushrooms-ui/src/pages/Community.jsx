import MainHeader from '../components/MainHeader';
import RequestSubscription from '../components/RequestSubscription';
import MainFooter from '../components/MainFooter';
import { Link } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const newPosts = [
	{
		imageSrc: '/78d1be486c3ba173e56c58e881523446.png',
		title: 'HONEY FUNGI.WHEN TO LOOK FOR?',
		author: 'Sam Derek',
		new: true,
	},
	{
		imageSrc: '/50c16806fe66b70ae70d023721ee8663.png',
		title: 'MUSHROOMS IN MEDICINE',
		author: 'Ben Grigory',
		new: true,
	},
	{
		imageSrc: '/88b86b40aaaa67af60b3ddd61d873685.png',
		title: 'MUSHROOMS IN WORLD OF ANIMALS',
		author: 'Lobby Pits',
		new: true,
	},
	{
		imageSrc: '/5efec57967e3f6680c05ea2825cb821a.png',
		title: 'FAIRY MUSHROOMS',
		author: 'Steve Lecklers',
		new: true,
	},
];

const mushs = [
	{
		imageSrc: 'bdd9d595744a59b5a215cb88e4205be7.png',
	},
	{
		element: (
			<div className="flex flex-col items-center justify-center h-full gap-1 text-center max-sm:16 max-lg:py-20">
				<p className="text-3xl font-bold">POST YOUR MUSH</p>
				<Link
					to={'/'}
					className="px-4 py-2 text-3xl font-extrabold leading-none text-black transition-colors rounded-2xl bg-stone-100 hover:bg-stone-300/80">
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
	return (
		<>
			<MainHeader />
			<div className="bg-cover text-4xl bg-opacity-80 bg-center bg-[url('/community_bg.png')] lg:bg-[url('/community_bg_2x.png')] text-center text-stone-100">
				<div className="px-2 py-40 sm:py-72">
					<h1 className="font-black lg:text-5xl drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
						DISCOVER THE MAGIC
					</h1>
				</div>
				<h3 className="py-6 text-center max-sm:text-3xl">
					Mush
					<span className="px-1 mx-1 leading-none rounded-md text-stone-900 bg-stone-100">AI</span>
				</h3>
			</div>
			<section className="bg-stone-900 text-stone-100">
				<div className="container px-10 py-6 mx-auto">
					<h3 className="text-2xl font-extrabold">NEW POSTS</h3>
					<div className="grid grid-cols-1 gap-5 py-6 lg:grid-cols-4">
						{newPosts?.map((post, index) => (
							<BlogPost post={post} key={index} />
						))}
					</div>
					<div className="text-right">
						<Link to={''} className="font-semibold transition-opacity hover:opacity-60">
							WATCH ALL
						</Link>
					</div>
				</div>
			</section>
			<section className="bg-stone-900 text-stone-100">
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
			<RequestSubscription />
			<MainFooter dark />
		</>
	);
};

export default Community;

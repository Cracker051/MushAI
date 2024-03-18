import MainHeader from '../components/MainHeader';
import RequestSubscription from '../components/RequestSubscription';
import MainFooter from '../components/MainFooter';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '../utils/useQuery';
import { useEffect } from 'react';
import BlogPost from '../components/BlogPost';

const posts = [
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
	{
		imageSrc: '/03b80b2e4c22bcbe6cda807396e7ae96.png',
		title: 'BARBIE MUSHROOMS',
		author: 'DEVA AOKI',
	},
	{
		imageSrc: '/9cde8f873ac4a6755fa40e9d422a4dd8.png',
		title: 'MUSHROOMS IN WINTER',
		author: 'Lora Saps',
	},
	{
		imageSrc: '/2cbc0c1a732b1118b400fb6db8088d7b.png',
		title: 'MUSHROOMS IN ART',
		author: 'BETTY PARKER',
	},
	{
		imageSrc: '/186b00e9bddbb79202e56254b99a912f.png',
		title: 'MUSHY COOKING',
		author: 'Landa Kerry',
	},
];

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
	const currentTab = query.get('tab');

	useEffect(() => {
		const changeTab = (newTab) => {
			navigate(`/blog/?tab=${newTab}`);
		};
		if (!currentTab || !options.includes(currentTab)) changeTab(options[0]);
	}, [currentTab, navigate]);

	return (
		<>
			<MainHeader />
			<section className="bg-stone-900 text-stone-100">
				<div className="container px-6 py-6 mx-auto">
					<div className="space-y-1">
						<h2 className="text-5xl font-semibold">ALL POSTS</h2>
						<div className="flex flex-wrap gap-4 text-lg font-semibold uppercase">
							{options.map((tab, index) => (
								<Selector key={index} linkTo={`/blog/?tab=${tab}`} isActive={currentTab === tab}>
									{tab}
								</Selector>
							))}
						</div>
					</div>
					<div className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
						{posts?.map((post, index) => (
							<BlogPost post={{ ...post, id: index }} key={index} />
						))}
					</div>
				</div>
			</section>

			<RequestSubscription />
			<MainFooter dark />
		</>
	);
};

export default Blog;

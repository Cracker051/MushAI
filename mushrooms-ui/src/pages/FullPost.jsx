import MainHeader from '../components/MainHeader';
import RequestSubscription from '../components/RequestSubscription';
import MainFooter from '../components/MainFooter';
import LikeIcon from '../assets/icon_like.svg';
import UserIcon from '../assets/icon_user_2.svg';
import CommentBlog from '../components/CommentBlog';

const FullPost = () => {
	return (
		<>
			<MainHeader />
			<div className="relative w-full h-[600px] bg-stone-900">
				<div className="w-full h-full absolute shadow-[inset_0_0_40px_40px_rgba(28,25,23,0.5)] top-0 bottom-0"></div>
				<img
					src={'/blogpost_bg.png'}
					srcSet={`/blogpost_bg.png 768w, /blogpost_bg_3x.jpg 1280w`}
					alt=""
					className="object-cover object-center w-full h-full opacity-60"
				/>
			</div>
			<div className=" bg-stone-900 text-stone-100">
				<section className="container relative flex flex-col items-center gap-12 px-6 pt-32 pb-24 mx-auto">
					<div className="relative self-stretch xl:mx-64">
						<div className="z-30 flex flex-col gap-6 absolute -top-16 -translate-y-full items-center w-full px-6 py-3 uppercase bg-stone-900 shadow-[0_0_20px_30px_rgba(0,0,0,0.4)] text-center">
							<button className="self-end" onClick={() => alert('Like!')}>
								<img src={LikeIcon} alt="" />
							</button>
							<h1 className="text-6xl font-extrabold">Fairy Mushrooms</h1>
							<h3 className="text-3xl font-bold">WRITTEN BY: ALAN WALKER</h3>
							<div className="w-2/6 border-t-4 border-stone-100"></div>
							<h4 className="text-2xl font-medium">MARCH 10</h4>
						</div>
						<aside className="xl:w-[200px] xl:absolute xl:-translate-x-full xl:h-full">
							<div className="sticky top-0 py-5 -mt-5 space-y-5">
								<span className="text-xl font-medium">IN THIS ARTICLE</span>
								<ul className="flex flex-col gap-5 pl-5 text-sm font-semibold uppercase border-l-2 border-stone-100">
									<li>INTRODUCTION</li>
									<li>THE MAGIC AND FOLKLORE</li>
									<li>SCIENTIFIC EXPLORATION</li>
									<li>CONCLUSION</li>
								</ul>
							</div>
						</aside>
						<article className="[&>p]:mb-12 [&>h1]:mb-4 [&>h1]:font-bold [&>h1]:text-2xl [&>p]:font-semibold [&>p]:text-lg">
							<h1>INTRODUCTION</h1>
							<p>
								DEEP WITHIN ENCHANTED FORESTS AND HIDDEN GLENS, A WHIMSICAL SIGHT AWAITS THOSE WHO
								DARE TO EXPLORE: FAIRY MUSHROOMS. THESE ENCHANTING FUNGI, OFTEN ADORNED WITH
								DELICATE CAPS AND GLOWING HUES, HAVE CAPTURED THE IMAGINATION OF NATURE ENTHUSIASTS
								AND FOLKLORE ENTHUSIASTS ALIKE. BUT WHAT EXACTLY ARE FAIRY MUSHROOMS, AND WHAT TALES
								DO THEY HOLD WITHIN THEIR WHIMSICAL FORMS?
							</p>
							<h1>THE MAGIC AND FOLKLORE</h1>
							<p>
								IN FOLKLORE AND LEGEND, FAIRY MUSHROOMS ARE OFTEN ASSOCIATED WITH MAGIC, MYSTERY,
								AND OTHERWORLDLY BEINGS. ACCORDING TO SOME TALES, THESE MUSHROOMS ARE SAID TO BE
								PORTALS TO THE REALM OF THE FAE, WHERE MYSTICAL CREATURES DWELL AND ENCHANTMENTS
								ABOUND. ITS BELIEVED THAT FAIRIES AND WOODLAND SPIRITS ARE DRAWN TO THESE MUSHROOMS,
								USING THEM AS MEETING PLACES OR HIDING SPOTS FROM PRYING HUMAN EYES. IN SOME
								CULTURES, CONSUMING FAIRY MUSHROOMS IS THOUGHT TO BESTOW BLESSINGS, GRANT WISHES, OR
								EVEN ALLOW ONE TO GLIMPSE INTO THE REALM OF THE FAE.
							</p>
							<h1>SCIENTIFIC EXPLORATION</h1>
							<p>
								WHILE THE TALES OF FAIRY MUSHROOMS MAY SEEM FANTASTICAL, THERE IS SCIENTIFIC TRUTH
								BEHIND THEIR ENCHANTING APPEARANCE. FAIRY MUSHROOMS, ALSO KNOWN AS BIOLUMINESCENT
								FUNGI, POSSESS THE ABILITY TO EMIT A SOFT, ETHEREAL GLOW IN THE DARKNESS OF THE
								FOREST FLOOR. THIS BIOLUMINESCENCE IS CAUSED BY CHEMICAL REACTIONS WITHIN THE
								MUSHROOM CELLS, CREATING A MESMERIZING DISPLAY THAT HAS PUZZLED SCIENTISTS FOR
								CENTURIES. RESEARCH INTO THE BIOLOGY AND ECOLOGY OF FAIRY MUSHROOMS CONTINUES TO
								UNCOVER THE SECRETS BEHIND THEIR LUMINOUS GLOW, SHEDDING LIGHT ON THE FASCINATING
								INTERPLAY BETWEEN FUNGI AND THE NATURAL WORLD.
							</p>
							<h1>CONCLUSION</h1>
							<p>
								IN CONCLUSION, FAIRY MUSHROOMS ARE MORE THAN JUST WHIMSICAL DECORATIONS IN THE
								FOREST—THEY ARE GATEWAYS TO A REALM OF MAGIC, MYSTERY, AND SCIENTIFIC WONDER.
								WHETHER ENCOUNTERED IN ANCIENT FOLKLORE OR STUDIED UNDER A MICROSCOPE, THESE
								ENCHANTING FUNGI CONTINUE TO CAPTIVATE THE IMAGINATION AND INSPIRE AWE IN THOSE WHO
								ENCOUNTER THEM.
							</p>
						</article>
					</div>
					<div className="flex flex-col self-stretch gap-3 xl:mx-64">
						<div className="border-b-2 border-stone-100">
							<h3 className="text-lg font-semibold uppercase">
								<span>(2)</span>COMMENTS
							</h3>
						</div>
						<div className="flex items-center gap-2">
							<img src={UserIcon} alt="" className="w-10 h-10" />
							<input
								type="text"
								placeholder="LEAVE A COMMENT..."
								className="flex-1 px-2 text-base bg-transparent border-2 focus:outline-none placeholder:text-stone-100 placeholder:font-semibold border-stone-100"
							/>
							<button className="p-1 text-base font-semibold transition-colors rounded-sm shadow text-stone-100 bg-stone-300/20 hover:bg-stone-300/50">
								SEND
							</button>
						</div>
						<div className="flex flex-col gap-4">
							{comments.map((comm, i) => (
								<CommentBlog key={i} data={comm} />
							))}
						</div>
					</div>
				</section>
			</div>
			<RequestSubscription />
			<MainFooter dark />
		</>
	);
};

const comments = [
	{
		user: { name: 'User 1' },
		created_at: '10/03/2024 | 11:19',
		body: 'GOOD POST! THANKS AUTHOR FOR INFO)',
		comments: [
			{
				user: { name: 'User 2' },
				created_at: '10/03/2024 | 11:53',
				body: 'COMPLETELY AGREE WITH U!',
			},
			{
				user: { name: 'User 3' },
				created_at: '10/03/2024 | 11:53',
				body: 'COMPLETELY AGREE WITH U!',
			},
		],
	},
	{
		user: { name: 'User 2' },
		created_at: '10/03/2024 | 11:19',
		body: 'GOOD POST! THANKS AUTHOR FOR INFO)',
		comments: [
			{
				user: { name: 'User 1' },
				created_at: '10/03/2024 | 11:53',
				body: 'COMPLETELY AGREE WITH U!',
			},
		],
	},
];

export default FullPost;

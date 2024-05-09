import { Link } from 'react-router-dom';

import PicSection1 from '../assets/home_section1_mush.jpg';
import PicSection2AiSearch from '../assets/icon_home_aisearch.svg';
import PicSection2Community from '../assets/icon_home_community.svg';
import PicSection2Blog from '../assets/icon_home_blog.svg';

const Home = () => {
	return (
		<>
			<section className="bg-msh-dark text-msh-light">
				<div className="container p-6 py-2 mx-auto">
					<div className="flex gap-10 max-md:flex-wrap">
						<div className="relative w-full">
							<div className="rounded-xl w-full h-full absolute shadow-[inset_0_0_30px_rgba(28,25,23,0.7)] top-0 bottom-0"></div>
							<img src={PicSection1} alt="" className="w-full rounded-xl" />
						</div>
						<div className="flex flex-col gap-4 xl:gap-8">
							<div className="flex gap-6 max-sm:flex-wrap text-msh-dark">
								<div className="flex flex-col justify-center w-full h-40 gap-4 p-2 md:w-48 xl:gap-8 xl:h-72 xl:w-[23rem] bg-msh-light rounded-xl">
									<p className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-2xl font-medium xl:text-4xl">
										&quot;Mushrooms in medicine&quot;
									</p>
									<button className="hover:bg-opacity-80 shadow-[0_4px_4px_rgba(0,0,0,0.5)] self-end p-1 lg:p-2 text-2xl rounded-lg bg-msh-dark text-stone-200">
										Read
									</button>
								</div>
								<div className="flex flex-col justify-center w-full h-40 gap-4 p-2 md:w-48 xl:gap-8 xl:h-72 xl:w-[23rem] bg-msh-light rounded-xl">
									<p className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-2xl font-medium xl:text-4xl">
										&quot;How to pick mushrooms&quot;
									</p>
									<button className="hover:bg-opacity-80 shadow-[0_4px_4px_rgba(0,0,0,0.5)] self-end p-1 lg:p-2 text-2xl rounded-lg bg-msh-dark text-stone-200">
										Read
									</button>
								</div>
							</div>
							<div className="max-lg:self-center">
								<p className="text-3xl xl:text-4xl">
									Follow the blog and <br />{' '}
									<Link
										to={'/sign-up'}
										className="font-medium underline transition-opacity underline-offset-8 hover:opacity-60">
										join our community
									</Link>
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4 my-10 max-sm:flex-wrap-reverse max-sm:justify-center max-sm:text-center">
						<button className="px-8 py-2 text-5xl font-medium leading-none text-black transition-colors lg:text-6xl rounded-2xl bg-msh-light hover:bg-stone-300/80">
							Start
						</button>
						<p className="text-2xl">
							Learn about the types of mushrooms <br /> using AI functions
						</p>
					</div>
				</div>
			</section>
			<section className="bg-msh-light">
				<div className="container px-6 mx-auto py-14">
					<h2 className="text-6xl font-medium text-center text-black lg:text-8xl">
						What is Mush
						<span className="px-2 mx-2 font-semibold leading-none bg-msh-dark text-msh-light rounded-xl">
							AI
						</span>
						?
					</h2>
					<div className="mt-2 text-3xl text-center lg:text-4xl">
						<p className="font-light">Start your journey here and</p>
						<Link
							to={'/sign-up'}
							className="font-normal underline transition-opacity underline-offset-8 hover:opacity-60">
							Join us
						</Link>
					</div>
					<div className="flex flex-wrap justify-center gap-6 mt-12 text-msh-light">
						<div className="p-6 pb-12 space-y-4 shadow-[0_0_30px_rgba(28,25,23,0.8)] rounded-2xl bg-msh-dark lg:max-w-96">
							<h4 className="flex items-center gap-4 text-4xl font-medium">
								<img src={PicSection2AiSearch} alt="" />
								AI Search
							</h4>
							<p className="text-3xl">
								AI mushroom recognition feature! Simply upload an image, and let our advanced
								algorithms work their magic.
							</p>
						</div>
						<div className="p-6 pb-12 space-y-4 shadow-[0_0_30px_rgba(28,25,23,0.8)] rounded-2xl bg-msh-dark lg:max-w-96">
							<h4 className="flex items-center gap-4 text-4xl font-medium">
								<img src={PicSection2Community} alt="" />
								Community
							</h4>
							<p className="text-3xl">
								Discover our Mushroom Community – your hub for all things fungi!
							</p>
						</div>
						<div className="p-6 pb-12 space-y-4 shadow-[0_0_30px_rgba(28,25,23,0.8)] rounded-2xl bg-msh-dark lg:max-w-96">
							<h4 className="flex items-center gap-4 text-4xl font-medium">
								<img src={PicSection2Blog} alt="" />
								Blog
							</h4>
							<p className="text-3xl">
								Search or post texts about mushrooms in a vibrant space dedicated to enthusiasts.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-msh-dark text-msh-dark">
				<div className="container px-6 py-16 mx-auto lg:p-32 xl:px-44">
					<div className="px-8 sm:px-12 py-14 lg:py-20 space-y-6 font-semibold shadow-[0_0_30px_rgba(206,182,147,0.5)] text-center bg-msh-light rounded-3xl">
						<h2 className="text-6xl">Hi, we are the MushAI team </h2>
						<p className="text-4xl">
							We have developed this website based on artificial intelligence to search for
							information about different types of mushrooms. This feature can be useful not only
							for experienced mushroom pickers but also for beginners or just forest tourists. We
							wish you a good mushroom season, your MushAI.
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;

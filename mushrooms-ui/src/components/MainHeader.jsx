import { Link } from 'react-router-dom';
import UserIcon from '../assets/icon_user.svg';
import SearchIcon from '../assets/icon_search.svg';

const MainHeader = () => {
	return (
		<header className=" bg-stone-900">
			<div className="container flex items-center justify-between gap-4 px-6 py-4 mx-auto select-none lg:gap-12">
				<Link to={'/'} className="space-x-1 text-3xl lg:text-5xl">
					<span className="inline-block leading-none text-stone-100">Mush</span>
					<span className="inline-block font-semibold px-1 py-0.5 leading-none text-stone-900 bg-stone-100 rounded-md">
						AI
					</span>
				</Link>
				<div className="flex flex-grow gap-4 text-lg max-sm:hidden lg:text-2xl lg:gap-12 text-stone-300">
					<Link to={'/search'} className="p-1 transition-colors rounded-md hover:bg-stone-400/50">
						Search AI
					</Link>
					<Link
						to={'/community'}
						className="p-1 transition-colors rounded-md hover:bg-stone-400/50">
						Community
					</Link>
					<Link to={'/'} className="p-1 transition-colors rounded-md hover:bg-stone-400/50">
						About us
					</Link>
				</div>
				<div className="flex gap-4">
					<Link
						to={'/search'}
						className="w-8 h-8 p-1 transition-colors rounded-md lg:h-10 lg:w-10 hover:bg-stone-400/50">
						<img src={SearchIcon} alt="Search" />
					</Link>
					<Link
						to={'/sign-in'}
						className="w-8 h-8 p-1 transition-colors rounded-md lg:h-10 lg:w-10 hover:bg-stone-400/50">
						<img src={UserIcon} alt="Account" />
					</Link>
				</div>
			</div>
		</header>
	);
};

export default MainHeader;

import { Link } from 'react-router-dom';
import UserIcon from '../assets/icon_user.svg';
import SearchIcon from '../assets/icon_search.svg';

const MainHeader = () => {
	return (
		<header className="sticky top-0 z-40 bg-msh-dark">
			<div className="container px-6 mx-auto select-none ">
				<div className="flex items-center justify-between gap-4 py-4 border-b-2 lg:gap-12 border-msh-light">
					<Link to={'/'} className="space-x-1 text-3xl lg:text-5xl">
						<span className="inline-block leading-none text-msh-light">Mush</span>
						<span className="inline-block font-semibold px-1 py-0.5 leading-none text-msh-dark bg-msh-light rounded-md">
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
							to={'/profile'}
							className="w-8 h-8 p-1 transition-colors rounded-md lg:h-10 lg:w-10 hover:bg-stone-400/50">
							<img src={UserIcon} alt="Account" />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default MainHeader;

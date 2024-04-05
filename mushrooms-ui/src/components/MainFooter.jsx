import { Link } from 'react-router-dom';
import join from '../utils/join';

const HoverLink = (props) => {
	return <Link {...props} className="transition-opacity hover:opacity-60" />;
};

const MainFooter = ({ dark }) => {
	return (
		<footer
			className={join(
				'p-4 pt-10 sm:pt-20 text-3xl sm:text-4xl font-semibold',
				dark ? 'bg-msh-dark text-msh-light' : 'bg-msh-light text-msh-dark',
			)}>
			<div className="flex flex-wrap gap-6 mx-auto justify-evenly max-sm:text-center max-w-screen-2xl">
				<div>
					<HoverLink to={'/search'}>Search AI</HoverLink>
				</div>
				<div className="flex flex-col">
					<HoverLink to={'/community'}>Community</HoverLink>
					<HoverLink to={'/blog/?tab=all'}>Blog</HoverLink>
				</div>
				<div className="flex flex-col gap-2">
					<HoverLink to={'/'}>About us</HoverLink>
					<div className="flex flex-col text-2xl">
						<HoverLink to={'/'}>Contact info</HoverLink>
						<HoverLink to={'/'}>Help</HoverLink>
						<HoverLink to={'/'}>Work</HoverLink>
					</div>
				</div>
			</div>
			<div className="mt-8 text-sm font-semibold text-right text-stone-400">©2024 MushAI</div>
		</footer>
	);
};

export default MainFooter;

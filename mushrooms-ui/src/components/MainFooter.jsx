import { Link } from 'react-router-dom';
import join from '../utils/join';

const HoverLink = (props) => {
	return <Link {...props} className="transition-opacity hover:opacity-60" />;
};

const MainFooter = ({ dark }) => {
	return (
		<div
			className={join(
				'p-4 pt-20 text-4xl font-semibold',
				dark ? 'bg-stone-900 text-stone-100' : 'bg-stone-100 text-stone-900',
			)}>
			<div className="flex flex-wrap gap-6 mx-auto justify-evenly max-w-screen-2xl">
				<div>
					<HoverLink to={'/'}>Search AI</HoverLink>
				</div>
				<div className="flex flex-col">
					<HoverLink to={'/'}>Community</HoverLink>
					<HoverLink to={'/'}>Blog</HoverLink>
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
		</div>
	);
};

export default MainFooter;

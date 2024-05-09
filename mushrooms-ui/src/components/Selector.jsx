import { Link } from 'react-router-dom';

export const Selector = ({ onClick, linkTo, children, isActive }) => {
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

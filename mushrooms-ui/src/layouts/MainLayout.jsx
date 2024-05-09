import { Outlet } from 'react-router-dom';

import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import RequestSubscription from '../components/RequestSubscription';

const MainLayout = ({ withSubscription }) => {
	return (
		<div className="flex flex-col min-h-screen bg-msh-dark">
			<MainHeader />
			<div className="flex-1">
				<Outlet />
			</div>
			{withSubscription ? <RequestSubscription /> : null}
			<MainFooter dark={withSubscription ? true : false} />
		</div>
	);
};

export default MainLayout;

import { Outlet } from 'react-router-dom';

import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import RequestSubscription from '../components/RequestSubscription';
import ConfirmEmailNotification from '../components/ConfirmEmailNotification';

const MainLayout = ({ withSubscription }) => {
	return (
		<div className="relative flex flex-col min-h-screen bg-msh-dark">
			<div className="sticky top-0 z-40">
				<ConfirmEmailNotification />
				<MainHeader />
			</div>
			<div className="flex-1">
				<Outlet />
			</div>
			{withSubscription ? <RequestSubscription /> : null}
			<MainFooter dark={withSubscription ? true : false} />
		</div>
	);
};

export default MainLayout;

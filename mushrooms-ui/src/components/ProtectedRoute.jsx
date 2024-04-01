import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../state/client/authStore';
import { logOut } from '../state/server/auth/useLogOut';
import { useGetMe } from '../state/server/auth/useGetMe';

const ProtectedRoute = () => {
	const userToken = useAuthStore((state) => state.token);
	const { mutate, data: userInfo, error, isSuccess } = useGetMe();

	useEffect(() => {
		console.log('logoff', { error });
		if (error) logOut();
	}, [error]);

	useEffect(() => {
		if (userToken) mutate();
	}, [mutate, userToken]);

	if (!userInfo && userToken) {
		return <div>Loading...</div>;
	}

	if (isSuccess && userInfo) {
		return <Outlet />;
	}
	return <Navigate to={'/sign-in'} replace />;
};
export default ProtectedRoute;

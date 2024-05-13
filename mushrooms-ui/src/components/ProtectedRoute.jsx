import { Navigate, Outlet } from 'react-router-dom';
import { setAuthUser, useAuthStore } from '../state/client/authStore';
import { useGetMe } from '../state/server/auth/useGetMe';
import { useLogOut } from '../state/server/auth/useLogOut';
import { useEffect } from 'react';

const ProtectedRoute = () => {
	const userToken = useAuthStore((state) => state.token);
	const getMe = useGetMe({ enabled: !!userToken });
	const logOut = useLogOut(false);
	const userData = useAuthStore((state) => state.userData);

	useEffect(() => {
		const checkAuth = async () => {
			if (getMe.isSuccess) {
				setAuthUser(getMe.data);
			}
			if (getMe.isError) {
				logOut();
			}
		};

		if (userToken) checkAuth();
	}, [getMe.data, getMe.isError, getMe.isSuccess, logOut, userToken]);

	if (getMe.isLoading) {
		return <div className="container p-6 mx-auto text-msh-light animate-pulse">Loading...</div>;
	}

	return userData ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;

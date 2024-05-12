import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyEmail } from '../../state/server/auth/useVerifyEmail';
import { useEffect } from 'react';
import { useAuthStore } from '../../state/client/authStore';

const EmailConfirmation = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const userData = useAuthStore((state) => state.userData);

	const { mutate: verifyEmailMutate } = useVerifyEmail();

	useEffect(() => {
		if (!userData.is_verified && token) {
			verifyEmailMutate(
				{ token },
				{
					onSettled: () => {
						navigate('/profile', { replace: true });
					},
				},
			);
		}
	}, [navigate, token, userData.is_verified, verifyEmailMutate]);

	if (userData.is_verified || !token) {
		return <Navigate to="/profile" replace />;
	}

	return (
		<div className="container flex flex-col items-center justify-center py-10 mx-auto">
			<p className="text-3xl font-extrabold text-center sm:text-5xl text-msh-light animate-pulse">
				We are verifying your <br /> email address...
			</p>
		</div>
	);
};

export default EmailConfirmation;

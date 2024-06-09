import { useAuthStore } from '../state/client/authStore';
import { useRequestVerifyEmail } from '../state/server/auth/useRequestVerifyEmail';

const ConfirmEmailNotification = () => {
	const userData = useAuthStore((state) => state.userData);
	const requestVerificationEmailMutation = useRequestVerifyEmail();

	if (!userData || userData.is_verified) {
		return <></>;
	}

	const onResendEmail = async () => {
		if (userData.email && window.confirm('Are you sure you want to resend email?')) {
			await requestVerificationEmailMutation.mutateAsync({ email: userData.email });
		}
	};

	return (
		<div className="bg-msh-light">
			<div className="container flex gap-2 px-6 py-1 mx-auto">
				<p className="font-semibold uppercase text-msh-dark ">
					Please confirm registration on your email.
				</p>
				<button
					type="button"
					onClick={onResendEmail}
					className="font-extrabold underline underline-offset-2">
					RESEND EMAIL
				</button>
			</div>
		</div>
	);
};

export default ConfirmEmailNotification;

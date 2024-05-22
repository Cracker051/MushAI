import { useAuthStore } from '../state/client/authStore';

const ConfirmEmailNotification = () => {
	const userData = useAuthStore((state) => state.userData);

	if (userData && !userData?.is_verified) {
		const str = userData?.email.split('@');
		const email =
			(str[0].length > 3 ? str[0].substring(0, 3) + '****' : str[0] + '****') + '@' + str[1];

		return (
			<div className="bg-msh-light">
				<div className="container px-6 py-1 mx-auto ">
					<p className="font-semibold uppercase text-msh-dark ">
						Please confirm registration on your email{' '}
						<span className="font-extrabold underline underline-offset-2">{email}</span>
					</p>
				</div>
			</div>
		);
	}
	return <></>;
};

export default ConfirmEmailNotification;

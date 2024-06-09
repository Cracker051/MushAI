import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuthStore } from '../state/client/authStore';
import { useUpdateUser } from '../state/server/users/useUpdateUser';
import { useGetMe } from '../state/server/auth/useGetMe';

const RequestSubscription = () => {
	const navigate = useNavigate();
	const userData = useAuthStore((state) => state.userData);
	const loggedIn = !!userData?.id;
	const userQuery = useGetMe({ enabled: loggedIn });
	const useUpdateUserMutation = useUpdateUser();

	const handleSubscribe = async () => {
		if (!loggedIn) {
			navigate('/sign-in');
			return toast.error('You need to be logged in to subscribe');
		}
		const toggleSubscribedPromise = useUpdateUserMutation.mutateAsync({
			values: { is_subscriber: true },
		});
		toast.promise(toggleSubscribedPromise, {
			loading: 'Subscribing...',
			success: 'Subscribed!',
			error: 'Failed to subscribe',
		});
	};

	return (
		<div className="flex flex-col items-center gap-5 py-12 bg-msh-light">
			<div className="px-2 text-center text-msh-dark">
				<p className="text-3xl font-extrabold">REQUEST TO UPDATE</p>
				<p className="text-2xl font-bold">SUBSCRIBE FOR UPDATES</p>
			</div>
			<div className="flex items-stretch justify-center text-2xl font-bold rounded-sm select-none m ax-sm:gap-4 max-sm:flex-wrap">
				{userQuery.data?.is_subscriber ? (
					<>
						<p className="underline underline-offset-4">SUBSCRIBED</p>
						<span>✔️</span>
					</>
				) : (
					<button
						type="button"
						onClick={handleSubscribe}
						className="px-8 py-4 transition-colors border-2 rounded max-sm:py-2 border-msh-dark hover:text-stone-200/60 bg-msh-dark text-msh-light">
						SUBSCRIBE
					</button>
				)}
			</div>
		</div>
	);
};

export default RequestSubscription;

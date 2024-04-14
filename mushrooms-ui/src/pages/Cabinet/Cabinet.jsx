import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '../../utils/useQuery';
import { useAuthStore } from '../../state/client/authStore';
import { useGetUser } from '../../state/server/users/useGetUser';

import UserIcon from '../../assets/icon_user_2.svg';
import { Selector } from '../../components/Selector';
import UserPosts from '../../components/UserPosts';
import UserDrafts from '../../components/UserDrafts';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

const options = ['posts', 'drafts'];
const pageSize = 8;

const Cabinet = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const query = useQuery();

	const userData = useAuthStore((state) => state.userData);

	const own = userData.id == id || !id;
	const userId = own ? userData.id : id;

	const userQuery = useGetUser({ id: userId });

	const tabOptions = useMemo(
		() => (own ? options : options.filter((option) => option !== 'drafts')),
		[own],
	);
	const currentTab = query.get('tab') ?? 'posts';

	useEffect(() => {
		if (userQuery.isError) {
			navigate('/', { replace: true });
		}
	}, [userQuery.isError, navigate]);

	return (
		<>
			<section className="bg-msh-dark text-msh-light">
				<div className="container px-6 py-6 mx-auto">
					{userQuery.isSuccess && (
						<div className="flex">
							<div>
								<img
									src={userQuery.data.avatar ? BACKEND_URL + `/${userQuery.data.avatar}` : UserIcon}
									onError={(e) => {
										if (e.target.src !== UserIcon) {
											e.target.src = UserIcon;
										}
									}}
									alt=""
									className="object-cover w-full h-72"
								/>
							</div>
							<div className="flex flex-col justify-center gap-4 uppercase">
								<div className="flex gap-4">
									<p className="font-extrabold sm:text-5xl">
										{userQuery.data.name} {userQuery.data.surname}
									</p>
									{own && (
										<button
											onClick={() => navigate('/settings')}
											className="p-1 text-2xl font-semibold transition-colors border rounded-md border-msh-light hover:bg-stone-500">
											SETTINGS
										</button>
									)}
								</div>
								{/* <div className="flex">
									<span>4 posts</span>
								</div> */}
								<div className="space-y-3 max-w-[420px]">
									<h3 className="text-xl font-extrabold">About me</h3>
									<p className="font-semibold">
										HEY ALL! I`M WILLIAM TAYLOR, A FUNGI FANATIC READY TO DIVE INTO THE MUSHROOM
										WORLD WITH YOU. LET`S SHARE TIPS AND STORIES!
									</p>
								</div>
							</div>
						</div>
					)}
					<div className="space-y-1">
						<div className="flex flex-wrap gap-4 text-lg font-semibold uppercase select-none">
							{tabOptions.map((tab, index) => (
								<Selector
									key={index}
									linkTo={`/profile/${own ? '' : userId}?tab=${tab}`}
									isActive={currentTab === tab}>
									<span className="text-3xl font-extrabold">{tab}</span>
								</Selector>
							))}
						</div>
					</div>
					{userQuery.data ? (
						currentTab == 'drafts' && own ? (
							<UserDrafts user={userQuery.data} pageSize={pageSize} />
						) : (
							<UserPosts user={userQuery.data} pageSize={pageSize} />
						)
					) : null}
				</div>
			</section>
		</>
	);
};

export default Cabinet;

import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../state/client/authStore';
import { useGetUser } from '../../state/server/users/useGetUser';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from '../../state/server/users/useUpdateUser';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;
const fallBackAvatarUrl = '/default_avatar.webp';

const Preferences = () => {
	const navigate = useNavigate();
	const userData = useAuthStore((state) => state.userData);
	const userQuery = useGetUser({ id: userData.id });

	const updateUserMutation = useUpdateUser();

	const changePhotoFileInputRef = useRef(null);

	const handleChangePhoto = () => {
		changePhotoFileInputRef.current.click();
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm({});

	useEffect(() => {
		if (userQuery.isSuccess) {
			reset({
				name: userQuery.data?.name ?? '',
				surname: userQuery.data?.surname ?? '',
				gender: 'female',
				country: 'USA',
				region: 'LOS ANGELES',
				about: `HEY ALL!\nI'M WILLIAM TAYLOR, A FUNGI FANATIC READY TO DIVE INTO THE MUSHROOM WORLD WITH YOU. LET'S SHARE TIPS AND STORIES!`,
			});
		}
	}, [userQuery.isSuccess, userQuery.data, reset]);

	const onSubmit = (data) => {
		console.log(data);
		updateUserMutation.mutate({
			id: userQuery.data?.id,
			values: { name: data.name, surname: data.surname },
		});
	};

	const handleChangePassword = () => {
		alert('Change password');
	};

	const handleDeleteAcount = () => {
		navigate('/profile/delete-account');
	};
	return (
		<>
			<section className="py-6 bg-msh-dark text-msh-light">
				<div className="container px-6 mx-auto">
					{userQuery.isSuccess && (
						<div className="flex flex-col gap-10 mb-8 sm:flex-row">
							<div className="flex flex-col items-center gap-5">
								<img
									src={
										userQuery.data.avatar
											? BACKEND_URL + `/${userQuery.data.avatar}`
											: fallBackAvatarUrl
									}
									onError={(e) => {
										if (e.target.src !== fallBackAvatarUrl) {
											e.target.src = fallBackAvatarUrl;
										}
									}}
									alt=""
									className="object-cover w-full rounded-full sm:h-72 sm:w-72"
								/>
								<button
									onClick={handleChangePhoto}
									className="text-xl font-bold underline transition-opacity underline-offset-4 hover:opacity-60">
									CHANGE PHOTO
								</button>
								<input type="file" className="hidden" ref={changePhotoFileInputRef} />
							</div>
							<form onSubmit={handleSubmit(onSubmit)} className="flex-1 py-10 space-y-5">
								<div className="flex flex-col justify-start gap-4 uppercase">
									<div className="flex justify-between gap-3">
										<label className="w-1/3 text-xl font-bold">FIRST NAME:</label>
										<input
											{...register('name')}
											aria-invalid={errors.name ? 'true' : 'false'}
											name="name"
											className="px-1 w-2/3 bg-transparent border text-lg font-semibold rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
										/>
									</div>
									<div className="flex justify-between gap-3">
										<label className="w-1/3 text-xl font-bold">SECOND NAME:</label>
										<input
											{...register('surname')}
											aria-invalid={errors.surname ? 'true' : 'false'}
											name="surname"
											className="px-1 w-2/3 bg-transparent border text-lg font-semibold rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
										/>
									</div>
									<div className="flex justify-between gap-3">
										<label className="w-1/3 text-xl font-bold">EMAIL:</label>
										<div className="flex w-2/3 gap-2 text-lg font-semibold">
											<span className="overflow-x-auto">{userQuery.data.email}</span>
											<button
												type="button"
												onClick={() => alert('Change email')}
												className="font-bold underline transition-opacity underline-offset-4 hover:opacity-60">
												CHANGE
											</button>
										</div>
									</div>
									<div className="flex justify-between gap-3">
										<label className="w-1/3 text-xl font-bold">GENDER:</label>
										<div className="flex w-2/3 gap-4 text-lg font-semibold">
											<div>
												<input
													{...register('gender')}
													type="radio"
													value="male"
													id="male"
													className="mr-2 accent-msh-dark"
												/>
												<label htmlFor="male">Male</label>
											</div>
											<div>
												<input
													{...register('gender')}
													type="radio"
													value="female"
													id="female"
													className="mr-2 accent-msh-dark"
												/>
												<label htmlFor="female">Female</label>
											</div>
										</div>
									</div>
									<div className="flex justify-between gap-3">
										<label className="w-1/3 text-xl font-bold">COUNTRY:</label>
										<input
											{...register('country')}
											aria-invalid={errors.country ? 'true' : 'false'}
											name="country"
											className="px-1 w-2/3 bg-transparent border text-lg font-semibold rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
										/>
									</div>
									<div className="flex justify-between gap-3">
										<label className="w-1/3 text-xl font-bold">REGION:</label>
										<input
											{...register('region')}
											aria-invalid={errors.region ? 'true' : 'false'}
											name="region"
											className="px-1 w-2/3 bg-transparent border text-lg font-semibold rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
										/>
									</div>
									<div className="flex justify-between gap-3">
										<label className="w-1/3 text-xl font-bold">ABOUT ME:</label>
										<div className="w-2/3">
											<textarea
												{...register('about')}
												rows={4}
												maxLength={250}
												aria-invalid={errors.about ? 'true' : 'false'}
												name="about"
												className="px-1 w-full peer bg-transparent border text-lg font-semibold rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
											/>
											<div className="text-sm font-semibold text-right peer-invalid:text-red-500">
												<span>{watch('about', '').length}</span>
												<span>/250</span>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-start gap-4">
									<button
										type="button"
										disabled
										onClick={handleChangePassword}
										className="text-xl font-bold underline transition-opacity underline-offset-4 hover:opacity-60 disabled:opacity-60">
										CHANGE PASSWORD
									</button>
									<button
										type="button"
										onClick={handleDeleteAcount}
										className="text-xl font-bold underline transition-opacity underline-offset-4 hover:opacity-60">
										DELETE ACCOUNT
									</button>
								</div>
								<div className="text-center">
									<button
										type="submit"
										className="p-2 text-xl font-bold transition-colors border rounded-xl sm:text-2xl border-msh-light hover:bg-stone-500">
										SAVE CHANGES
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Preferences;

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useAuthStore } from '../../state/client/authStore';
import { useGetUser } from '../../state/server/users/useGetUser';
import { useUpdateUser } from '../../state/server/users/useUpdateUser';
import { useUpdateUserAvatar } from '../../state/server/users/useUpdateUserAvatar';
import { file2Base64 } from '../../utils/fileUtils';
import { useLogOut } from '../../state/server/auth/useLogOut';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;
const fallBackAvatarUrl = '/default_avatar.webp';

const Preferences = () => {
	const navigate = useNavigate();
	const userData = useAuthStore((state) => state.userData);
	const userQuery = useGetUser({ id: userData.id });

	const updateUserMutation = useUpdateUser();
	const updateUserAvatarMutation = useUpdateUserAvatar();
	const logOutMutate = useLogOut();

	const changePhotoFileInputRef = useRef(null);
	const [uploaded, setUploaded] = useState(null);
	const [updating, setUpdating] = useState(false);

	const handleChangePhoto = () => {
		changePhotoFileInputRef.current.click();
	};

	const onFileInputChange = (e) => {
		const file = e.target?.files?.[0];
		if (file) {
			file2Base64(file).then((base64) => {
				setUploaded(base64);
			});
		}
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ disabled: updating });

	useEffect(() => {
		if (userQuery.isSuccess) {
			reset({
				name: userQuery.data?.name ?? '',
				surname: userQuery.data?.surname ?? '',
			});
		}
	}, [userQuery.isSuccess, userQuery.data, reset]);

	const onSubmit = async (data) => {
		setUpdating(true);
		uploaded &&
			(await updateUserAvatarMutation.mutateAsync({
				id: userQuery.data?.id,
				newImageBase64: uploaded,
			}));
		await updateUserMutation.mutateAsync(
			{
				id: userQuery.data?.id,
				values: { name: data.name, surname: data.surname },
			},
			{
				onSuccess: async () => {
					await userQuery.refetch();
				},
			},
		);
		setUpdating(false);
	};

	const onSubmitToasted = async (data) => {
		toast.promise(onSubmit(data), {
			error: 'Oops.. Error on applying changes. Try again!',
			success: 'Success!',
			loading: 'Saving changes...',
		});
	};

	const handleDeleteAcount = () => {
		navigate('/profile/delete-account');
	};
	const handleLeaveAcount = async () => {
		if (window.confirm('Exit from account?')) {
			logOutMutate();
			navigate('/');
		}
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
										uploaded
											? uploaded
											: userQuery.data.avatar
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
								<input
									type="file"
									className="hidden"
									accept="image/png,image/jpeg,image/gif"
									ref={changePhotoFileInputRef}
									onChange={onFileInputChange}
								/>
							</div>
							<form onSubmit={handleSubmit(onSubmitToasted)} className="flex-1 py-10 space-y-5">
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
												disabled
												onClick={() => alert('Change email')}
												className="font-bold underline transition-opacity underline-offset-4 hover:opacity-60 disabled:opacity-60">
												CHANGE
											</button>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-start gap-4">
									<button
										type="button"
										onClick={handleDeleteAcount}
										className="text-xl font-bold underline transition-opacity underline-offset-4 hover:opacity-60">
										DELETE ACCOUNT
									</button>
									<button
										type="button"
										onClick={handleLeaveAcount}
										className="text-xl font-bold underline transition-opacity underline-offset-4 hover:opacity-60">
										LOG OUT
									</button>
								</div>
								<div className="text-center">
									<button
										type="submit"
										disabled={updating}
										className="p-2 text-xl font-bold transition-colors border rounded-xl sm:text-2xl border-msh-light hover:bg-stone-500 disabled:bg-stone-500">
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

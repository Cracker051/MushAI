import { useForm } from 'react-hook-form';

import { resetState, useAuthStore } from '../../state/client/authStore';
import { useDeleteUser } from '../../state/server/users/useDeleteUser';

import PageTitle from '../../components/PageTitle';

const DeleteProfile = () => {
	const userData = useAuthStore((state) => state.userData);
	const deleteUserMutation = useDeleteUser({ id: userData.id });

	const { register, handleSubmit } = useForm({});

	const onSubmit = async (data) => {
		if (window.confirm('Are you sure you want to delete your account?')) {
			console.log(data);
			const result = await deleteUserMutation.mutateAsync();
			if (result)
				setTimeout(() => {
					resetState();
				}, 4000);
		}
	};

	const onInvalid = () => {
		alert('Please choose one of the options');
	};

	return (
		<>
			<PageTitle title="Delete Profile" />
			<section className="py-6 sm:py-12 bg-msh-dark text-msh-light">
				<div className="container px-6 mx-auto">
					{deleteUserMutation.isSuccess ? (
						<div className="py-20 space-y-1 text-center sm:py-40">
							<h2 className="text-4xl font-extrabold">
								THANKS FOR BEING WITH US
								<br />
								KEEP SAFE
							</h2>
						</div>
					) : (
						<form
							onSubmit={handleSubmit(onSubmit, onInvalid)}
							className="flex flex-col gap-10 mb-8">
							<div className="space-y-1 text-center">
								<h2 className="text-5xl font-extrabold">DELETING ACCOUNT</h2>
								<p className="text-2xl font-semibold">PLEASE CHOOSE ONE</p>
							</div>
							<div className="mx-auto space-y-8 text-2xl font-semibold select-none sm:min-w-96 ">
								<div className="flex gap-2">
									<input
										type="radio"
										{...register('deleteReason', { required: true })}
										id="deleteReason1"
										value="delete1"
										className="accent-msh-dark"
									/>
									<label htmlFor="deleteReason1">PROBLEMS WITH USAGE</label>
								</div>
								<div className="flex gap-2">
									<input
										type="radio"
										{...register('deleteReason', { required: true })}
										id="deleteReason2"
										value="delete2"
										className="accent-msh-dark"
									/>
									<label htmlFor="deleteReason2">USELESS FOR ME</label>
								</div>
								<div className="flex gap-2">
									<input
										type="radio"
										{...register('deleteReason', { required: true })}
										id="deleteReason3"
										value="delete3"
										className="accent-msh-dark"
									/>
									<label htmlFor="deleteReason3">TECHNICAL PROBLEMS</label>
								</div>
								<div className="flex gap-2">
									<input
										type="radio"
										{...register('deleteReason', { required: true })}
										id="deleteReason4"
										value="delete4"
										className="accent-msh-dark"
									/>
									<label htmlFor="deleteReason4">OTHER</label>
								</div>
							</div>
							<div className="text-center">
								<button
									type="submit"
									className="px-2.5 py-0.5 text-xl font-extrabold transition-opacity sm:text-3xl text-msh-dark bg-msh-light hover:opacity-60">
									FINISH
								</button>
							</div>
						</form>
					)}
				</div>
			</section>
		</>
	);
};

export default DeleteProfile;

import { useForm } from 'react-hook-form';
import AuthSubmitButton from '../../components/AuthSubmitButton';
import { useSendPasswordRecovery } from '../../state/server/auth/useSendPasswordRecovery';

const RecoverPassword = () => {
	const sendPasswordRecoveryMutation = useSendPasswordRecovery();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		sendPasswordRecoveryMutation.mutate(data);
	};

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex items-center justify-center flex-1 text-msh-light bg-msh-dark">
					{sendPasswordRecoveryMutation.isSuccess ? (
						<h2 className="text-4xl font-black animate-pulse">PLEASE CHECK YOUR EMAIL!</h2>
					) : (
						<form className="flex flex-col gap-5 p-4 w-[32rem]" onSubmit={handleSubmit(onSubmit)}>
							<h2 className="text-2xl font-black">FORGOT YOUR PASSWORD?</h2>
							<div className="flex flex-col gap-5 my-4">
								<input
									{...register('email', { required: 'Enter your email' })}
									aria-invalid={errors.email ? 'true' : 'false'}
									type="email"
									placeholder="EMAIL..."
									className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
								/>
							</div>
							<AuthSubmitButton type="submit">SEND RECOVERY</AuthSubmitButton>
						</form>
					)}
				</main>
			</div>
		</>
	);
};

export default RecoverPassword;

import { useForm } from 'react-hook-form';
import AuthSubmitButton from '../../components/AuthSubmitButton';
import { useResetPassword } from '../../state/server/auth/useResetPassword';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';

const ResetPassword = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const resetPasswordMutation = useResetPassword();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	if (!token) {
		return <Navigate to={'/sign-in'} replace />;
	}
	const onSubmit = (data) => {
		console.log(data);
		resetPasswordMutation.mutate(
			{ token, password: data.password },
			{
				onSuccess: () => {
					alert('Password reset successfully');
					navigate('/sign-in');
				},
			},
		);
	};

	return (
		<>
			<PageTitle title="Reset Password" />
			<div className="flex flex-col min-h-screen">
				<main className="flex items-center justify-center flex-1 text-msh-light bg-msh-dark">
					<form className="flex flex-col gap-5 p-4 w-[32rem]" onSubmit={handleSubmit(onSubmit)}>
						<h2 className="text-2xl font-black">ENTER NEW PASSWORD</h2>
						<div className="flex flex-col gap-5 my-4">
							<input
								{...register('password', { required: 'Enter your password', minLength: 6 })}
								aria-invalid={errors.password ? 'true' : 'false'}
								type="password"
								placeholder="PASSWORD..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
							/>
						</div>
						<AuthSubmitButton type="submit">RESET PASSWORD</AuthSubmitButton>
					</form>
				</main>
			</div>
		</>
	);
};

export default ResetPassword;

import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AuthSubmitButton from '../../components/AuthSubmitButton';

import { useSignIn } from '../../state/server/auth/useSignIn';
import { useAuthStore } from '../../state/client/authStore';

const Login = () => {
	const userToken = useAuthStore((state) => state.token);
	const signInMutate = useSignIn();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	if (userToken) {
		return <Navigate to={'/profile'} replace />;
	}

	const onSubmit = (data) => {
		signInMutate(data);
	};
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex items-center justify-center flex-1 text-msh-light bg-msh-dark">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-4 w-[32rem]">
						<h2 className="text-2xl font-black">AUTHORIZATION</h2>
						<h3 className="text-2xl font-bold">LOG IN TO VIEW HISTORY AND POST</h3>
						<div className="flex flex-col gap-5 my-4">
							<input
								{...register('email', { required: 'Enter your email' })}
								aria-invalid={errors.email ? 'true' : 'false'}
								type="email"
								placeholder="EMAIL..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
							/>
							<input
								{...register('password', { required: 'Enter your password', minLength: 6 })}
								aria-invalid={errors.password ? 'true' : 'false'}
								type="password"
								placeholder="PASSWORD..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
							/>
						</div>
						<AuthSubmitButton type="submit">AUTHORIZE</AuthSubmitButton>
						<div className="flex flex-col items-start gap-2 select-none ">
							<Link
								to={'/recover-password'}
								className="font-extrabold underline transition-opacity hover:opacity-60">
								FORGOT YOUR PASSWORD?
							</Link>
							<Link
								to={'/sign-up'}
								className="font-extrabold underline transition-opacity hover:opacity-60">
								CREATE ACCOUNT
							</Link>
						</div>
					</form>
				</main>
			</div>
		</>
	);
};

export default Login;

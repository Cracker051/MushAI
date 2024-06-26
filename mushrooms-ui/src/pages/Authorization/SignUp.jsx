import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import AuthSubmitButton from '../../components/AuthSubmitButton';

import { useAuthStore } from '../../state/client/authStore';
import { useSignUp } from '../../state/server/auth/useSignUp';
import PageTitle from '../../components/PageTitle';

const SignUp = () => {
	const userToken = useAuthStore((state) => state.token);

	const signUpMutate = useSignUp();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	if (userToken) {
		return <Navigate to={'/profile'} replace />;
	}

	const onSubmit = (data) => {
		signUpMutate(data);
	};

	return (
		<>
			<PageTitle title="Sign Up" />
			<div className="flex flex-col min-h-screen">
				<main className="flex items-center justify-center flex-1 text-msh-light bg-msh-dark">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-4 w-[32rem]">
						<h2 className="text-2xl font-black">CREATE ACCOUNT</h2>
						<h3 className="text-2xl font-bold">JOIN OUR COMMUNITY</h3>
						<div className="flex flex-col gap-5 my-4">
							<input
								{...register('name', { required: 'Enter your name' })}
								aria-invalid={errors.name ? 'true' : 'false'}
								name="name"
								type="text"
								placeholder="FIRST NAME..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
							/>
							<input
								{...register('surname', { required: 'Enter your surname' })}
								aria-invalid={errors.surname ? 'true' : 'false'}
								name="surname"
								type="text"
								placeholder="SECOND NAME..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
							/>
							<input
								{...register('email', { required: 'Enter your email' })}
								aria-invalid={errors.email ? 'true' : 'false'}
								name="email"
								type="email"
								placeholder="EMAIL..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
							/>
							<input
								{...register('password', { required: 'Enter your password', minLength: 6 })}
								aria-invalid={errors.password ? 'true' : 'false'}
								name="password"
								type="password"
								placeholder="PASSWORD..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-msh-light aria-[invalid=true]:border-red-500"
							/>
						</div>
						<AuthSubmitButton type="submit">JOIN</AuthSubmitButton>
					</form>
				</main>
			</div>
		</>
	);
};

export default SignUp;

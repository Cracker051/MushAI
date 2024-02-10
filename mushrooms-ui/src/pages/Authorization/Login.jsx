import { Link } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';
import RequestSubscription from '../../components/RequestSubscription';
import MainFooter from '../../components/MainFooter';
import AuthSubmitButton from '../../components/AuthSubmitButton';

const Login = () => {
	return (
		<>
			<MainHeader />
			<main className="flex items-center justify-center min-h-screen text-stone-100 bg-stone-900">
				<form className="flex flex-col gap-5 p-4 w-[32rem]">
					<h2 className="text-2xl font-black">AUTHORIZATION</h2>
					<h3 className="text-2xl font-bold">LOG IN TO VIEW HISTORY AND POST</h3>
					<div className="flex flex-col gap-5 my-4">
						<input
							type="email"
							placeholder="EMAIL..."
							className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-stone-100"
						/>
						<input
							type="password"
							placeholder="PASSWORD..."
							className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-stone-100"
						/>
					</div>
					<AuthSubmitButton type="submit">AUTHORIZE</AuthSubmitButton>
					<div className="flex flex-col items-start gap-2 select-none ">
						<Link to={'/'} className="font-extrabold underline transition-opacity hover:opacity-60">
							FORGOT YOUR PASSWORD?
						</Link>
						<Link to={'/'} className="font-extrabold underline transition-opacity hover:opacity-60">
							CREATE ACCOUNT
						</Link>
					</div>
				</form>
			</main>
			<RequestSubscription />
			<MainFooter dark />
		</>
	);
};

export default Login;

import MainHeader from '../../components/MainHeader';
import AuthSubmitButton from '../../components/AuthSubmitButton';

const SignUp = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<MainHeader />
				<main className="flex items-center justify-center flex-1 text-stone-100 bg-stone-900">
					<form className="flex flex-col gap-5 p-4 w-[32rem]">
						<h2 className="text-2xl font-black">CREATE ACOOUNT</h2>
						<h3 className="text-2xl font-bold">JOIN OUR COMMUNITY</h3>
						<div className="flex flex-col gap-5 my-4">
							<input
								type="text"
								placeholder="FIRST NAME..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-stone-100"
							/>
							<input
								type="text"
								placeholder="SECOND NAME..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-stone-100"
							/>
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
						<AuthSubmitButton type="submit">JOIN</AuthSubmitButton>
					</form>
				</main>
			</div>
		</>
	);
};

export default SignUp;

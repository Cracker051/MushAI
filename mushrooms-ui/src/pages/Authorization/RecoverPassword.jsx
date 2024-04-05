import AuthSubmitButton from '../../components/AuthSubmitButton';

const RecoverPassword = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex items-center justify-center flex-1 text-stone-100 bg-stone-900">
					<form className="flex flex-col gap-5 p-4 w-[32rem]">
						<h2 className="text-2xl font-black">FORGOT YOUR PASSWORD?</h2>
						<div className="flex flex-col gap-5 my-4">
							<input
								type="email"
								placeholder="EMAIL..."
								className="px-10 py-5 bg-transparent border-2 rounded-sm focus:outline-none border-stone-100"
							/>
						</div>
						<AuthSubmitButton type="submit">SEND A CODE</AuthSubmitButton>
					</form>
				</main>
			</div>
		</>
	);
};

export default RecoverPassword;

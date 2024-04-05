const AuthSubmitButton = (props) => {
	return (
		<button
			{...props}
			className="py-4 text-3xl font-extrabold transition-colors rounded-sm select-none text-msh-dark hover:bg-stone-200/60 bg-stone-300"></button>
	);
};

export default AuthSubmitButton;

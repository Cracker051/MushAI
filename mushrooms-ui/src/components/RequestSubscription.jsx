const RequestSubscription = () => {
	return (
		<div className="flex flex-col items-center gap-5 py-12 bg-stone-100">
			<div className="text-center text-stone-900">
				<p className="text-3xl font-extrabold">REQUEST TO UPDATE</p>
				<p className="text-2xl font-bold">SUBSCRIBE FOR UPDATES</p>
			</div>
			<div className="flex items-stretch border-2 rounded-sm select-none border-stone-900">
				<div>
					<input
						type="email"
						placeholder="EMAIL..."
						className="p-5 bg-transparent focus:outline-none"
					/>
				</div>
				<button
					type="button"
					className="px-6 font-bold transition-colors hover:text-stone-200/60 bg-stone-900 text-stone-100">
					SUBSCRIBE
				</button>
			</div>
		</div>
	);
};

export default RequestSubscription;

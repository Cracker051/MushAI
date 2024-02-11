const RequestSubscription = () => {
	return (
		<div className="flex flex-col items-center gap-5 py-12 bg-stone-100">
			<div className="px-2 text-center text-stone-900">
				<p className="text-3xl font-extrabold">REQUEST TO UPDATE</p>
				<p className="text-2xl font-bold">SUBSCRIBE FOR UPDATES</p>
			</div>
			<div className="flex items-stretch justify-center rounded-sm select-none m ax-sm:gap-4 max-sm:flex-wrap">
				<div className="border-2 border-stone-900">
					<input
						type="email"
						placeholder="EMAIL..."
						className="p-2 bg-transparent sm:p-5 focus:outline-none"
					/>
				</div>
				<button
					type="button"
					className="px-6 font-bold transition-colors border-2 max-sm:py-2 border-stone-900 hover:text-stone-200/60 bg-stone-900 text-stone-100">
					SUBSCRIBE
				</button>
			</div>
		</div>
	);
};

export default RequestSubscription;

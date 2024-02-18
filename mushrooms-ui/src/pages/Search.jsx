import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import RequestSubscription from '../components/RequestSubscription';

const tryMushs = [
	{ imageUrl: '74076da45f27e58aaf3d05f88ffb0290.png' },
	{ imageUrl: '056a404cf0abf67300a08898883f8931.png' },
	{ imageUrl: 'feb05488f7c30c188ac1c2f6fe6d74e3.png' },
];

const Search = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<MainHeader />
				<section className="relative flex-1 text-center bg-stone-900 text-stone-100">
					<div className="bg-cover bg-center top-0 left-0 h-full w-full opacity-40 absolute bg-[url('/search_bg.png')]"></div>
					<div className="container relative flex justify-between gap-2 px-6 py-16 mx-auto max-md:justify-center max-md:flex-col ">
						<h1 className="text-4xl font-extrabold text-left">
							RECOGNIZE
							<br />
							MUSHROOM WITH AI
						</h1>
						<div className="space-y-5">
							<div className="px-12 py-24 space-y-5 border-2 rounded-lg sm:px-24 border-stone-100 sm:py-36">
								<button className="px-4 py-4 text-2xl font-extrabold text-black transition-colors rounded-lg sm:px-8 sm:text-4xl bg-stone-100 hover:bg-stone-400">
									UPLOAD IMAGE
								</button>
								<p className="text-lg font-extrabold">OR DROP THE FILE HERE</p>
								<input type="file" className="hidden" />
							</div>
							<div className="grid grid-flow-row gap-4 sm:grid-flow-col">
								<div className="text-2xl font-extrabold text-left sm:text-4xl">
									<p>NO IMAGE?</p>
									<p>TRY ON THIS</p>
								</div>
								<div className="grid flex-1 grid-cols-3 gap-5 justify-items-center">
									{tryMushs?.map((tryMush, index) => (
										<button key={index} className="">
											<div>
												<img
													src={tryMush.imageUrl}
													alt=""
													className="object-cover rounded-lg w-[80px] h-[70px] shadow-[0_0_4px_rgba(0,0,0,0.5)] hover:opacity-80 transition-opacity object-center"
												/>
											</div>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<RequestSubscription />
			<MainFooter dark />
		</>
	);
};

export default Search;

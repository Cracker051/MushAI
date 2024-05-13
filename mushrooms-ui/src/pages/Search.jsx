import { useUploadFile } from 'dex-react-file-upload';
import { useRef } from 'react';

import { useRecognizeMushroomMutation } from '../state/server/prediction/useRecognizeMushroom';

import { fetchFile, file2Base64 } from '../utils/fileUtils';
import PageTitle from '../components/PageTitle';

const tryMushs = [
	{ imageUrl: '74076da45f27e58aaf3d05f88ffb0290.png' },
	{ imageUrl: '056a404cf0abf67300a08898883f8931.png' },
	{ imageUrl: 'feb05488f7c30c188ac1c2f6fe6d74e3.png' },
];

const Search = () => {
	const fileRef = useRef();
	const recognizeMushroomMutation = useRecognizeMushroomMutation();

	const { handleChange, fileData, handleOnDrop, setFiles } = useUploadFile({
		handleChange(props) {
			console.log(props.item(0));
			if (props.length > 0 && props.item(0)) {
				recognizeMushroomMutation.mutate({ imageFile: props.item(0) });
			}
		},
		handleError(props) {
			console.error(props);
		},
		fileType: ['image/png', 'image/jpg', 'image/jpeg'],
		multiple: false,
		maxfileSize: 1500, //in kb,
	});

	const handleSelectExampleMushroom = async (exampleMushUrl) => {
		const exampleMushFile = await fetchFile(exampleMushUrl);
		const base64 = await file2Base64(exampleMushFile);

		setFiles({
			file: [
				{
					blob: base64,
					name: exampleMushFile.name,
					fileSize: exampleMushFile.size / 1024,
				},
			],
		});
		recognizeMushroomMutation.mutate({ imageFile: exampleMushFile });
	};

	const resetRecognition = () => {
		recognizeMushroomMutation.reset();
		setFiles({});
	};

	return (
		<>
			<PageTitle title="AI Search" />
			<div className="flex flex-col min-h-screen">
				<section className="relative flex items-center flex-1 text-center bg-msh-dark text-msh-light">
					<div className="bg-cover bg-center top-0 left-0 h-full w-full opacity-40 absolute bg-[url('/search_bg.png')]"></div>
					<div className="container relative flex justify-between flex-1 gap-2 px-6 py-6 mx-auto sm:py-16 max-md:justify-center max-md:flex-col ">
						<div>
							<h1 className="text-4xl font-extrabold text-left">
								RECOGNIZE
								<br />
								MUSHROOM WITH AI
							</h1>
						</div>
						<div className="space-y-5">
							<div className="">
								{!fileData.file ? (
									<div
										data-type="file"
										onDrop={handleOnDrop}
										onDragOver={(event) => event.preventDefault()}
										className="px-12 py-24 space-y-5 border-2 rounded-lg sm:px-24 sm:py-36 border-msh-light">
										<input
											type="file"
											name="file"
											ref={fileRef}
											onChange={handleChange}
											className="hidden"
										/>
										<button
											onClick={() => fileRef.current?.click()}
											className="px-4 py-4 text-2xl font-extrabold text-black transition-colors rounded-lg sm:px-8 sm:text-4xl bg-msh-light hover:bg-stone-400">
											UPLOAD IMAGE
										</button>
										<p className="text-lg font-extrabold">OR DROP THE FILE HERE</p>
									</div>
								) : (
									<img
										src={fileData.file[0].blob}
										className="select-none max-h-[500px] mx-auto border-2 rounded-lg border-msh-light"
									/>
								)}
							</div>
							{recognizeMushroomMutation.isPending && (
								<div className="space-y-3 text-2xl font-semibold">
									<p>Processing...</p>
								</div>
							)}
							{recognizeMushroomMutation.isSuccess && (
								<div className="space-y-3 text-2xl font-semibold">
									<p>
										RESULT:{' '}
										<span className="p-1 font-black border-2 rounded-lg border-msh-light">
											{recognizeMushroomMutation.data.result}
										</span>
									</p>
									<button
										onClick={() => resetRecognition()}
										className="px-2 py-2 text-2xl font-extrabold text-black transition-colors rounded-lg sm:text-2xl bg-msh-light hover:bg-stone-400">
										TRY AGAIN?
									</button>
								</div>
							)}
							{!fileData.file && (
								<div className="grid grid-flow-row gap-4 sm:grid-flow-col">
									<div className="text-2xl font-extrabold text-left sm:text-4xl">
										<p>NO IMAGE?</p>
										<p>TRY ON THIS</p>
									</div>
									<div className="grid flex-1 grid-cols-3 gap-5 justify-items-center">
										{tryMushs?.map((tryMush, index) => (
											<button
												key={index}
												onClick={() => handleSelectExampleMushroom(tryMush.imageUrl)}
												className="">
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
							)}
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Search;

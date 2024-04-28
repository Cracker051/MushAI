import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SimpleMdeReact } from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import './BlogEditor.css';

import { setBlogPost, useBlogPostStore } from '../../state/client/draftStore';
import { file2Base64 } from '../../utils/fileUtils';
import join from '../../utils/join';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

const BlogEditor = () => {
	const { id } = useParams();
	const draft_id = parseInt(id) ? parseInt(id) : null;

	const navigate = useNavigate();
	const draftData = useBlogPostStore((state) => state);

	const { register, handleSubmit, reset } = useForm({ defaultValues: { title: draftData.title } });

	const [postContent, setPostContent] = useState(draftData.content || '');
	const onChange = useCallback((value) => {
		setPostContent(value);
	}, []);

	const changeThumbnailFileInputRef = useRef(null);
	const [uploaded, setUploaded] = useState(draftData.img || null);

	useEffect(() => {
		if (id === 'new' || (draft_id && draft_id !== draftData.id)) {
			setBlogPost({ id: null, title: null, content: null, img: null, icon: null });
			reset({ title: null });
			setPostContent('');
			setUploaded(null);
			navigate('/edit-post', { replace: true });
		}
	}, [draftData.id, draft_id, id, navigate, reset]);

	const handleChangeThumbnail = () => {
		changeThumbnailFileInputRef.current.click();
	};

	const onFileInputChange = (e) => {
		const file = e.target?.files?.[0];
		if (file) {
			file2Base64(file).then((base64) => {
				setUploaded(base64);
			});
		}
	};

	const onSubmit = async (data) => {
		console.log('submit', {
			id: draftData.id,
			...data,
			content: postContent,
			img: uploaded,
			icon: draftData.icon,
		});
		setBlogPost({
			id: draftData.id,
			...data,
			content: postContent,
			img: uploaded,
			icon: draftData.icon,
		});
		draft_id ? navigate(`/draft/${draftData.id}`) : navigate('/draft');
	};

	console.log(draftData);
	return (
		<>
			<section className="py-6 bg-msh-dark text-msh-light">
				<div className="container px-6 mx-auto">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-8">
						<input
							type="text"
							{...register('title', { required: true, maxLength: 50 })}
							placeholder="TYPE A NAME OF YOUR TOPIC..."
							className="px-4 py-1 font-extrabold bg-transparent sm:text-5xl text-msh-light"
						/>
						<div>
							<SimpleMdeReact
								value={postContent}
								onChange={onChange}
								placeholder="TYPE YOUR TEXT HERE.."
							/>
						</div>
						<div>
							<input
								type="file"
								className="hidden"
								accept="image/png,image/jpeg,image/gif"
								ref={changeThumbnailFileInputRef}
								onChange={onFileInputChange}
							/>
							<div className="relative w-full mx-auto sm:w-2/3 2xl:w-1/2">
								<img
									src={
										uploaded
											? uploaded
											: draftData.icon
											? BACKEND_URL + `/${draftData.icon}`
											: '/blogpost_bg_3x.jpg'
									}
									alt=""
									className="object-cover w-full rounded-md"
								/>
								<button
									type="button"
									onClick={handleChangeThumbnail}
									className={join(
										'absolute inset-0 px-4 py-4 text-2xl font-extrabold transition-opacity arounded-lg text-msh-light sm:px-8 sm:text-4xl bg-msh-dark/10 hover:bg-msh-dark/30',
										uploaded && 'opacity-0 hover:opacity-100',
									)}>
									{uploaded ? 'CHANGE' : 'ADD'} THUMBNAIL
								</button>
							</div>
						</div>
						<div className="text-center">
							<button
								type="submit"
								className="p-2 text-xl font-extrabold transition-opacity rounded-md min-w-44 sm:text-5xl text-msh-dark bg-msh-light hover:opacity-60">
								GO
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default BlogEditor;

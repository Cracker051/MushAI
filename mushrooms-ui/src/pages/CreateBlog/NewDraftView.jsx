import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import PostContentView from '../../components/PostContentView';

import { useAuthStore } from '../../state/client/authStore';
import { setBlogPost, useBlogPostStore } from '../../state/client/draftStore';
import { useCreateBlogPost } from '../../state/server/blog/useCreateBlog';
import { useGetBlog } from '../../state/server/blog/useGetBlog';
import { useUpdateBlogPost } from '../../state/server/blog/useUpdateBlog';
import { useUpdateBlogPostIcon } from '../../state/server/blog/useUpdateBlogIcon';
import toast from 'react-hot-toast';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

const NewDraftView = () => {
	const { id } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const userData = useAuthStore((state) => state.userData);
	const draftData = useBlogPostStore((state) => state);

	const draft_id = parseInt(id) ? parseInt(id) : null;

	const draftQuery = useGetBlog({ id: draft_id, enabled: draft_id !== null });

	const [updating, setUpdating] = useState(false);
	const resetDraft = () => {
		setBlogPost({ id: null, title: null, content: null, img: null, icon: null });
	};

	useEffect(() => {
		if (searchParams.get('view')) {
			resetDraft();
			setSearchParams({}, { replace: true });
		}
	}, [searchParams, setSearchParams]);

	useEffect(() => {
		if (
			(draft_id && draftQuery.isError) ||
			(draftQuery.data && !draftQuery.data.is_draft) ||
			(!draft_id && draftData.title === null)
		) {
			navigate('/edit-post', { replace: true });
		}
	}, [draftData.title, draftQuery.data, draftQuery.isError, draft_id, id, navigate]);

	const draft = draft_id && draftData.id === null ? draftQuery.data : draftData;

	const createBlogPostMutation = useCreateBlogPost({ user_id: userData.id });
	const updateBlogPostMutation = useUpdateBlogPost({ id: draft_id });
	const updateBlogPostIconMutation = useUpdateBlogPostIcon({ id: draft_id });

	const handleEditDraft = () => {
		setBlogPost(draftQuery.data);
		navigate(`/edit-post/${draft_id}`);
	};

	const handleSaveDraft = async () => {
		setUpdating(true);
		draftData.img &&
			(await updateBlogPostIconMutation.mutateAsync({
				id: draft_id,
				newImageBase64: draftData.img,
			}));
		await updateBlogPostMutation.mutateAsync(
			{
				values: {
					title: draftData.title,
					content: draftData.content,
					is_draft: true,
				},
			},
			{
				onSuccess: () => {
					resetDraft();
					navigate(`/draft/${draft_id}`);
				},
			},
		);
		setUpdating(false);
	};

	const handleSaveDraftToasted = async (data) => {
		toast.promise(handleSaveDraft(data), {
			error: 'Oops.. Error on applying changes. Try again!',
			success: 'Success!',
			loading: 'Saving changes...',
		});
	};

	const handleAddDraft = async () => {
		setUpdating(true);
		await createBlogPostMutation.mutateAsync(
			{
				title: draftData.title,
				content: draftData.content,
				is_draft: true,
				imgBase64: draftData.img,
			},
			{
				onSuccess: (data) => {
					navigate(`/draft/${data.id}`);
				},
			},
		);
		setUpdating(false);
	};

	const handleAddDraftToasted = async (data) => {
		toast.promise(handleAddDraft(data), {
			error: 'Oops.. Error on applying changes. Try again!',
			success: 'Success!',
			loading: 'Saving changes...',
		});
	};

	const handleCreatePost = async () => {
		setUpdating(true);
		if (draft_id !== null) {
			await updateBlogPostMutation.mutateAsync(
				{
					values: {
						title: draft.title,
						content: draft.content,
						is_draft: false,
					},
				},
				{
					onSuccess: (data) => {
						navigate(`/blog/${data.id}`);
					},
				},
			);
		} else {
			await createBlogPostMutation.mutateAsync(
				{
					title: draftData.title,
					content: draftData.content,
					is_draft: false,
					imgBase64: draftData.img,
				},
				{
					onSuccess: (data) => {
						navigate(`/blog/${data.id}`);
					},
				},
			);
		}
		setUpdating(false);
	};
	const handleCreatePostToasted = async (data) => {
		toast.promise(handleCreatePost(data), {
			error: 'Oops.. Error on applying changes. Try again!',
			success: 'Success!',
			loading: 'Saving changes...',
		});
	};

	return (
		<>
			<PostContentView
				post={{
					created_at: Date.now(),
					...draft,
					icon: draft?.img ? draft.img : draft?.icon ? BACKEND_URL + `/${draft.icon}` : null,
				}}
				userData={userData}>
				<div className="flex justify-center gap-4 sm:justify-end">
					{draft_id ? (
						draftData.id === null ? (
							<button
								disabled={updating}
								onClick={handleEditDraft}
								className="p-1 text-lg font-semibold transition-colors border rounded-md sm:text-2xl border-msh-light hover:bg-stone-500">
								EDIT
							</button>
						) : (
							<button
								disabled={updating}
								onClick={handleSaveDraftToasted}
								className="p-1 text-lg font-semibold transition-colors border rounded-md sm:text-2xl border-msh-light hover:bg-stone-500">
								SAVE
							</button>
						)
					) : (
						<button
							disabled={updating}
							onClick={handleAddDraftToasted}
							className="p-1 text-lg font-semibold transition-colors border rounded-md sm:text-2xl border-msh-light hover:bg-stone-500">
							ADD TO DRAFTS
						</button>
					)}
					<button
						disabled={updating}
						onClick={handleCreatePostToasted}
						className="p-1 text-lg font-semibold transition-colors border rounded-md sm:text-2xl border-msh-light hover:bg-stone-500">
						POST
					</button>
				</div>
			</PostContentView>
		</>
	);
};

export default NewDraftView;

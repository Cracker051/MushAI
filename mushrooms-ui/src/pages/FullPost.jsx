import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import UserIcon from '../assets/icon_user_2.svg';
import CommentBlog from '../components/CommentBlog';

import { useAuthStore } from '../state/client/authStore';
import { useGetBlog } from '../state/server/blog/useGetBlog';
import { useGetBlogComments } from '../state/server/blog/useGetBlogComments';
import { usePostBlogComment } from '../state/server/blog/usePostBlogComment';
import PostContentView from '../components/PostContentView';
import PageTitle from '../components/PageTitle';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

function transformComments(comments) {
	const commentMap = {};
	const result = [];

	comments.forEach((comment) => {
		commentMap[comment.id] = {
			id: comment.id,
			user: comment.user,
			created_at: comment.created_at,
			body: comment.body,
			comments: [],
		};
	});

	comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

	comments.forEach((comment) => {
		if (comment.parent_id !== null) {
			commentMap[comment.parent_id].comments.push(commentMap[comment.id]);
		} else {
			result.push(commentMap[comment.id]);
		}
	});

	return result;
}

const FullPost = () => {
	const { blogId } = useParams();
	const navigate = useNavigate();
	const userData = useAuthStore((state) => state.userData);
	const blogQuery = useGetBlog({ id: blogId });
	const blogCommentsQuery = useGetBlogComments({ id: blogId, page: 1 }); // TODO: make an infinite load

	useEffect(() => {
		if (blogQuery.isError) {
			navigate('/', { replace: true });
		}
	}, [blogQuery.isError, navigate]);

	const postBlogCommentMutate = usePostBlogComment({ blog_id: parseInt(blogId) });
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			userComment: '',
		},
		reValidateMode: 'onChange',
	});

	const [comments, setComments] = useState(null);
	const [replyCommentId, setReplyCommentId] = useState(null);
	const replyCommentUser = useMemo(
		() =>
			replyCommentId
				? blogCommentsQuery.data?.items?.find((comment) => comment.id == replyCommentId).user
				: null,
		[blogCommentsQuery.data, replyCommentId],
	);
	const commentSectionHeadingRef = useRef();

	useEffect(() => {
		if (blogCommentsQuery.data?.items) {
			setComments(transformComments(blogCommentsQuery.data.items));
		}
	}, [blogCommentsQuery.data]);

	const handlePostBlogComment = async (data) => {
		postBlogCommentMutate.mutate(
			{ user_id: userData.id, parent_id: replyCommentId, body: data.userComment },
			{
				onSuccess: () => {
					reset();
					replyCommentId !== null && setReplyCommentId(null);
				},
			},
		);
	};

	return (
		<>
			{blogQuery.data && (
				<>
					<PageTitle title={blogQuery.data?.title} />
					<PostContentView
						post={{ ...blogQuery.data, icon: BACKEND_URL + `/${blogQuery.data.icon}` }}
						userData={blogQuery.data.user}>
						<div className="flex flex-col self-stretch gap-3">
							<div className="border-b-2 border-msh-light">
								<h3 ref={commentSectionHeadingRef} className="text-lg font-semibold uppercase">
									{comments && <span>({comments?.length})</span>} COMMENTS
								</h3>
							</div>
							{userData && (
								<div className="space-y-1">
									{replyCommentUser !== null && (
										<div className="flex items-center gap-2 font-medium">
											<span>Replying to:</span>
											<span className="font-semibold uppercase">
												{replyCommentUser.name} {replyCommentUser.surname}
											</span>
											<button
												onClick={() => setReplyCommentId(null)}
												className="p-0.5 text-sm font-extrabold border border-white rounded-md hover:bg-stone-500 transition-colors">
												CANCEL
											</button>
										</div>
									)}
									<form
										onSubmit={handleSubmit(handlePostBlogComment)}
										className="flex items-center gap-2">
										<img
											src={userData.avatar ? BACKEND_URL + `/${userData.avatar}` : UserIcon}
											onError={(e) => {
												if (e.target.src !== UserIcon) {
													e.target.src = UserIcon;
												}
											}}
											alt=""
											className="w-10 h-10 rounded-full"
										/>
										<input
											{...register('userComment', { maxLength: 200, required: true })}
											aria-invalid={errors.userComment ? 'true' : 'false'}
											type="textarea"
											autoComplete="off"
											placeholder="LEAVE A COMMENT..."
											className="flex-1 px-2 text-base bg-transparent aria-[invalid=true]:border-red-500 border-2 focus:outline-none placeholder:text-msh-light placeholder:font-semibold border-msh-light"
										/>
										<button className="p-1 text-base font-semibold transition-colors rounded-sm shadow text-msh-light bg-stone-300/20 hover:bg-stone-300/50">
											SEND
										</button>
									</form>
								</div>
							)}
							{comments && (
								<div className="flex flex-col gap-4">
									{comments.map((comm) => (
										<CommentBlog
											canReply={userData}
											key={comm.id}
											data={comm}
											setReplyCommentId={(id) => {
												setReplyCommentId(id);
												commentSectionHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
											}}
										/>
									))}
								</div>
							)}
						</div>
					</PostContentView>
				</>
			)}
		</>
	);
};

export default FullPost;

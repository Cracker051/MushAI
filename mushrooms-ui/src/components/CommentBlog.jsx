import { Link } from 'react-router-dom';

import UserIcon from '../assets/icon_user_2.svg';
import CommentLikeIcon from '../assets/icon_comment_like.svg';

const CommentBlog = ({ data }) => {
	return (
		<div className="space-y-2">
			<div className="flex items-start gap-2">
				<img src={UserIcon} alt="" className="w-10 h-10" />
				<div className="flex-1 space-y-0.5">
					<div className="flex justify-between text-sm font-semibold">
						<Link className="underline uppercase underline-offset-2 ">{data.user.name}</Link>
						<span className="opacity-90">{data.created_at}</span>
					</div>
					<p>{data.body}</p>
					<div className="flex items-center gap-2 text-xs">
						<button className="underline uppercase underline-offset-2 opacity-90">REPLY</button>
						<div className="flex items-center gap-1">
							<span>1</span>
							<button>
								<img src={CommentLikeIcon} alt="" className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
			{data?.comments?.length > 0 && (
				<div className="ml-12 space-y-2">
					{data.comments.map((comm, i) => (
						<CommentBlog key={i} data={comm} />
					))}
				</div>
			)}
		</div>
	);
};

export default CommentBlog;

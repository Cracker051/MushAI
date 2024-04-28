import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';

const scrollToHeading = (id) => {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
};
//TODO: make ids from headlines hash
const PostContentView = ({ post, userData, children }) => {
	const articleRef = useRef(null);
	const [headlines, setHeadlines] = useState([]);

	const [isMounted, setIsMounted] = useState(false);
	const hCount = useRef(0);
	useEffect(() => {
		if (isMounted) {
			const headings = Array.from(articleRef.current?.querySelectorAll('h1, h2, h3'));
			const headlineTexts = headings?.map((heading) => ({
				text: heading.textContent,
				id: `headline-${parseInt(heading.id?.split('-')[1]) + headings.length}`,
			}));
			setHeadlines(headlineTexts);
		}
		setIsMounted(true);
	}, [isMounted]);

	const date = new Date(post.created_at);

	const obj = useMemo(() => {
		return {
			// eslint-disable-next-line no-unused-vars
			h1: ({ node, ...props }) => <h1 {...props} id={`headline-${hCount.current++}`}></h1>,
			// eslint-disable-next-line no-unused-vars
			h2: ({ node, ...props }) => <h2 {...props} id={`headline-${hCount.current++}`}></h2>,
			// eslint-disable-next-line no-unused-vars
			h3: ({ node, ...props }) => <h3 {...props} id={`headline-${hCount.current++}`}></h3>,
		};
	}, []);
	return (
		<>
			<div className="relative w-full h-[400px] sm:h-[600px] bg-msh-dark">
				<div className="w-full h-full absolute shadow-[inset_0_0_40px_40px_rgba(28,25,23,0.5)] top-0 bottom-0"></div>
				<img
					src={post.icon}
					onError={(e) => {
						if (e.target.src !== '/blogpost_bg_3x.jpg') {
							e.target.src = '/blogpost_bg_3x.jpg';
						}
					}}
					alt=""
					className="object-cover object-center w-full h-full opacity-60"
				/>
			</div>
			<div className="bg-msh-dark text-msh-light">
				<section className="container relative flex flex-col items-center gap-12 px-6 pt-32 pb-6 mx-auto">
					<div className="relative self-stretch xl:mx-64">
						<div className="z-30 flex flex-col gap-3 sm:gap-6 absolute -top-16 -translate-y-full items-center w-full px-6 py-6 uppercase bg-msh-dark shadow-[0_0_20px_30px_rgba(0,0,0,0.4)] text-center">
							<h1 className="text-3xl font-extrabold sm:text-6xl">{post.title}</h1>
							<h3 className="text-xl font-bold sm:text-3xl">
								<Link to={`/profile/${userData.id}`}>
									WRITTEN BY: {userData.name} {userData.surname}
								</Link>
							</h3>
							<div className="w-2/6 border-t-4 border-msh-light"></div>
							<h4 className="text-2xl font-medium">{date.toDateString()}</h4>
						</div>
						{headlines?.length > 0 && (
							<aside className="xl:w-[200px] xl:absolute xl:-translate-x-full xl:h-full">
								<div className="sticky py-5 -mt-5 space-y-5 top-24">
									<span className="text-xl font-medium">IN THIS ARTICLE</span>
									<ul className="flex flex-col gap-5 px-5 text-sm font-semibold uppercase border-l-2 border-msh-light">
										{headlines?.map((headline, index) => (
											<li
												key={index}
												onClick={() => scrollToHeading(headline.id)}
												className="cursor-pointer select-none">
												{headline.text}
											</li>
										))}
									</ul>
								</div>
							</aside>
						)}
						<article ref={articleRef} className="article-content">
							<Markdown
								components={{
									...obj,
								}}>
								{post.content}
							</Markdown>
						</article>
						{children}
					</div>
				</section>
			</div>
		</>
	);
};

export default PostContentView;

import { create } from 'zustand';

const initialState = {
	id: null,
	title: null,
	content: null,
	img: null,
	icon: null,
};

export const useBlogPostStore = create(() => ({
	...initialState,
}));

export const setBlogPost = ({ id, title, content, img, icon }) =>
	useBlogPostStore.setState({ id, title, content, img, icon });
export const resetState = () => useBlogPostStore.setState(initialState, true);

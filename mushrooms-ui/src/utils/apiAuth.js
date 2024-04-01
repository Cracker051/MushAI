import { useAuthStore } from '../state/client/authStore';

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

const originalFetch = window.fetch;

export const fetch = async (url, config) => {
	const token = useAuthStore.getState().token;

	config['headers'] = {
		Authorization: token ? `Bearer ${token}` : undefined,
		...config['headers'],
	};

	const response = await originalFetch(BACKEND_URL + url, config);

	return response;
};

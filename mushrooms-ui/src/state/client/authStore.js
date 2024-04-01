import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState = {
	token: null,
	userData: null,
};

export const useAuthStore = create(
	persist(
		() => ({
			...initialState,
		}),
		{
			name: 'auth-store',
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: (state) => {
				console.log('hydration starts', state);

				// optional
				return (state, error) => {
					if (error) {
						console.log('an error happened during hydration', error);
					} else {
						console.log('hydration finished', state);
					}
				};
			},
		},
	),
);
export const setAuthAccessToken = (accessToken) => useAuthStore.setState({ token: accessToken });

export const setAuthUser = (userData) => useAuthStore.setState({ userData });

export const resetState = () => useAuthStore.setState(initialState, true);

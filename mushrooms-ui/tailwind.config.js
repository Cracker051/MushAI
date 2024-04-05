/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				msh: {
					light: colors.stone[100],
					dark: colors.stone[950],
				},
			},
		},
	},
	plugins: [],
};

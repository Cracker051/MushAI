import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	envDir: '../',
	server: {
		host: "127.0.0.1",
		port: 8000
	}
});

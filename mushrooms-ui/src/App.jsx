import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Authorization/Login';
import SignUp from './pages/Authorization/SignUp';
import RecoverPassword from './pages/Authorization/RecoverPassword';
import Home from './pages/Home';
import Community from './pages/Community';
import Search from './pages/Search';
import Blog from './pages/Blog';
import FullPost from './pages/FullPost';
import Cabinet from './pages/Cabinet/Cabinet';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

function App() {
	return (
		<>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/profile" element={<Cabinet />} />
					</Route>
					<Route path="/profile/:id" element={<Cabinet />} />
				</Route>
				<Route element={<MainLayout withSubscription />}>
					<Route path="/sign-in" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/recover-password" element={<RecoverPassword />} />
					<Route path="/community" element={<Community />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:blogId" element={<FullPost />} />
					<Route path="/search" element={<Search />} />
				</Route>
				<Route path="*" element={<Navigate to={'/'} replace />} />
			</Routes>
		</>
	);
}

export default App;

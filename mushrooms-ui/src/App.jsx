import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Authorization/Login';
import SignUp from './pages/Authorization/SignUp';
import RecoverPassword from './pages/Authorization/RecoverPassword';
import Home from './pages/Home';
import Community from './pages/Community';
import Search from './pages/Search';
import Blog from './pages/Blog';
import FullPost from './pages/FullPost';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<Login />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/recover-password" element={<RecoverPassword />} />
				<Route path="/community" element={<Community />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/blog/:blogId" element={<FullPost />} />
				<Route path="/search" element={<Search />} />
				<Route path="*" element={<></>} />
			</Routes>
		</>
	);
}

export default App;

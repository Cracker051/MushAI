import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Authorization/Login';
import SignUp from './pages/Authorization/SignUp';
import RecoverPassword from './pages/Authorization/RecoverPassword';

function App() {
	return (
		<>
			<Routes>
				<Route path="/sign-in" element={<Login />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/recover-password" element={<RecoverPassword />} />
				<Route path="*" element={<></>} />
			</Routes>
		</>
	);
}

export default App;

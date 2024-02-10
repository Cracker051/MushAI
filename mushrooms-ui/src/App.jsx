import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Authorization/Login';

function App() {
	return (
		<>
			<Routes>
				<Route path="/sign-in" element={<Login />} />
				<Route path="*" element={<></>} />
			</Routes>
		</>
	);
}

export default App;

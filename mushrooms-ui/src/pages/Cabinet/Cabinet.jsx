import { useNavigate } from 'react-router-dom';
import MainFooter from '../../components/MainFooter';
import MainHeader from '../../components/MainHeader';
import { useAuthStore } from '../../state/client/authStore';
import { useLogOut } from '../../state/server/auth/useLogOut';

const Cabinet = () => {
	const navigate = useNavigate();

	const userData = useAuthStore((state) => state.userData);
	const logOutMutate = useLogOut();

	const onClickLogOut = async () => {
		if (window.confirm('Exit from account?')) {
			logOutMutate();
			navigate('/');
		}
	};

	return (
		<>
			<MainHeader />
			<div className="flex flex-col gap-4 p-8">
				<h1>Cabinet</h1>
				<span>{userData.id}</span>
				<span>{`${userData.name} ${userData.surname}`}</span>
				<span>{userData.email}</span>
				<button onClick={() => onClickLogOut()}>LOGOUT</button>
			</div>
			<MainFooter />
		</>
	);
};

export default Cabinet;

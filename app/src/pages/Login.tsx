import { FormEvent, useState } from 'react';
import Logo from '../components/Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import axios, { AxiosError } from 'axios';
import useUser from '../hooks/useUser';
import { User } from '../context/userContext';

interface LoginResponse {
	message: string;
	user: User;
}

function Login() {
	const navigate = useNavigate();
	const { setUser } = useUser();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	async function handleLogin(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const res = await axios.post<LoginResponse>(
				'/api/auth/login',
				{
					email,
					password,
				},
				{ withCredentials: true }
			);
			setMessage(res.data.message);
			setUser(res.data.user);
			navigate('/');
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data.error);
				setMessage(error.response?.data.error);
			} else {
				console.log(error);
			}
		}
	}

	return (
		<div
			className={`bg-card lg:bg-background h-full w-full flex text-text-primary`}>
			<div
				className={`w-full max-w-md lg:shadow-drop bg-card m-auto rounded-md py-2 px-5`}>
				<Logo className='mx-auto my-4'></Logo>
				<div className='font-bold text-xl text-center'>Dashboard Kit</div>
				<form className='my-4 flex flex-col gap-1' onSubmit={handleLogin}>
					<FormInput
						label='Email'
						type='text'
						placeholder='Email address'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<FormInput
						label='Password'
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className={`font-bold block rounded-md shadow-drop w-full py-2 mt-4 bg-primary text-white`}
						type='submit'>
						Log In
					</button>
				</form>
				<div className='text-sm'>
					<span className='text-text-secondary '>
						Don&apos;t have an account?{' '}
					</span>
					<NavLink to={'/register'} className='text-primary font-bold'>
						Register
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Login;

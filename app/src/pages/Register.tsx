import { FormEvent, useState } from 'react';
import Logo from '../components/Logo';
import { redirect, useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa6';
import axios, { AxiosError } from 'axios';
import isEmail from 'validator/lib/isEmail';
import FormInput from '../components/FormInput';
import { isLength } from 'validator';
interface InvalidFormInput {
	displayName?: {
		message: string;
	};
	email?: {
		message: string;
	};
	password?: {
		message: string;
	};
}

function Register() {
	const navigate = useNavigate();
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [invalid, setInvalid] = useState<InvalidFormInput>({});

	async function handleRegister(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const res = await axios.post('/api/auth/register', {
				displayName,
				email,
				password,
			});

			setMessage(res.data.message);
			navigate('/login', { state: { register: res.data.message } });
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
				<button
					className='text-primary text-sm font-bold flex items-center gap-1'
					onClick={() => navigate('/login')}>
					<FaAngleLeft />
					<span>Login</span>
				</button>
				<Logo className='mx-auto my-4'></Logo>
				<div className='font-bold text-xl text-center'>Dashboard Kit</div>
				<form
					className='my-4 flex flex-col gap-1'
					onSubmit={handleRegister}>
					<FormInput
						label='Display name'
						type='text'
						placeholder='Display name'
						onChange={(e) => {
							setDisplayName(e.target.value);
						}}
						required
					/>
					<FormInput
						label='Email'
						type='text'
						placeholder='Email address'
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						validators={[isEmail]}
						onValidate={(validation) => {
							if (validation) {
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								const { email, ...rest } = invalid;
								setInvalid(rest);
							} else {
								setInvalid({
									email: { message: 'Please enter a valid email!' },
									...invalid,
								});
							}
						}}
						required
					/>
					{invalid.email && (
						<div className='text-red-600 text-sm'>
							{invalid.email.message}
						</div>
					)}
					<FormInput
						label='Password'
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						validators={() => {
							const isValidLength = (password: string) =>
								isLength(password, { min: 8, max: 20 }) ||
								password.length === 0;
							return [isValidLength];
						}}
						onValidate={(validation) => {
							if (validation) {
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								const { password, ...rest } = invalid;
								setInvalid(rest);
							} else {
								setInvalid({
									password: {
										message:
											'Password should be around 8 to 20 characters long',
									},
									...invalid,
								});
							}
						}}
					/>
					{invalid.password && (
						<div className='text-red-600 text-sm'>
							{invalid.password.message}
						</div>
					)}
					<button
						className={`font-bold block rounded-md shadow-drop w-full py-2 mt-4 bg-primary text-white disabled:bg-text-secondary`}
						disabled={!!invalid.email || !!invalid.password}
						type='submit'>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;

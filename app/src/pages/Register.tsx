import { BaseSyntheticEvent, FormEvent, SyntheticEvent, useState } from 'react';
import Input from '../components/Input';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa6';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

interface FormData {
	displayName: string;
	email: string;
	password: string;
}

function Register() {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>();
	const [message, setMessage] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	async function handleRegister(values: FormData, event?: BaseSyntheticEvent) {
		event?.preventDefault();
		const { displayName, email, password } = values;
		try {
			const req = await axios.post('/api/auth/register', {
				displayName,
				email,
				password,
			});

			setMessage(req.data.message);
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
					onClick={() => navigate(-1)}>
					<FaAngleLeft />
					<span>Go back</span>
				</button>
				<Logo className='mx-auto my-4'></Logo>
				<div className='font-bold text-xl text-center'>Dashboard Kit</div>
				<form
					className='my-4 flex flex-col gap-1'
					onSubmit={handleSubmit(handleRegister)}>
					<div>Display Name</div>
					<Input
						{...register('displayName', {
							required: true,
						})}
						type='text'
						placeholder='Display name'
						className='w-full bg-searchbar focus:outline focus:outline-primary shadow-inner-xl placeholder:text-placeholder'
						required
					/>
					<div>Email</div>
					<Input
						{...register('email', {
							required: true,
							validate: (value: string) =>
								isEmail(value) || 'Please enter valid email!',
						})}
						type='text'
						placeholder='Email address'
						className='w-full bg-searchbar focus:outline focus:outline-primary shadow-inner-xl placeholder:text-placeholder'
						required
					/>
					{errors.email && (
						<div className='text-red-600'>{errors.email.message}</div>
					)}
					<div>Password</div>
					<div className='w-full relative'>
						<Input
							{...register('password', {
								required: true,
								minLength: 8,
								maxLength: 20
							})}
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							className='w-full bg-searchbar focus:outline focus:outline-primary shadow-inner-xl placeholder:text-placeholder'
							required
						/>
						<Input
							type='checkbox'
							className='absolute right-3 top-1/4 h-1/2'
							onInput={() => {
								setShowPassword(!showPassword);
							}}
						/>
					</div>
					{errors.password && (
						<div className='text-red-600'>Password should be around 8 to 20 characters long</div>
					)}
					<button
						className={`font-bold block rounded-md w-full py-2 mt-4 bg-primary text-white`}
						type='submit'>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;

import { useState } from 'react';
import Input from '../components/Input';
import Logo from '../components/Logo';
import { NavLink } from 'react-router-dom';

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div
			className={`bg-card lg:bg-background h-full w-full flex text-text-primary`}>
			<div
				className={`w-full max-w-md lg:shadow-drop bg-card m-auto rounded-md py-2 px-5`}>
				<Logo className='mx-auto my-4'></Logo>
				<div className='font-bold text-xl text-center'>Dashboard Kit</div>
				<form className='my-4 flex flex-col gap-1'>
					<div>Email</div>
					<Input
						type='text'
						placeholder='Email address'
						className='w-full bg-searchbar focus:outline focus:outline-primary shadow-inner-xl placeholder:text-placeholder'
					/>
					<div>Password</div>
					<div className='w-full relative'>
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							className='w-full bg-searchbar focus:outline focus:outline-primary shadow-inner-xl placeholder:text-placeholder'
						/>
						<Input
							type='checkbox'
							className='absolute right-3 top-1/4 h-1/2'
							onInput={() => {
								setShowPassword(!showPassword);
							}}
						/>
					</div>
					<button
						className={`font-bold block rounded-md w-full py-2 mt-4 bg-primary text-white`}
						type='submit'>
						Log In
					</button>
				</form>
				<div className='text-sm'>
					<span className='text-text-secondary '>
						Don&apos;t have an account?{' '}
					</span>
					<NavLink to={'/register'} className='text-primary font-bold'>Register</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Login;

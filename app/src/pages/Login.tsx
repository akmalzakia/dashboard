import { useState } from 'react';
import Input from '../components/Input';
import Logo from '../components/Logo';

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className={`bg-white lg:bg-gray-200 h-full w-full flex`}>
			<div
				className={`w-full max-w-md lg:shadow-lg bg-white m-auto rounded-md py-2 px-5`}>
				<Logo className='mx-auto my-4'></Logo>
				<div className='font-bold text-center'>Log In to Dashboard Kit</div>
				<form className='my-4 flex flex-col gap-1'>
					<div>Email</div>
					<Input
						type='text'
						placeholder='Email address'
						className='w-full focus:outline-1 focus:outline-accent shadow-inner'
					/>
					<div>Password</div>
					<div className='w-full relative'>
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							className='w-full focus:outline-1 focus:outline-accent shadow-inner'
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
			</div>
		</div>
	);
}

export default Login;

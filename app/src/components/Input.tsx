import { forwardRef } from 'react';

const Input = forwardRef<
	HTMLInputElement,
	React.ComponentPropsWithoutRef<'input'>
>(function Input({ className, ...rest }, ref) {
	return (
		<input
			ref={ref}
			className={`bg-gray-100 rounded-md px-2 py-1 ${className}`}
			{...rest}></input>
	);
});

export default Input;

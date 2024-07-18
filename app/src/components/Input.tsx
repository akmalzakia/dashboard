function Input({
	className,
	...rest
}: React.ComponentPropsWithoutRef<'input'>) {
	return (
		<input
			className={`bg-gray-100 rounded-md px-2 py-1 ${className}`}
			{...rest}></input>
	);
}

export default Input;

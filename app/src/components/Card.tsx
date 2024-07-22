function Card({
	className,
	children,
	...rest
}: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={`bg-card rounded-lg shadow-drop p-3 ${className}`}
			{...rest}>
			{children}
		</div>
	);
}

export default Card;

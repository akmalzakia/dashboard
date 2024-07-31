import styles from './css/Loader.module.css';

interface LoaderProps {
	size: number;
	width?: number;
	color?: string;
	className?: string;
}

function Loader({ size, width = 5, color = '#000', className }: LoaderProps) {
	return (
		<div
			className={`${styles.loader} ${className} aspect-square rounded-[50%]`}
			style={{
				width: `${size}px`,
				borderWidth: `${size / width}px`,
				borderStyle: 'solid',
				borderColor: `${color} #0000`,
			}}></div>
	);
}

export default Loader;

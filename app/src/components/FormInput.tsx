import { debounce, isArray } from 'lodash';
import React, { ChangeEvent, useMemo, useState } from 'react';

interface FormInputProps
	extends Pick<
		React.ComponentPropsWithoutRef<'input'>,
		'className' | 'type' | 'required' | 'placeholder'
	> {
	label: string;
	validators?:
		| ((value: string) => boolean)[]
		| (() => ((value: string) => boolean)[]);
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onValidate?: (validation: boolean) => void;
}

function FormInput({
	className,
	type,
	label,
	validators,
	placeholder,
	required,
	onChange,
	onValidate,
}: FormInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [invalid, setInvalid] = useState(false);

	const debouncedValidation = debounce((ev: ChangeEvent<HTMLInputElement>) => {
		if (!validators) return;
		
		const validation = validate(ev.target.value, validators);
		setInvalid(!validation);
		onValidate?.(validation);
	}, 500);

	function validate(
		value: string,
		validators:
			| ((value: string) => boolean)[]
			| (() => ((value: string) => boolean)[])
	) {
		let vals: ((value: string) => boolean)[];
		if (isArray(validators)) {
			vals = validators;
		} else {
			vals = validators();
		}

		return vals.every((v) => v(value));
	}

	return (
		<>
			<div className=''>{label}</div>
			<div className={`relative ${className}`}>
				<input
					type={
						type === 'password'
							? showPassword
								? 'text'
								: 'password'
							: type
					}
					className={`bg-gray-100 rounded-md px-2 py-1 w-full bg-searchbar focus:outline focus:outline-primary shadow-inner-xl placeholder:text-placeholder ${
						invalid && 'outline outline-1 outline-red-600'
					}`}
					onChange={(e) => {
						onChange?.(e);
						debouncedValidation(e);
					}}
					placeholder={placeholder}
					required={required}></input>
				{type === 'password' && (
					<input
						type='checkbox'
						className={`bg-gray-100 rounded-md px-2 py-1 absolute right-3 top-1/4 h-1/2`}
						onInput={() => {
							setShowPassword(!showPassword);
						}}></input>
				)}
			</div>
		</>
	);
}

export default FormInput;

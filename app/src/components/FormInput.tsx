import { debounce, isArray } from 'lodash';
import React, { ChangeEvent, useState } from 'react';

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
	const [isValid, setIsValid] = useState(false);

	const debouncedValidation = debounce((ev: ChangeEvent<HTMLInputElement>) => {
		let isValid;
		if (!validators) isValid = true;
		else {
			isValid = validate(ev.target.value, validators);
		}
		setIsValid(isValid);
		onValidate?.(isValid);
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
		<div className={className}>
			<div className=''>{label}</div>
			<div className={`relative`}>
				<input
					type={
						type === 'password'
							? showPassword
								? 'text'
								: 'password'
							: type
					}
					className={`bg-gray-100 rounded-md px-2 py-1 w-full bg-searchbar focus:outline focus:outline-primary shadow-inner-xl placeholder:text-placeholder ${
						!isValid && 'outline outline-1 outline-red-600'
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
		</div>
	);
}

export default FormInput;

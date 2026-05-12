import type { FC, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	helperText?: string;
	error?: string;
}

export const Textarea: FC<TextareaProps> = ({
	label,
	helperText,
	error,
	className = "",
	...props
}) => (
	<div className="w-full">
		{label && (
			<label
				htmlFor={props.id || props.name}
				className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
			>
				{label}
				{props.required && <span className="ml-1 text-warn-600">*</span>}
			</label>
		)}
		<textarea
			id={props.id || props.name}
			className={`w-full rounded-lg border ${
				error
					? "border-warn-500 focus:border-warn-600 focus:ring-warn-500"
					: "border-neutral-300 focus:border-accent-500 focus:ring-accent-500 dark:border-neutral-700"
			} bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-1 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 ${className}`}
			{...props}
		/>
		{(helperText || error) && (
			<p
				className={`mt-1 text-xs ${
					error
						? "text-warn-600 dark:text-warn-400"
						: "text-neutral-500 dark:text-neutral-400"
				}`}
			>
				{error || helperText}
			</p>
		)}
	</div>
);

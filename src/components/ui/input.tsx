import classNames from "classnames";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

export type InputProps = {
	label?: ReactNode;
	helperText?: ReactNode;
	error?: ReactNode;
} & ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ label, helperText, error, className, ...props },
	ref,
) {
	return (
		<label className="block space-y-1.5">
			{label && (
				<span className="block text-sm font-medium text-neutral-800 dark:text-neutral-100">
					{label}
				</span>
			)}
			<input
				ref={ref}
				className={classNames(
					"w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm",
					"focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500",
					"dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:placeholder:text-neutral-500",
					error
						? "border-warn-500 focus:border-warn-600 focus:ring-warn-500"
						: "",
					className,
				)}
				aria-invalid={Boolean(error)}
				{...props}
			/>
			{error ? (
				<p className="text-xs text-warn-600">{error}</p>
			) : (
				helperText && (
					<p className="text-xs text-neutral-600 dark:text-neutral-300">
						{helperText}
					</p>
				)
			)}
		</label>
	);
});

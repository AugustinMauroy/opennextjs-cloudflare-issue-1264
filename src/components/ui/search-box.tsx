"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import type { FC, ComponentPropsWithoutRef, ReactNode } from "react";
import { useEffect, useState } from "react";

export type SearchBoxProps = {
	label?: ReactNode;
	helperText?: ReactNode;
	error?: ReactNode;
	theme?: "auto" | "light" | "dark";
	debounceMs?: number;
	onValueChange?: (value: string) => void;
	onDebouncedChange?: (value: string) => void;
	showClearButton?: boolean;
} & Omit<ComponentPropsWithoutRef<"input">, "type">;

export const SearchBox: FC<SearchBoxProps> = ({
	label,
	helperText,
	error,
	theme = "auto",
	debounceMs = 300,
	onValueChange,
	onDebouncedChange,
	showClearButton = true,
	className,
	value,
	defaultValue,
	onChange,
	placeholder = "Search...",
	disabled,
	...props
}) => {
	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = useState<string>(
		String(defaultValue ?? ""),
	);

	const currentValue = isControlled ? String(value ?? "") : internalValue;

	useEffect(() => {
		if (!onDebouncedChange) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			onDebouncedChange(currentValue);
		}, debounceMs);

		return () => window.clearTimeout(timeoutId);
	}, [currentValue, debounceMs, onDebouncedChange]);

	return (
		<label className="block space-y-1.5">
			{label && (
				<span
					className={classNames(
						"block text-sm font-medium",
						theme === "dark"
							? "text-neutral-100"
							: theme === "light"
								? "text-neutral-800"
								: "text-neutral-800 dark:text-neutral-100",
					)}
				>
					{label}
				</span>
			)}
			<div className="relative">
				<MagnifyingGlassIcon
					className={classNames(
						"pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2",
						theme === "dark" ? "text-neutral-300" : "text-neutral-400",
					)}
				/>
				<input
					{...props}
					type="search"
					value={currentValue}
					onChange={(event) => {
						if (!isControlled) {
							setInternalValue(event.target.value);
						}
						onValueChange?.(event.target.value);
						onChange?.(event);
					}}
					placeholder={placeholder}
					className={classNames(
						"w-full rounded-md py-2 pl-9 pr-10 text-sm shadow-sm",
						theme === "dark"
							? "border border-neutral-700 bg-neutral-900 text-neutral-50 placeholder:text-neutral-300"
							: theme === "light"
								? "border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400"
								: "border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:placeholder:text-neutral-500",
						"focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500",
						error
							? "border-warn-500 focus:border-warn-600 focus:ring-warn-500"
							: "",
						className,
					)}
					aria-invalid={Boolean(error)}
					disabled={disabled}
				/>
				{showClearButton && !disabled && currentValue && (
					<button
						type="button"
						onClick={() => {
							if (!isControlled) {
								setInternalValue("");
							}
							onValueChange?.("");
							onDebouncedChange?.("");
						}}
						className={classNames(
							"absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center rounded p-1 transition",
							theme === "dark"
								? "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
								: theme === "light"
									? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
									: "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
						)}
						aria-label="Clear search"
					>
						<XMarkIcon className="size-4" />
					</button>
				)}
			</div>
			{error ? (
				<p className="text-xs text-warn-600">{error}</p>
			) : (
				helperText && (
					<p
						className={classNames(
							"text-xs",
							theme === "dark"
								? "text-neutral-300"
								: theme === "light"
									? "text-neutral-600"
									: "text-neutral-600 dark:text-neutral-300",
						)}
					>
						{helperText}
					</p>
				)
			)}
		</label>
	);
}

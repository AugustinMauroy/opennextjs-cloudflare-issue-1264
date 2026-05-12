import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { forwardRef } from "react";

export type ButtonProps = {
	asChild?: boolean;
	size?: "sm" | "md" | "lg";
	kind?: "solid" | "outlined" | "ghost";
	variant?: "brand" | "neutral" | "success" | "info" | "warn" | "danger";
	loading?: boolean;
	icon?: ReactNode;
	iconRight?: ReactNode;
	fullWidth?: boolean;
	className?: string;
};

const baseStyles =
	"inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 dark:focus:ring-offset-neutral-900 disabled:opacity-60 disabled:cursor-not-allowed";

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
	sm: "px-3 py-1.5 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-5 py-2.5 text-lg",
};

const solidVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
	brand:
		"bg-accent-700 text-white hover:bg-accent-800 dark:bg-accent-500 dark:text-neutral-950 dark:hover:bg-accent-400",
	neutral:
		"bg-neutral-800 text-white hover:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-100",
	success:
		"bg-success-700 text-white hover:bg-success-800 dark:bg-success-500 dark:text-neutral-950 dark:hover:bg-success-400",
	info: "bg-info-700 text-white hover:bg-info-800 dark:bg-info-500 dark:text-neutral-950 dark:hover:bg-info-400",
	warn: "bg-warn-700 text-white hover:bg-warn-800 dark:bg-warn-500 dark:text-neutral-950 dark:hover:bg-warn-400",
	danger:
		"bg-warn-700 text-white hover:bg-warn-800 dark:bg-warn-500 dark:text-neutral-950 dark:hover:bg-warn-400",
};

const outlinedVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
	brand:
		"border border-accent-600 text-accent-700 bg-transparent hover:bg-accent-50 dark:border-accent-300 dark:text-accent-100 dark:hover:bg-accent-950",
	neutral:
		"border border-neutral-400 text-neutral-900 bg-transparent hover:bg-neutral-100 dark:border-neutral-500 dark:text-neutral-100 dark:hover:bg-neutral-800",
	success:
		"border border-success-600 text-success-700 bg-transparent hover:bg-success-50 dark:border-success-300 dark:text-success-100 dark:hover:bg-success-950",
	info: "border border-info-600 text-info-700 bg-transparent hover:bg-info-50 dark:border-info-300 dark:text-info-100 dark:hover:bg-info-950",
	warn: "border border-warn-700 text-warn-700 bg-transparent hover:bg-warn-50 dark:border-warn-400 dark:text-warn-100 dark:hover:bg-warn-950",
	danger:
		"border border-warn-700 text-warn-700 bg-transparent hover:bg-warn-50 dark:border-warn-400 dark:text-warn-100 dark:hover:bg-warn-950",
};

const ghostVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
	brand:
		"text-accent-700 hover:bg-accent-50 dark:text-accent-100 dark:hover:bg-accent-950",
	neutral:
		"text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800",
	success:
		"text-success-700 hover:bg-success-50 dark:text-success-100 dark:hover:bg-success-950",
	info: "text-info-700 hover:bg-info-50 dark:text-info-100 dark:hover:bg-info-950",
	warn: "text-warn-700 hover:bg-warn-50 dark:text-warn-100 dark:hover:bg-warn-950",
	danger:
		"text-warn-700 hover:bg-warn-50 dark:text-warn-100 dark:hover:bg-warn-950",
};

const kindStyles: Record<
	NonNullable<ButtonProps["kind"]>,
	typeof solidVariants
> = {
	solid: solidVariants,
	outlined: outlinedVariants,
	ghost: ghostVariants,
};

type PolymorphicProps = ButtonProps &
	ComponentPropsWithoutRef<"button"> &
	ComponentPropsWithoutRef<"a">;

const ButtonInner = (
	{
		asChild = false,
		size = "md",
		kind = "solid",
		variant = "brand",
		loading = false,
		icon,
		iconRight,
		fullWidth = false,
		className,
		children,
		...props
	}: PolymorphicProps,
	ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
	const isIconOnly = !children && (icon || iconRight);
	const classes = classNames(
		baseStyles,
		sizeStyles[size],
		kindStyles[kind][variant],
		{
			"w-full": fullWidth,
			"px-3": isIconOnly,
		},
		className,
	);

	if (asChild) {
		return (
			<Slot
				{...props}
				className={classes}
				aria-busy={loading}
				ref={ref as Ref<HTMLElement>}
			>
				{children}
			</Slot>
		);
	}

	return (
		<button
			{...props}
			ref={ref as Ref<HTMLButtonElement>}
			className={classes}
			aria-busy={loading}
		>
			{icon && <span className="inline-flex items-center">{icon}</span>}
			{children}
			{iconRight && (
				<span className="inline-flex items-center">{iconRight}</span>
			)}
		</button>
	);
};

// @todo: don't use forward ref and pass ref as props since we use react 19
export const Button = forwardRef(ButtonInner);

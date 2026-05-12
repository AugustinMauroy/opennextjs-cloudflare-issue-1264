import classNames from "classnames";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { useState } from "react";

export type AvatarProps = {
	src?: string;
	alt?: string;
	name?: string;
	size?: "sm" | "md" | "lg";
	fallback?: ReactNode;
	className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

const sizeStyles: Record<NonNullable<AvatarProps["size"]>, string> = {
	sm: "h-8 w-8 text-sm",
	md: "h-10 w-10 text-base",
	lg: "h-14 w-14 text-lg",
};

const getInitials = (name?: string) => {
	if (!name) return "?";
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (!parts.length) return "?";
	const first = parts[0]?.[0] ?? "";
	const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
	return (first + last).toUpperCase();
};

export const Avatar: FC<AvatarProps> = ({
	src,
	alt,
	name,
	size = "md",
	fallback,
	className,
	...rest
}) => {
	const [imageError, setImageError] = useState(false);
	const showImage = Boolean(src) && !imageError;
	const initials = getInitials(name);

	return (
		<div
			className={classNames(
				"relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent-700 text-white dark:bg-accent-500 dark:text-neutral-950",
				"ring-1 ring-neutral-200 dark:ring-neutral-800",
				sizeStyles[size],
				className,
			)}
			{...rest}
		>
			{showImage ? (
				// biome-ignore lint/performance/noImgElement: We need to use a standard img element here for proper fallback handling
				<img
					src={src}
					alt={alt ?? name ?? "Avatar"}
					onError={() => setImageError(true)}
					className="h-full w-full object-cover"
				/>
			) : (
				<span className="flex h-full w-full items-center justify-center font-semibold">
					{fallback ?? initials}
				</span>
			)}
		</div>
	);
};

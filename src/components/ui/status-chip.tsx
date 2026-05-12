import classNames from "classnames";
import type { FC, ReactNode } from "react";

export type Status =
	| "neutral"
	| "brand"
	| "info"
	| "success"
	| "warn"
	| "danger";

export type StatusChipProps = {
	status: Status;
	label?: string;
	icon?: ReactNode;
	className?: string;
};

const styles: Record<Status, string> = {
	neutral:
		"bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50",
	brand: "bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-50",
	info: "bg-info-100 text-info-700 dark:bg-info-900 dark:text-info-50",
	success:
		"bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-50",
	warn: "bg-warn-100 text-warn-800 dark:bg-warn-900 dark:text-warn-50",
	danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-50",
};

export const StatusChip: FC<StatusChipProps> = ({
	status,
	label,
	icon,
	className,
}) => (
	<span
		className={classNames(
			"inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
			styles[status],
			className,
		)}
	>
		{icon && <span className="inline-flex items-center">{icon}</span>}
		{label ?? status.charAt(0).toUpperCase() + status.slice(1)}
	</span>
);

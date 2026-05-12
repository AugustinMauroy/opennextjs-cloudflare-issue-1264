import classNames from "classnames";
import { Dialog } from "radix-ui";
import type { FC, ReactNode } from "react";

export type DialogContentProps = {
	children: ReactNode;
	size?: "sm" | "md" | "lg" | "xl" | "full";
	className?: string;
};

export const DialogContent: FC<DialogContentProps> = ({
	children,
	size = "md",
	className,
}) => (
	<Dialog.Portal>
		<Dialog.Overlay
			className={classNames(
				"fixed inset-0 z-50 bg-black/50 backdrop-blur-sm dark:bg-black/60",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			)}
		/>
		<Dialog.Content
			className={classNames(
				"fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
				"w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900",
				"focus:outline-none",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
				{
					"max-w-sm": size === "sm",
					"max-w-md": size === "md",
					"max-w-lg": size === "lg",
					"max-w-2xl": size === "xl",
					"max-w-[95vw] max-h-[95vh]": size === "full",
				},
				className,
			)}
		>
			{children}
		</Dialog.Content>
	</Dialog.Portal>
);

export type DialogTitleProps = { children: ReactNode; className?: string };
export const DialogTitle: FC<DialogTitleProps> = ({ children, className }) => (
	<Dialog.Title
		className={classNames(
			"text-xl font-bold text-neutral-900 mb-3 dark:text-neutral-50",
			className,
		)}
	>
		{children}
	</Dialog.Title>
);

export type DialogDescriptionProps = {
	children: ReactNode;
	className?: string;
};
export const DialogDescription: FC<DialogDescriptionProps> = ({
	children,
	className,
}) => (
	<Dialog.Description
		className={classNames(
			"text-sm text-neutral-700 mb-4 dark:text-neutral-200",
			className,
		)}
	>
		{children}
	</Dialog.Description>
);

export type AppDialogProps = {
	trigger: ReactNode;
	title: string;
	description?: string;
	children: ReactNode;
	size?: DialogContentProps["size"];
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const AppDialog: FC<AppDialogProps> = ({
	trigger,
	title,
	description,
	children,
	size = "md",
	open,
	onOpenChange,
}) => (
	<Dialog.Root open={open} onOpenChange={onOpenChange}>
		<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
		<DialogContent size={size}>
			<DialogTitle>{title}</DialogTitle>
			{description && <DialogDescription>{description}</DialogDescription>}
			{children}
		</DialogContent>
	</Dialog.Root>
);

export { Dialog };

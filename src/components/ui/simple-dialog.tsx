import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import type { FC, ReactNode } from "react";
import { Dialog } from "#/components/ui/dialog";

type SimpleDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
};

export const SimpleDialog: FC<SimpleDialogProps> = ({
	open,
	onOpenChange,
	children,
}) => (
	<Dialog.Root open={open} onOpenChange={onOpenChange}>
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-white/10" />
			<Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-full sm:max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-neutral-200 bg-white p-6 shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900">
				<VisuallyHidden.Root asChild>
					<Dialog.Title>Dialog</Dialog.Title>
				</VisuallyHidden.Root>
				{children}
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

import classNames from "classnames";
import { ContextMenu } from "radix-ui";
import type { FC, ReactNode } from "react";

export type ContextMenuItem = {
	type?: "item" | "separator";
	label?: ReactNode;
	icon?: ReactNode;
	onSelect?: () => void;
	disabled?: boolean;
	inset?: boolean;
	id?: string;
};

export type AppContextMenuProps = {
	trigger: ReactNode;
	items: ContextMenuItem[];
};

export const AppContextMenu: FC<AppContextMenuProps> = ({ trigger, items }) => (
	<ContextMenu.Root>
		<ContextMenu.Trigger asChild>{trigger}</ContextMenu.Trigger>
		<ContextMenu.Portal>
			<ContextMenu.Content className="z-50 min-w-50 rounded-md border border-neutral-200 bg-white p-2 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
				{items.map((item) =>
					item.type === "separator" ? (
						<ContextMenu.Separator
							key={item.id || `sep-${item.label}`}
							className="my-2 h-px bg-neutral-200 dark:bg-neutral-700"
						/>
					) : (
						<ContextMenu.Item
							key={item.id || `item-${item.label}`}
							disabled={item.disabled}
							onSelect={item.onSelect}
							className={classNames(
								"flex cursor-pointer select-none items-center gap-2 rounded-md py-2 text-sm text-neutral-900 outline-none",
								"hover:bg-neutral-100 data-disabled:cursor-not-allowed data-disabled:opacity-50",
								"dark:text-neutral-50 dark:hover:bg-neutral-800",
								item.inset ? "pl-9 pr-3" : "px-3",
							)}
						>
							{item.icon && (
								<span className="flex h-4 w-4 items-center justify-center text-neutral-500 dark:text-neutral-300">
									{item.icon}
								</span>
							)}
							{item.label}
						</ContextMenu.Item>
					),
				)}
			</ContextMenu.Content>
		</ContextMenu.Portal>
	</ContextMenu.Root>
);

export { ContextMenu };

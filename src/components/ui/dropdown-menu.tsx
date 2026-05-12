import classNames from "classnames";
import { DropdownMenu } from "radix-ui";
import type { FC, ReactNode } from "react";

export type AppDropdownItem = {
	id?: string;
	type?: "item" | "separator" | "checkbox";
	label?: ReactNode;
	icon?: ReactNode;
	onSelect?: () => void;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	inset?: boolean;
	disabled?: boolean;
};

export type AppDropdownMenuProps = {
	trigger: ReactNode;
	items: AppDropdownItem[];
	align?: "start" | "center" | "end";
};

export const AppDropdownMenu: FC<AppDropdownMenuProps> = ({
	trigger,
	items,
	align = "start",
}) => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
		<DropdownMenu.Portal>
			<DropdownMenu.Content
				align={align}
				sideOffset={6}
				className="z-50 min-w-45 rounded-md border border-neutral-200 bg-white p-2 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
			>
				{items.map((item) => {
					if (item.type === "separator") {
						return (
							<DropdownMenu.Separator
								key={item.id || `sep-${item.label}`}
								className="my-2 h-px bg-neutral-200 dark:bg-neutral-700"
							/>
						);
					}

					if (item.type === "checkbox") {
						return (
							<DropdownMenu.CheckboxItem
								key={item.id || `checkbox-${item.label}`}
								checked={item.checked}
								onCheckedChange={item.onCheckedChange}
								disabled={item.disabled}
								className={classNames(
									"flex cursor-pointer select-none items-center gap-2 rounded-md py-2 text-sm text-neutral-900 outline-none",
									"hover:bg-neutral-100 data-disabled:cursor-not-allowed data-disabled:opacity-50",
									"dark:text-neutral-50 dark:hover:bg-neutral-800",
									item.inset ? "pl-9 pr-3" : "px-3",
								)}
							>
								{item.icon ? (
									<span className="flex size-4 items-center justify-center text-neutral-500 dark:text-neutral-300">
										{item.icon}
									</span>
								) : (
									<span className="w-4" aria-hidden />
								)}
								{item.label}
							</DropdownMenu.CheckboxItem>
						);
					}

					return (
						<DropdownMenu.Item
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
						</DropdownMenu.Item>
					);
				})}
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	</DropdownMenu.Root>
);

export { DropdownMenu };

import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Select as RadixSelect } from "radix-ui";
import type { FC, ReactNode } from "react";
import { useId } from "react";

export type SelectOption = {
	value: string;
	label: ReactNode;
	disabled?: boolean;
};

export type SelectProps = {
	label?: ReactNode;
	helperText?: ReactNode;
	error?: ReactNode;
	placeholder?: string;
	options: SelectOption[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	name?: string;
	id?: string;
	className?: string;
};

export const Select: FC<SelectProps> = ({
	label,
	helperText,
	error,
	placeholder,
	options,
	value,
	defaultValue,
	onValueChange,
	disabled,
	name,
	id,
	className,
}) => {
	const autoId = useId();
	const triggerId = id ?? `select-${autoId}`;
	const labelId = `${triggerId}-label`;

	return (
		<div className="block space-y-1.5">
			{label && (
				<span
					id={labelId}
					className="block text-sm font-medium text-neutral-800 dark:text-neutral-100"
				>
					{label}
				</span>
			)}
			<RadixSelect.Root
				value={value}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				disabled={disabled}
				name={name}
			>
				<RadixSelect.Trigger
					id={triggerId}
					className={classNames(
						"flex w-full items-center justify-between gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-left text-sm text-neutral-900 shadow-sm",
						"focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500",
						"data-[state=open]:border-neutral-400",
						"dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50",
						error
							? "border-warn-500 focus:border-warn-600 focus:ring-warn-500"
							: "",
						"data-disabled:cursor-not-allowed data-disabled:opacity-60",
						className,
					)}
					aria-invalid={Boolean(error)}
					aria-labelledby={label ? labelId : undefined}
				>
					<RadixSelect.Value placeholder={placeholder ?? "Select an option"} />
					<RadixSelect.Icon>
						<ChevronUpDownIcon className="size-4 text-neutral-500 dark:text-neutral-300" />
					</RadixSelect.Icon>
				</RadixSelect.Trigger>

				<RadixSelect.Portal>
					<RadixSelect.Content
						position="popper"
						className="z-50 min-w-55 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900"
					>
						<RadixSelect.ScrollUpButton className="flex h-8 items-center justify-center text-neutral-500 dark:text-neutral-300">
							<ChevronUpIcon className="size-4" />
						</RadixSelect.ScrollUpButton>
						<RadixSelect.Viewport className="p-1">
							{options.map((option) => (
								<RadixSelect.Item
									key={option.value}
									value={option.value}
									disabled={option.disabled}
									className={classNames(
										"flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-900 outline-none",
										"hover:bg-neutral-100 focus:bg-neutral-100",
										"data-[state=checked]:bg-accent-50 data-[state=checked]:text-accent-700",
										"data-disabled:cursor-not-allowed data-disabled:opacity-50",
										"dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
										"dark:data-[state=checked]:bg-accent-950 dark:data-[state=checked]:text-accent-100",
									)}
								>
									<RadixSelect.ItemIndicator>
										<CheckIcon className="size-4 text-accent-600 dark:text-accent-300" />
									</RadixSelect.ItemIndicator>
									<RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
								</RadixSelect.Item>
							))}
						</RadixSelect.Viewport>
						<RadixSelect.ScrollDownButton className="flex h-8 items-center justify-center text-neutral-500 dark:text-neutral-300">
							<ChevronDownIcon className="size-4" />
						</RadixSelect.ScrollDownButton>
					</RadixSelect.Content>
				</RadixSelect.Portal>
			</RadixSelect.Root>

			{error ? (
				<p className="text-xs text-warn-600">{error}</p>
			) : (
				helperText && (
					<p className="text-xs text-neutral-600 dark:text-neutral-300">
						{helperText}
					</p>
				)
			)}
		</div>
	);
};

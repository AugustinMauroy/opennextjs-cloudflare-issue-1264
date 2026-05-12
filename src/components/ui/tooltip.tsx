import { Tooltip } from "radix-ui";
import type { FC, ReactNode } from "react";

export type AppTooltipProps = {
	label: ReactNode;
	children: ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
};

export const AppTooltip: FC<AppTooltipProps> = ({
	label,
	children,
	side = "top",
	align = "center",
}) => (
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					side={side}
					align={align}
					className="z-50 rounded-md bg-neutral-900 px-3 py-2 text-sm text-white shadow-sm dark:bg-neutral-100 dark:text-neutral-900"
				>
					{label}
					<Tooltip.Arrow className="fill-neutral-900 dark:fill-neutral-100" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	</Tooltip.Provider>
);

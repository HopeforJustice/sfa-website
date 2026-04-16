import {
	Popover,
	PopoverBackdrop,
	PopoverButton,
	PopoverPanel,
} from "@headlessui/react";
import { resolveHref } from "@/lib/resolveHref";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

// Resolve icon value stored in Sanity.
// Supports both new format "outline:RectangleStackIcon" / "solid:RectangleStackIcon"
// and the legacy bare name "RectangleStackIcon" (defaults to outline).
function resolveIcon(iconValue) {
	if (!iconValue) return null;
	if (iconValue.includes(":")) {
		const [variant, name] = iconValue.split(":");
		const set = variant === "solid" ? SolidIcons : OutlineIcons;
		return set[name] ?? null;
	}
	// Legacy: bare icon name
	return OutlineIcons[iconValue] ?? SolidIcons[iconValue] ?? null;
}

export default function FlyoutMenu({ item }) {
	const multiColumn = item.columns.length > 1;

	return (
		<Popover className="relative">
			<PopoverBackdrop className="fixed inset-0 z-10" />
			<PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 outline-none hover:opacity-80">
				<span className="text-base">{item.title}</span>
				<ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
			</PopoverButton>

			<PopoverPanel
				transition
				anchor={{ to: "bottom start", gap: "20px", padding: "16px" }}
				className="z-20 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
			>
				<div
					className={clsx(
						"flex w-screen flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5",
						multiColumn ? "max-w-4xl" : "max-w-sm",
					)}
				>
					<div className={clsx("p-4", multiColumn && "flex gap-4")}>
						{item.columns.map((col) => {
							const hasIcons = col.items?.some((i) => i.icon);
							return (
								<div key={col.title}>
									{col.title && (
										<h3
											className={clsx(
												"p-4 text-sm font-bold uppercase opacity-50 text-sfa-blue tracking-wider",
												hasIcons ? "px-4" : "px-5",
											)}
										>
											{col.title}
										</h3>
									)}
									{col.items?.map((menuItem) => {
										const Icon = resolveIcon(menuItem.icon);
										return (
											<div
												key={menuItem.name}
												className={clsx(
													"group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50",
													!Icon && "px-5",
												)}
											>
												{Icon && (
													<div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
														<Icon
															aria-hidden="true"
															className="h-5 w-5 text-gray-600 group-hover:text-sfa-orange"
														/>
													</div>
												)}
												<div>
													<a
														href={resolveHref(menuItem)}
														className="font-semibold text-sfa-blue group-hover:text-sfa-orange"
													>
														{menuItem.name}
														<span className="absolute inset-0" />
													</a>
													<p className="mt-1 text-gray-600">
														{menuItem.description}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</PopoverPanel>
		</Popover>
	);
}

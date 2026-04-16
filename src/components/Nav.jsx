"use client";

import { useState } from "react";
import { resolveHref } from "@/lib/resolveHref";
import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import FlyoutMenu from "./FlyoutMenu";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// const nav = {
// 	items: [
// 		{ title: "About us", type: "navLink", href: "#" },
// 		{ title: "Why partner with us", type: "navLink", href: "#" },
// 		{
// 			title: "Services",
// 			type: "navFlyout",
// 			columns: [
// 				{
// 					title: "Our Services",
// 					items: [
// 						{
// 							name: "Our Full Range of Services",
// 							description:
// 								"Specialist services delivered by unrivalled experts",
// 							href: "#",
// 							icon: "RectangleStackIcon",
// 						},
// 						{
// 							name: "Membership",
// 							description: "Protect your organisation, supply chain and people",
// 							href: "#",
// 							icon: "UserGroupIcon",
// 						},
// 						{
// 							name: "Consultancy",
// 							description:
// 								"Identify good practice and areas for improvement across your operations",
// 							href: "#",
// 							icon: "ChatBubbleBottomCenterTextIcon",
// 						},
// 						{
// 							name: "Technology Solutions",
// 							description: "Future proof your response to modern slavery",
// 							href: "#",
// 							icon: "ComputerDesktopIcon",
// 						},
// 					],
// 				},
// 				{
// 					title: "Modern Slavery Training",
// 					items: [
// 						{
// 							name: "What is Modern Slavery?",
// 							description:
// 								"What modern slavery might look like in your industry and the steps to mitigate the risk",
// 							href: "#",
// 						},
// 						{
// 							name: "Taking Action Against Modern Slavery",
// 							description:
// 								"Delve deeper into the subject and required actions to tackle modern slavery",
// 							href: "#",
// 						},
// 						{
// 							name: "Modern Slavery Awareness for Executives",
// 							description:
// 								"Learn about managing modern slavery risks and issues in operations and supply chains",
// 							href: "#",
// 						},
// 						{
// 							name: "Responding to Modern Slavery",
// 							description:
// 								"Respond effectively to a suspected case of modern slavery",
// 							href: "#",
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			title: "Success Stories",
// 			type: "navFlyout",
// 			columns: [
// 				{
// 					items: [
// 						{
// 							name: "Case Studies & Testimonials",
// 							description:
// 								"Specialist services delivered by unrivalled experts",
// 							href: "#",
// 							icon: "DocumentMagnifyingGlassIcon",
// 						},
// 						{
// 							name: "Collaborative Groups",
// 							description:
// 								"Industry groups to improve sector-wide resilience to modern slavery.",
// 							href: "#",
// 							icon: "UsersIcon",
// 						},
// 						{
// 							name: "Strategic Partnerships",
// 							description:
// 								"Strategic alliances with prominent companies dedicated to promoting ethical supply chains",
// 							href: "#",
// 							icon: "RocketLaunchIcon",
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			title: "Resources",
// 			type: "navFlyout",
// 			columns: [
// 				{
// 					items: [
// 						{
// 							name: "News Stories",
// 							description:
// 								"Stay up to date with the latest research, insights, and stories of increasing resilience against modern slavery",
// 							href: "#",
// 						},
// 						{
// 							name: "Anti-Slavery Day",
// 							description: "Raise awareness of the issue in your organisation",
// 							href: "#",
// 						},
// 						{
// 							name: "Events",
// 							description: "Upcoming Slave-Free Alliance events",
// 							href: "#",
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{ title: "Contact", type: "navLink", href: "#" },
// 		{ title: "Members Area", type: "navButton", href: "#" },
// 	],
// };

export default function Nav({ data }) {
	if (!data || !data.items) return null;
	const navItems = data?.items;
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<>
			<nav className="gap-8 items-center hidden xl:flex">
				{navItems &&
					navItems.map((item, i) =>
						item.type === "navFlyout" ? (
							<FlyoutMenu key={i} item={item} />
						) : item.type === "navButton" ? (
							<button
								key={i}
								className="px-4 py-2 bg-white text-sfa-blue text-sm font-bold rounded-md"
							>
								{item.title}
							</button>
						) : (
							<a
								key={i}
								href={resolveHref(item)}
								className="font-bold hover:opacity-80 cursor-pointer"
							>
								{item.title}
							</a>
						),
					)}
			</nav>
			{/* mobile menu button */}
			<div className="block xl:hidden">
				<button
					type="button"
					onClick={() => setMobileMenuOpen(true)}
					className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
				>
					<span className="sr-only">Open main menu</span>
					<Bars3Icon aria-hidden="true" className="size-8 text-white" />
				</button>
			</div>

			{/* mobile menu */}
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className="xl:hidden"
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					{/* close mobile menu */}
					<div className="flex items-center justify-end">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="size-8" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navItems &&
									navItems.map((item) =>
										item.type === "navLink" ? (
											<Disclosure key={item.title} as="div" className="-mx-3">
												<DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
													{item.title}
												</DisclosureButton>
											</Disclosure>
										) : item.type === "navFlyout" ? (
											item.columns.map((col, ci) => (
												<Disclosure
													key={`${item.title}-${ci}`}
													as="div"
													className="-mx-3"
												>
													<DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
														{col.title || item.title}
														<ChevronDownIcon
															aria-hidden="true"
															className="size-5 flex-none group-data-[open]:rotate-180"
														/>
													</DisclosureButton>
													<DisclosurePanel className="mt-2 space-y-2">
														{col.items?.map((menuItem) => (
															<DisclosureButton
																key={menuItem.name}
																as="a"
																href={resolveHref(menuItem)}
																className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
															>
																{menuItem.name}
																<p className="text-sm text-sfa-blue font-normal">
																	{menuItem.description}
																</p>
															</DisclosureButton>
														))}
													</DisclosurePanel>
												</Disclosure>
											))
										) : null,
									)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</>
	);
}

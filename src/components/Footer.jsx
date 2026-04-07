import Logo from "./Logo";
import { sanityFetch } from "../sanity/lib/live";
import { FOOTER_QUERY } from "../sanity/lib/queries";

const social = [
	{
		name: "X",
		href: "#",
		icon: (props) => (
			<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
				<path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
			</svg>
		),
	},
	{
		name: "LinkedIn",
		href: "#",
		icon: (props) => (
			<svg className="w-[24px] h-[24px]" viewBox="0 0 430.117 430.118">
				<path
					id="LinkedIn__x28_alt_x29_"
					d="M398.355,0H31.782C14.229,0,0.002,13.793,0.002,30.817v368.471   c0,17.025,14.232,30.83,31.78,30.83h366.573c17.549,0,31.76-13.814,31.76-30.83V30.817C430.115,13.798,415.904,0,398.355,0z    M130.4,360.038H65.413V165.845H130.4V360.038z M97.913,139.315h-0.437c-21.793,0-35.92-14.904-35.92-33.563   c0-19.035,14.542-33.535,36.767-33.535c22.227,0,35.899,14.496,36.331,33.535C134.654,124.415,120.555,139.315,97.913,139.315z    M364.659,360.038h-64.966V256.138c0-26.107-9.413-43.921-32.907-43.921c-17.973,0-28.642,12.018-33.327,23.621   c-1.736,4.144-2.166,9.94-2.166,15.728v108.468h-64.954c0,0,0.85-175.979,0-194.192h64.964v27.531   c8.624-13.229,24.035-32.1,58.534-32.1c42.76,0,74.822,27.739,74.822,87.414V360.038z M230.883,193.99   c0.111-0.182,0.266-0.401,0.42-0.614v0.614H230.883z"
					fill="#FFFFFF"
				/>
			</svg>
		),
	},
];

export default async function Footer() {
	const { data } = await sanityFetch({ query: FOOTER_QUERY });
	const footerColumns = data?.footerColumns ?? [];

	return (
		<footer className="bg-sfa-blue">
			<div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="space-y-8">
						<div className="max-w-52">
							<Logo />
						</div>
						<p className="text-balance text-sm/6 text-gray-300">
							Part of{" "}
							<a href="https://hopeforjustice.org" className="underline">
								Hope for Justice
							</a>
							, a registered charity
						</p>
						<div className="flex gap-x-6">
							{social.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="text-gray-400 hover:text-gray-300"
								>
									<span className="sr-only">{item.name}</span>
									<item.icon aria-hidden="true" className="size-6" />
								</a>
							))}
						</div>
					</div>
					<div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
						{footerColumns.map((column) => (
							<div key={column.title}>
								<h3 className="text-sm/6 font-semibold text-white">
									{column.title}
								</h3>
								<ul role="list" className="mt-6 space-y-4">
									{column.items?.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className="text-sm/6 text-gray-400 hover:text-white"
											>
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
				<div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
					<p className="text-sm/6 text-gray-400">
						Slave-Free Alliance Ltd is a registered company (no. 11258651) and
						is a part of{" "}
						<a href="https://hopeforjustice.org" className="underline">
							Hope for Justice
						</a>
						, which is a charity registered in England and Wales (no. 1126097)
						and in Scotland (no. SC045769). Slave-Free Alliance (Australia) Ltd
						is a registered ACNC and is part of Hope for Justice (Australia) Ltd
						which is a charity registered in Australia. Slave-Free Alliance
						acknowledges the Traditional Owners of Country throughout Australia.
						We pay our respects to Elders past, present and emerging.
					</p>
				</div>
			</div>
		</footer>
	);
}

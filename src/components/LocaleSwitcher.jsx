"use client";

import { usePathname } from "next/navigation";
import { setLocale } from "@/lib/actions";

const LOCALES = [
	{ id: "en", label: "Global (UK)" },
	{ id: "en-US", label: "United States" },
];

export default function LocaleSwitcher({ currentLocale }) {
	const pathname = usePathname();

	return (
		<div className="flex items-center gap-2">
			{LOCALES.map(({ id, label }) => {
				const isActive = currentLocale === id;
				return (
					<form key={id} action={setLocale.bind(null, id, pathname)}>
						<button
							type="submit"
							className={
								isActive
									? "text-sm font-semibold underline underline-offset-2"
									: "text-sm opacity-60 hover:opacity-100 transition-opacity"
							}
							aria-current={isActive ? "true" : undefined}
						>
							{label}
						</button>
					</form>
				);
			})}
		</div>
	);
}

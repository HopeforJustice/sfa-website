import Container from "./Container";
import { resolveHref } from "@/lib/resolveHref";

export default function CtaBanner({ data }) {
	const heading = data?.heading || "Ready to get started?";
	const body =
		data?.body ||
		"Join the Scottish Football Association and help shape the future of the game. Get in touch with our team today.";
	const primaryButton = data?.primaryButton;
	const secondaryButton = data?.secondaryButton;

	return (
		<Container allowFullWidth={true}>
			<div className="relative isolate overflow-hidden bg-sfa-blue px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
				<h2 className="text-balance text-4xl tracking-tight text-white sm:text-5xl font-display">
					{heading}
				</h2>
				<p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-300">
					{body}
				</p>
				{(primaryButton?.text || secondaryButton?.text) && (
					<div className="mt-10 flex items-center justify-center gap-x-6">
						{primaryButton?.text && (
							<a
								href={resolveHref(primaryButton)}
								className="rounded-md bg-sfa-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								{primaryButton.text}
							</a>
						)}
						{secondaryButton?.text && (
							<a
								href={resolveHref(secondaryButton)}
								className="text-sm/6 font-semibold text-white underline"
							>
								{secondaryButton.text} <span aria-hidden="true">→</span>
							</a>
						)}
					</div>
				)}
				<svg
					viewBox="0 0 1024 1024"
					aria-hidden="true"
					className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
				>
					<circle
						r={512}
						cx={512}
						cy={512}
						fill="url(#cta-banner-gradient)"
						fillOpacity="0.7"
					/>
					<defs>
						<radialGradient id="cta-banner-gradient">
							<stop stopColor="#F9FAFA" />
							<stop offset={1} stopColor="#A1AAB0" />
						</radialGradient>
					</defs>
				</svg>
			</div>
		</Container>
	);
}

import Button from "../Button";
import { urlFor } from "@/sanity/lib/image";
import { resolveHref } from "@/lib/resolveHref";
import { createDataAttribute } from "@sanity/visual-editing/create-data-attribute";
import placeholderImage from "@/app/img/placeholder.svg";
import Container from "../Container";

export default function HeroImageColumns({ data, documentId, documentType }) {
	const {
		eyebrow,
		heading,
		body,
		primaryButton,
		secondaryButton,
		images = [],
	} = data;

	const attr = (path) =>
		documentId
			? {
					"data-sanity": createDataAttribute({
						id: documentId,
						type: documentType,
						path: `pageBuilder[_key=="${data._key}"].${path}`,
					}).toString(),
				}
			: {};

	const imgUrl = (img) =>
		img?.asset
			? urlFor(img).width(352).height(528).fit("crop").url()
			: placeholderImage;

	return (
		<div className="relative bg-sfa-blue w-full lg:mb-32">
			{/* Background styles */}
			<div
				aria-hidden="true"
				className="absolute inset-0 pointer-events-none overflow-hidden"
			>
				{/* Top-left warm blob */}
				<div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-sfa-blue-500 opacity-20 blur-[100px]" />
				{/* Bottom-right cool blob */}
				<div className="absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full bg-sfa-blue-400 opacity-30 blur-[120px]" />
				{/* Centre accent */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-sfa-blue-400 opacity-10 blur-[80px]" />
				{/* Vignette */}
				<div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
			</div>
			<Container>
				<div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center pt-32 lg:pt-0">
					<div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-xl">
						{eyebrow && (
							<div
								{...attr("eyebrow")}
								className="uppercase text-sm tracking-widest text-white mb-6 opacity-50"
							>
								{eyebrow}
							</div>
						)}
						{heading && (
							<h1
								{...attr("heading")}
								className="text-pretty text-5xl font-display font-normal text-white sm:text-6xl"
							>
								{heading}
							</h1>
						)}
						{body && (
							<p
								{...attr("body")}
								className="mt-8 text-pretty text-lg text-sfa-blue-100 sm:max-w-md sm:text-xl/8 lg:max-w-none"
							>
								{body}
							</p>
						)}
						<div className="mt-10 flex items-center gap-x-6 flex-wrap">
							{primaryButton?.text && (
								<div {...attr("primaryButton")}>
									<Button
										buttonText={primaryButton.text}
										href={resolveHref(primaryButton)}
										type="primary"
										color="light"
									/>
								</div>
							)}
							{secondaryButton?.text && (
								<div {...attr("secondaryButton")}>
									<Button
										buttonText={secondaryButton.text}
										href={resolveHref(secondaryButton)}
										type="secondary"
										color="light"
									/>
								</div>
							)}
						</div>
					</div>
					<div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0 lg:-mr-80 relative -bottom-5 lg:-bottom-12">
						{/* Column 1 — single image, offset lower */}
						<div className="ml-auto w-44 lg:w-52 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
							{images[0] && (
								<div className="relative">
									<img
										{...attr("images[0]")}
										src={imgUrl(images[0])}
										alt={images[0].alt || ""}
										className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
									/>
									<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-sfa-blue/10" />
								</div>
							)}
						</div>
						{/* Column 2 — two images */}
						<div className="mr-auto w-52 lg:w-52  flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
							{images[1] && (
								<div className="relative">
									<img
										{...attr("images[1]")}
										src={imgUrl(images[1])}
										alt={images[1].alt || ""}
										className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
									/>
									<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-sfa-blue/10" />
								</div>
							)}
							{images[2] && (
								<div className="relative">
									<img
										{...attr("images[2]")}
										src={imgUrl(images[2])}
										alt={images[2].alt || ""}
										className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
									/>
									<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-sfa-blue/10" />
								</div>
							)}
						</div>
						{/* Column 3 — two images, top offset */}
						<div className="w-44 lg:w-52  flex-none space-y-8 pt-32 sm:pt-0 lg:pt-16">
							{images[3] && (
								<div className="relative">
									<img
										{...attr("images[3]")}
										src={imgUrl(images[3])}
										alt={images[3].alt || ""}
										className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
									/>
									<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-sfa-blue/10" />
								</div>
							)}
							{images[4] && (
								<div className="relative">
									<img
										{...attr("images[4]")}
										src={imgUrl(images[4])}
										alt={images[4].alt || ""}
										className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
									/>
									<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-sfa-blue/10" />
								</div>
							)}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

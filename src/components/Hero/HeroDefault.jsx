import Container from "../Container";
import Button from "../Button";
import { urlFor } from "@/sanity/lib/image";
import { resolveHref } from "@/lib/resolveHref";
import { createDataAttribute } from "@sanity/visual-editing/create-data-attribute";
import placeholderImage from "@/app/img/placeholder.svg";
import NetworkCanvas from "../NetworkCanvas";

export default function HeroDefault({ data, documentId, documentType }) {
	const { eyebrow, heading, body, primaryButton, secondaryButton, image } =
		data;

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

	return (
		<div className="relative bg-sfa-blue w-full pt-32 lg:pt-40 pb-20">
			<div className="hidden md:block">
				<NetworkCanvas />
			</div>
			<Container>
				<div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center text-pretty">
					<div className="max-w-2xl">
						{eyebrow && (
							<div
								{...attr("eyebrow")}
								className="text-sm tracking-widest text-white mb-6 opacity-50 pt-5"
							>
								{eyebrow}
							</div>
						)}
						{heading && (
							<h1
								{...attr("heading")}
								className="text-4xl sm:text-4xl md:text-5xl md:text-[2.9rem] font-display font-normal text-white mb-8"
							>
								{heading}
							</h1>
						)}
						{body && (
							<p
								{...attr("body")}
								className="text-white text-xl/8 mb-12 opacity-90 md:text-balance"
							>
								{body}
							</p>
						)}
						<div className="flex gap-6 md:gap-8 flex-wrap">
							{primaryButton?.text && (
								<div {...attr("primaryButton")}>
									<Button
										buttonText={primaryButton.text}
										href={resolveHref(primaryButton)}
										type="primary"
									/>
								</div>
							)}
							{secondaryButton?.text && (
								<div {...attr("secondaryButton")}>
									<Button
										buttonText={secondaryButton.text}
										href={resolveHref(secondaryButton)}
										type="secondary"
									/>
								</div>
							)}
						</div>
					</div>
					<div className="rounded-2xl overflow-hidden w-full h-[60vw] -mb-32 lg:-mr-80 lg:w-[800px] lg:h-[600px]">
						<img
							{...attr("image")}
							src={
								image?.asset
									? urlFor(image).width(800).height(600).fit("crop").url()
									: placeholderImage
							}
							alt={image?.alt || ""}
							className="relative w-full h-full object-cover z-10"
						/>
					</div>
				</div>
			</Container>
		</div>
	);
}

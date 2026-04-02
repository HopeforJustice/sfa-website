import Container from "./Container";
import Button from "./Button";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { createDataAttribute } from "@sanity/visual-editing/create-data-attribute";

export default function Hero({ data, documentId, documentType }) {
	if (!data) return null;

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
		<div className="bg-sfa-blue w-full pt-32 lg:pt-40 pb-20">
			<Container>
				<div className="grid lg:grid-cols-2 gap-16 items-center">
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
								className="text-5xl sm:text-5xl md:text-6xl font-display font-normal text-white mb-8 leading-tight text-balance"
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
										href={primaryButton.href || "#"}
										type="primary"
									/>
								</div>
							)}
							{secondaryButton?.text && (
								<div {...attr("secondaryButton")}>
									<Button
										buttonText={secondaryButton.text}
										href={secondaryButton.href || "#"}
										type="secondary"
									/>
								</div>
							)}
						</div>
					</div>
					{image?.asset && (
						<div
							{...attr("image")}
							className="rounded-2xl overflow-hidden w-full h-[60vw] -mb-32 lg:-mr-80 lg:w-[800px] lg:h-[600px]"
						>
							<Image
								src={urlFor(image).width(800).height(600).fit("crop").url()}
								alt={image.alt || ""}
								width={800}
								height={600}
								className="relative w-full h-full object-cover"
							/>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
}

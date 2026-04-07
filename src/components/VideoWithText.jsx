import Button from "./Button";
import Container from "./Container";
import { createDataAttribute } from "@sanity/visual-editing/create-data-attribute";

export default function VideoWithText({ data, documentId, documentType }) {
	if (!data) return null;

	const { vimeoUrl, videoTitle, heading, primaryButton, secondaryButton } =
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
		<section className="mb-10 lg:mb-20 bg-white">
			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					{vimeoUrl && (
						<div className="pt-[56.25%] relative rounded-xl overflow-hidden">
							<iframe
								src={vimeoUrl}
								allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
								className="absolute top-0 left-0 w-full h-full"
								title={videoTitle || "Video"}
							></iframe>
							{documentId && (
								<div {...attr("vimeoUrl")} className="absolute inset-0" />
							)}
						</div>
					)}
					<div className="flex flex-col justify-center">
						{heading && <h2 className="font-bold text-3xl mb-14">{heading}</h2>}
						<div className="flex gap-6 md:gap-8 flex-wrap">
							{primaryButton?.text && (
								<Button
									buttonText={primaryButton.text}
									href={primaryButton.href || "#"}
									type="primary"
								/>
							)}
							{secondaryButton?.text && (
								<Button
									buttonText={secondaryButton.text}
									href={secondaryButton.href || "#"}
									type="secondary"
									color="dark"
								/>
							)}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}

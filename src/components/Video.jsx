import Container from "./Container";
import { createDataAttribute } from "@sanity/visual-editing/create-data-attribute";

export default function Video({ data, documentId, documentType }) {
	if (!data) return null;

	const { vimeoUrl, videoTitle } = data;

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

	if (!vimeoUrl) return null;

	return (
		<section className="bg-white">
			<Container>
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
			</Container>
		</section>
	);
}

import MemberLogos from "./MemberLogos";
import ImageTilesWithText from "./ImageTilesWithText";
import Quote from "./Quote";
import VideoWithText from "./VideoWithText";
import ImageWithText from "./ImageWithText";
import Hero from "./Hero";

const blockComponents = {
	heroBlock: Hero,
	imageTilesWithTextBlock: ImageTilesWithText,
	videoWithTextBlock: VideoWithText,
	memberLogosBlock: MemberLogos,
	quoteBlock: Quote,
	imageWithTextBlock: ImageWithText,
};

export default function PageBuilder({ blocks = [], documentId, documentType }) {
	return (
		<>
			{blocks.map((block) => {
				const Component = blockComponents[block._type];
				if (!Component) return null;
				return (
					<Component
						key={block._key}
						data={block}
						documentId={documentId}
						documentType={documentType}
					/>
				);
			})}
		</>
	);
}

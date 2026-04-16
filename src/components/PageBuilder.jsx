import MemberLogos from "./MemberLogos";
import ImageTilesWithText from "./ImageTilesWithText";
import Quote from "./Quote";
import VideoWithText from "./VideoWithText";
import Video from "./Video";
import ImageWithText from "./ImageWithText";
import Hero from "./Hero";
import StatsGrid from "./StatsGrid";
import TwoColText from "./TwoColText";
import CtaBanner from "./CtaBanner";

const blockComponents = {
	heroBlock: Hero,
	imageTilesWithTextBlock: ImageTilesWithText,
	videoWithTextBlock: VideoWithText,
	videoBlock: Video,
	memberLogosBlock: MemberLogos,
	quoteBlock: Quote,
	imageWithTextBlock: ImageWithText,
	statsGridBlock: StatsGrid,
	twoColTextBlock: TwoColText,
	ctaBannerBlock: CtaBanner,
};

export default function PageBuilder({ blocks = [], documentId, documentType }) {
	return (
		<>
			{blocks.map((block) => {
				const Component = blockComponents[block._type];
				if (!Component) return null;
				const isHero = block._type === "heroBlock";
				return (
					<div
						key={block._key}
						className={isHero ? undefined : "my-16 sm:my-24 w-full"}
					>
						<Component
							data={block}
							documentId={documentId}
							documentType={documentType}
						/>
					</div>
				);
			})}
		</>
	);
}

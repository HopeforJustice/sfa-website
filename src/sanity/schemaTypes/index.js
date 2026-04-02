import { navigationType } from "./navigationType";
import { pageType } from "./pageType";
import { heroBlock } from "./blocks/heroBlock";
import { imageTilesWithTextBlock } from "./blocks/imageTilesWithTextBlock";
import { videoWithTextBlock } from "./blocks/videoWithTextBlock";
import { memberLogosBlock } from "./blocks/memberLogosBlock";
import { quoteBlock } from "./blocks/quoteBlock";
import { imageWithTextBlock } from "./blocks/imageWithTextBlock";

export const schema = {
	types: [
		navigationType,
		pageType,
		heroBlock,
		imageTilesWithTextBlock,
		videoWithTextBlock,
		memberLogosBlock,
		quoteBlock,
		imageWithTextBlock,
	],
};

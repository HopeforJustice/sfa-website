import { navigationType } from "./navigationType";
import { pageType } from "./pageType";
import { heroBlock } from "./blocks/heroBlock";
import { imageTilesWithTextBlock } from "./blocks/imageTilesWithTextBlock";
import { videoWithTextBlock } from "./blocks/videoWithTextBlock";
import { videoBlock } from "./blocks/videoBlock";
import { memberLogosBlock } from "./blocks/memberLogosBlock";
import { quoteBlock } from "./blocks/quoteBlock";
import { imageWithTextBlock } from "./blocks/imageWithTextBlock";
import { statsGridBlock } from "./blocks/statsGridBlock";
import { twoColTextBlock } from "./blocks/twoColTextBlock";
import { ctaBannerBlock } from "./blocks/ctaBannerBlock";
import {
	localizableImage,
	localizableImageGallery,
	localizableStatsGrid,
	localizableStatsTile,
	localizableLogoList,
} from "./localizableTypes";

export const schema = {
	types: [
		navigationType,
		pageType,
		heroBlock,
		imageTilesWithTextBlock,
		videoWithTextBlock,
		videoBlock,
		memberLogosBlock,
		quoteBlock,
		imageWithTextBlock,
		statsGridBlock,
		twoColTextBlock,
		ctaBannerBlock,
		localizableImage,
		localizableImageGallery,
		localizableStatsGrid,
		localizableStatsTile,
		localizableLogoList,
	],
};

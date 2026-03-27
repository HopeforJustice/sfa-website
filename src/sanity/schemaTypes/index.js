import { artistType } from "./artitstType";
import { venueType } from "./venueType";
import { eventType } from "./eventType";
import { blockContentType } from "./blockContentType";
import { customBlock } from "./blocks/customBlock";
import { pageType } from "./pageType";

export const schema = {
	types: [
		eventType,
		artistType,
		venueType,
		blockContentType,
		customBlock,
		pageType,
	],
};

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: process.env.NODE_ENV === "production", // CDN off in dev for faster iteration
	stega: {
		// Encodes Sanity field paths into rendered text so the Presentation tool
		// can show click-to-edit overlays and reflect live changes.
		enabled: true,
		studioUrl: process.env.NEXT_PUBLIC_NEXTJS_URL
			? `${process.env.NEXT_PUBLIC_NEXTJS_URL}/studio`
			: "http://localhost:3333",
	},
});

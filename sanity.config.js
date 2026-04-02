"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const NEXT_PUBLIC_URL =
	process.env.NEXT_PUBLIC_NEXTJS_URL ||
	(process.env.NEXT_PUBLIC_VERCEL_URL
		? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
		: "http://localhost:3000");

export default defineConfig({
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	plugins: [
		structureTool({ structure }),
		presentationTool({
			allowOrigins: [NEXT_PUBLIC_URL],
			previewUrl: {
				draftMode: {
					enable: `${NEXT_PUBLIC_URL}/api/draft-mode/enable`,
				},
			},
		}),
		// Vision is for querying with GROQ from inside the Studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
});

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

export default defineConfig({
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	plugins: [
		structureTool({ structure }),
		presentationTool({
			allowOrigins: [process.env.SANITY_STUDIO_PREVIEW_URL],
			previewUrl: {
				draftMode: {
					enable: `${process.env.SANITY_STUDIO_PREVIEW_URL}/api/draft-mode/enable`,
				},
			},
		}),
		// Vision is for querying with GROQ from inside the Studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
	deployment: {
		appId: "hejwp6hvjmimjbdfcodd2z3h",
	},
});

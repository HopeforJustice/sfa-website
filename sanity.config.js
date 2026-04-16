"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, defineField } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

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
		internationalizedArray({
			languages: [
				{ id: "en", title: "English (Global)" },
				{ id: "en-US", title: "English (US)" },
			],
			defaultLanguages: ["en"],
			languageDisplay: "titleAndCode",
			buttonLocations: ["field"],
			fieldTypes: [
				"string",
				"text",
				// Single image with hotspot + alt text (registered as named type in schema)
				"localizableImage",
				// Vimeo / external URL
				defineField({
					name: "localizableUrl",
					type: "url",
				}),
				// Complex array types — registered as named schema types
				"localizableImageGallery",
				"localizableStatsGrid",
				"localizableStatsTile",
				"localizableLogoList",
			],
		}),
	],
	deployment: {
		appId: "hejwp6hvjmimjbdfcodd2z3h",
	},
});

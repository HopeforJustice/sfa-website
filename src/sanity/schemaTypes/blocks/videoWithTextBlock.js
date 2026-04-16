import { defineField, defineType } from "sanity";
import { linkFields } from "../linkFields";

export const videoWithTextBlock = defineType({
	name: "videoWithTextBlock",
	title: "Video With Text",
	type: "object",
	fields: [
		defineField({
			name: "vimeoUrl",
			title: "Vimeo Embed URL",
			type: "internationalizedArrayLocalizableUrl",
			description:
				"The full Vimeo player embed URL (e.g. https://player.vimeo.com/video/...)",
		}),
		defineField({
			name: "videoTitle",
			title: "Video Title",
			type: "internationalizedArrayString",
			description: "Used for the iframe title attribute (accessibility)",
		}),
		defineField({
			name: "heading",
			title: "Heading",
			type: "internationalizedArrayText",
		}),
		defineField({
			name: "primaryButton",
			title: "Primary Button",
			type: "object",
			fields: [
				defineField({
					name: "text",
					title: "Button Text",
					type: "internationalizedArrayString",
				}),
				...linkFields,
			],
		}),
		defineField({
			name: "secondaryButton",
			title: "Secondary Button",
			type: "object",
			fields: [
				defineField({
					name: "text",
					title: "Button Text",
					type: "internationalizedArrayString",
				}),
				...linkFields,
			],
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return {
				title: resolved || "Video With Text Block",
				subtitle: "Block: Video With Text",
			};
		},
	},
});

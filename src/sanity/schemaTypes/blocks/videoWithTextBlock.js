import { defineField, defineType } from "sanity";

export const videoWithTextBlock = defineType({
	name: "videoWithTextBlock",
	title: "Video With Text",
	type: "object",
	fields: [
		defineField({
			name: "vimeoUrl",
			title: "Vimeo Embed URL",
			type: "url",
			description:
				"The full Vimeo player embed URL (e.g. https://player.vimeo.com/video/...)",
		}),
		defineField({
			name: "videoTitle",
			title: "Video Title",
			type: "string",
			description: "Used for the iframe title attribute (accessibility)",
		}),
		defineField({
			name: "heading",
			title: "Heading",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "primaryButton",
			title: "Primary Button",
			type: "object",
			fields: [
				defineField({ name: "text", title: "Button Text", type: "string" }),
				defineField({ name: "href", title: "URL", type: "string" }),
			],
		}),
		defineField({
			name: "secondaryButton",
			title: "Secondary Button",
			type: "object",
			fields: [
				defineField({ name: "text", title: "Button Text", type: "string" }),
				defineField({ name: "href", title: "URL", type: "string" }),
			],
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			return {
				title: title || "Video With Text Block",
				subtitle: "Block: Video With Text",
			};
		},
	},
});

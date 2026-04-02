import { defineField, defineType } from "sanity";

export const imageWithTextBlock = defineType({
	name: "imageWithTextBlock",
	title: "Image With Text",
	type: "object",
	fields: [
		defineField({
			name: "eyebrow",
			title: "Eyebrow Text",
			type: "string",
			description: "Small label above the heading",
		}),
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "body",
			title: "Body Text",
			type: "text",
			rows: 4,
		}),
		defineField({
			name: "button",
			title: "Button",
			type: "object",
			fields: [
				defineField({ name: "text", title: "Button Text", type: "string" }),
				defineField({ name: "href", title: "URL", type: "string" }),
			],
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
			fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			return { title: title || "Image With Text Block" };
		},
	},
});

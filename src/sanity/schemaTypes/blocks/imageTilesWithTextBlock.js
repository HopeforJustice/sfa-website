import { defineArrayMember, defineField, defineType } from "sanity";

export const imageTilesWithTextBlock = defineType({
	name: "imageTilesWithTextBlock",
	title: "Image Tiles With Text",
	type: "object",
	fields: [
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
			name: "subheading",
			title: "Subheading",
			type: "string",
		}),
		defineField({
			name: "subheadingBody",
			title: "Subheading Body Text",
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
			name: "images",
			title: "Tile Images",
			description: "Ideally 4 images for the mosaic layout",
			type: "array",
			of: [
				defineArrayMember({
					type: "image",
					options: { hotspot: true },
					fields: [
						defineField({ name: "alt", title: "Alt Text", type: "string" }),
					],
				}),
			],
		}),
		defineField({
			name: "stats",
			title: "Statistics",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							name: "value",
							title: "Stat Value",
							type: "string",
							description: "e.g. £193bn, 77%, 49.6M",
						}),
						defineField({ name: "label", title: "Stat Label", type: "string" }),
					],
					preview: {
						select: { title: "value", subtitle: "label" },
					},
				}),
			],
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			return { title: title || "Image Tiles With Text Block" };
		},
	},
});

import { defineField, defineType } from "sanity";
import { linkFields } from "../linkFields";

export const imageTilesWithTextBlock = defineType({
	name: "imageTilesWithTextBlock",
	title: "Image Tiles With Text",
	type: "object",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "body",
			title: "Body Text",
			type: "internationalizedArrayText",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "subheadingBody",
			title: "Subheading Body Text",
			type: "internationalizedArrayText",
		}),
		defineField({
			name: "button",
			title: "Button",
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
			name: "images",
			title: "Tile Images",
			description: "Ideally 4 images for the mosaic layout",
			type: "internationalizedArrayLocalizableImageGallery",
		}),
		defineField({
			name: "statsTitle",
			title: "Statistics Title",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "stats",
			title: "Statistics",
			type: "internationalizedArrayLocalizableStatsTile",
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return {
				title: resolved || "Image Tiles With Text Block",
				subtitle: "Block: Image Tiles With Text",
			};
		},
	},
});

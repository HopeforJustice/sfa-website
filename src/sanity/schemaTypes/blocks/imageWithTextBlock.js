import { defineField, defineType } from "sanity";
import { linkFields } from "../linkFields";

export const imageWithTextBlock = defineType({
	name: "imageWithTextBlock",
	title: "Image With Text",
	type: "object",
	fields: [
		defineField({
			name: "eyebrow",
			title: "Eyebrow Text",
			type: "internationalizedArrayString",
			description: "Small label above the heading",
		}),
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
			name: "image",
			title: "Image",
			type: "internationalizedArrayLocalizableImage",
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return {
				title: resolved || "Image With Text Block",
				subtitle: "Block: Image With Text",
			};
		},
	},
});

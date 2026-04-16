import { defineArrayMember, defineField, defineType } from "sanity";
import { linkFields } from "../linkFields";

const buttonField = (name, title) =>
	defineField({
		name,
		title,
		type: "object",
		fields: [
			defineField({
				name: "text",
				title: "Button Text",
				type: "internationalizedArrayString",
			}),
			...linkFields,
		],
	});

export const heroBlock = defineType({
	name: "heroBlock",
	title: "Hero",
	type: "object",
	fields: [
		defineField({
			name: "style",
			title: "Hero Style",
			type: "string",
			initialValue: "default",
			options: {
				list: [
					{
						title: "Default (dark background, single image)",
						value: "default",
					},
					{
						title: "Image Columns (light background, image grid)",
						value: "imageColumns",
					},
				],
				layout: "radio",
			},
		}),
		defineField({
			name: "eyebrow",
			title: "Eyebrow Text",
			type: "internationalizedArrayString",
			description: "Small text above the heading",
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
		buttonField("primaryButton", "Primary Button"),
		buttonField("secondaryButton", "Secondary Button"),
		defineField({
			name: "image",
			title: "Image",
			type: "internationalizedArrayLocalizableImage",
			hidden: ({ parent }) => parent?.style === "imageColumns",
		}),
		defineField({
			name: "images",
			title: "Images",
			type: "internationalizedArrayLocalizableImageGallery",
			description:
				"Add up to 5 images per locale for the staggered column layout.",
			hidden: ({ parent }) => parent?.style !== "imageColumns",
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return { title: resolved || "Hero Block", subtitle: "Block: Hero" };
		},
	},
});

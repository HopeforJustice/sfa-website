import { defineField, defineType } from "sanity";
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

export const ctaBannerBlock = defineType({
	name: "ctaBannerBlock",
	title: "CTA Banner",
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
		buttonField("primaryButton", "Primary Button"),
		buttonField("secondaryButton", "Secondary Button"),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return {
				title: resolved || "CTA Banner",
				subtitle: "Block: CTA Banner",
			};
		},
	},
});

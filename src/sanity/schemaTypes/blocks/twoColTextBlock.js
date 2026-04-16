import { defineField, defineType } from "sanity";

export const twoColTextBlock = defineType({
	name: "twoColTextBlock",
	title: "Two Column Text",
	type: "object",
	fields: [
		defineField({
			name: "eyebrow",
			title: "Eyebrow",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "heading",
			title: "Heading",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "internationalizedArrayText",
			description:
				"Enter each paragraph on a new line. Paragraphs will be distributed evenly across the two columns.",
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return {
				title: resolved || "Two Column Text Block",
				subtitle: "Block: Two Column Text",
			};
		},
	},
});

import { defineField, defineType } from "sanity";

export const statsGridBlock = defineType({
	name: "statsGridBlock",
	title: "Stats Grid",
	type: "object",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "internationalizedArrayText",
		}),
		defineField({
			name: "stats",
			title: "Stats",
			type: "internationalizedArrayLocalizableStatsGrid",
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return {
				title: resolved || "Stats Grid Block",
				subtitle: "Block: Stats Grid",
			};
		},
	},
});

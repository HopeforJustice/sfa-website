import { defineField, defineType } from "sanity";

export const quoteBlock = defineType({
	name: "quoteBlock",
	title: "Quote / Testimonial",
	type: "object",
	fields: [
		defineField({
			name: "companyLogo",
			title: "Company Logo",
			type: "internationalizedArrayLocalizableImage",
		}),
		defineField({
			name: "quote",
			title: "Quote",
			type: "internationalizedArrayText",
		}),
		defineField({
			name: "personImage",
			title: "Person Photo",
			type: "internationalizedArrayLocalizableImage",
		}),
		defineField({
			name: "personName",
			title: "Person Name",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "personRole",
			title: "Person Role / Title",
			type: "internationalizedArrayString",
		}),
	],
	preview: {
		select: { title: "personName" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return {
				title: resolved || "Quote Block",
				subtitle: "Block: Quote / Testimonial",
			};
		},
	},
});

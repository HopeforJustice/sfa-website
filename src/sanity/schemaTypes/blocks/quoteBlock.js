import { defineField, defineType } from "sanity";

export const quoteBlock = defineType({
	name: "quoteBlock",
	title: "Quote / Testimonial",
	type: "object",
	fields: [
		defineField({
			name: "companyLogo",
			title: "Company Logo",
			type: "image",
			options: { hotspot: false },
			fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
		}),
		defineField({
			name: "quote",
			title: "Quote",
			type: "text",
			rows: 5,
		}),
		defineField({
			name: "personImage",
			title: "Person Photo",
			type: "image",
			options: { hotspot: true },
			fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
		}),
		defineField({
			name: "personName",
			title: "Person Name",
			type: "string",
		}),
		defineField({
			name: "personRole",
			title: "Person Role / Title",
			type: "string",
		}),
	],
	preview: {
		select: { title: "personName" },
		prepare({ title }) {
			return {
				title: title || "Quote Block",
				subtitle: "Block: Quote / Testimonial",
			};
		},
	},
});

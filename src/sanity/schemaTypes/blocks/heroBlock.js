import { defineArrayMember, defineField, defineType } from "sanity";

const buttonField = (name, title) =>
	defineField({
		name,
		title,
		type: "object",
		fields: [
			defineField({ name: "text", title: "Button Text", type: "string" }),
			defineField({ name: "href", title: "URL", type: "string" }),
		],
	});

export const heroBlock = defineType({
	name: "heroBlock",
	title: "Hero",
	type: "object",
	fields: [
		defineField({
			name: "eyebrow",
			title: "Eyebrow Text",
			type: "string",
			description: "Small text above the heading",
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
		buttonField("primaryButton", "Primary Button"),
		buttonField("secondaryButton", "Secondary Button"),
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
			return { title: title || "Hero Block", subtitle: "Block: Hero" };
		},
	},
});

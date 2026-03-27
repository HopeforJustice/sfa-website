import { defineField, defineType } from "sanity";

export const customBlock = defineType({
	name: "customBlock",
	title: "Custom Block",
	type: "object",
	fields: [
		defineField({
			name: "name",
			type: "string",
		}),
	],
});

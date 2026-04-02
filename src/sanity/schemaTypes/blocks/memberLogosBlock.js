import { defineArrayMember, defineField, defineType } from "sanity";

export const memberLogosBlock = defineType({
	name: "memberLogosBlock",
	title: "Member Logos",
	type: "object",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "logos",
			title: "Member Logos",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({ name: "name", title: "Member Name", type: "string" }),
						defineField({
							name: "logo",
							title: "Logo",
							type: "image",
							options: { hotspot: false },
						}),
					],
					preview: {
						select: { title: "name" },
					},
				}),
			],
		}),
	],
	preview: {
		select: { title: "heading" },
		prepare({ title }) {
			return { title: title || "Member Logos Block" };
		},
	},
});

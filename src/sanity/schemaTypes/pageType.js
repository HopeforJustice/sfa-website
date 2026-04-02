import { defineArrayMember, defineField, defineType } from "sanity";

export const pageType = defineType({
	name: "page",
	title: "Page",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Page Title",
			type: "string",
			description: "Used for the browser tab title and SEO",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description: 'Use "home" for the homepage',
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "pageBuilder",
			title: "Page Blocks",
			type: "array",
			of: [
				defineArrayMember({ type: "heroBlock" }),
				defineArrayMember({ type: "imageTilesWithTextBlock" }),
				defineArrayMember({ type: "videoWithTextBlock" }),
				defineArrayMember({ type: "memberLogosBlock" }),
				defineArrayMember({ type: "quoteBlock" }),
				defineArrayMember({ type: "imageWithTextBlock" }),
			],
		}),
	],
	preview: {
		select: { title: "title", slug: "slug.current" },
		prepare({ title, slug }) {
			return {
				title: title || "Untitled Page",
				subtitle: slug ? `/${slug}` : "No slug",
			};
		},
	},
});

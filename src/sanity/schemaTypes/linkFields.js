import { defineField } from "sanity";

/**
 * Shared link fields to be spread into any object that has a clickable URL.
 * Offers a toggle between an external URL and an internal page reference.
 */
export const linkFields = [
	defineField({
		name: "linkType",
		title: "Link Type",
		type: "string",
		initialValue: "url",
		options: {
			list: [
				{ title: "External URL", value: "url" },
				{ title: "Internal Page", value: "page" },
			],
			layout: "radio",
		},
	}),
	defineField({
		name: "href",
		title: "External URL",
		type: "string",
		hidden: ({ parent }) => parent?.linkType === "page",
	}),
	defineField({
		name: "pageRef",
		title: "Page",
		type: "reference",
		to: [{ type: "page" }],
		hidden: ({ parent }) => parent?.linkType !== "page",
	}),
];

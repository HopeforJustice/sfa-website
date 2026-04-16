import { defineField, defineType } from "sanity";

export const videoBlock = defineType({
	name: "videoBlock",
	title: "Video",
	type: "object",
	fields: [
		defineField({
			name: "vimeoUrl",
			title: "Vimeo Embed URL",
			type: "internationalizedArrayLocalizableUrl",
			description:
				"The full Vimeo player embed URL (e.g. https://player.vimeo.com/video/...)",
		}),
		defineField({
			name: "videoTitle",
			title: "Video Title",
			type: "internationalizedArrayString",
			description: "Used for the iframe title attribute (accessibility)",
		}),
	],
	preview: {
		select: { title: "videoTitle" },
		prepare({ title }) {
			const resolved = Array.isArray(title)
				? (title.find((t) => t.language === "en")?.value ?? title[0]?.value)
				: title;
			return {
				title: resolved || "Video Block",
				subtitle: "Block: Video",
			};
		},
	},
});

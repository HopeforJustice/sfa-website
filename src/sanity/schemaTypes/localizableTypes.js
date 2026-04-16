import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Named alias types used as the `value` inside internationalized array wrappers.
 * These are passed as string names to `sanity-plugin-internationalized-array`'s
 * `fieldTypes` config after being registered in the schema types array.
 */

// A single localizable image item (named type so image fields can be overridden)
export const localizableImage = defineType({
	name: "localizableImage",
	title: "Image (localizable)",
	type: "image",
	options: { hotspot: true },
	fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
});

// A per-locale image gallery (array of named image items with alt text)
export const localizableImageGallery = defineType({
	name: "localizableImageGallery",
	title: "Image Gallery (localizable)",
	type: "array",
	of: [{ type: "localizableImage" }],
});

// Per-locale stats list for statsGridBlock — items have { value, name }
export const localizableStatsGrid = defineType({
	name: "localizableStatsGrid",
	title: "Stats Grid (localizable)",
	type: "array",
	of: [
		defineArrayMember({
			type: "object",
			fields: [
				defineField({ name: "value", title: "Value", type: "string" }),
				defineField({ name: "name", title: "Label", type: "string" }),
			],
			preview: {
				select: { title: "value", subtitle: "name" },
			},
		}),
	],
});

// Per-locale stats list for imageTilesWithTextBlock — items have { value, label }
export const localizableStatsTile = defineType({
	name: "localizableStatsTile",
	title: "Stats Tile (localizable)",
	type: "array",
	of: [
		defineArrayMember({
			type: "object",
			fields: [
				defineField({
					name: "value",
					title: "Stat Value",
					type: "string",
					description: "e.g. £193bn, 77%, 49.6M",
				}),
				defineField({ name: "label", title: "Stat Label", type: "string" }),
			],
			preview: {
				select: { title: "value", subtitle: "label" },
			},
		}),
	],
});

// Per-locale logo list for memberLogosBlock — items have { name, logo }
export const localizableLogoList = defineType({
	name: "localizableLogoList",
	title: "Logo List (localizable)",
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
});

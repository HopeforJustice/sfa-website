import { createElement } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { IconPicker } from "../components/IconPicker";
import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

function resolveIcon(iconValue) {
	if (!iconValue) return null;
	if (iconValue.includes(":")) {
		const [variant, name] = iconValue.split(":");
		const set = variant === "solid" ? SolidIcons : OutlineIcons;
		return set[name] ?? null;
	}
	return OutlineIcons[iconValue] ?? SolidIcons[iconValue] ?? null;
}

const menuItem = defineArrayMember({
	type: "object",
	title: "Menu Item",
	fields: [
		defineField({ name: "name", title: "Name", type: "string" }),
		defineField({ name: "description", title: "Description", type: "string" }),
		defineField({ name: "href", title: "URL", type: "string" }),
		defineField({
			name: "icon",
			title: "Icon",
			type: "string",
			components: {
				input: IconPicker,
			},
		}),
	],
	preview: {
		select: { title: "name", subtitle: "description", icon: "icon" },
		prepare({ title, subtitle, icon }) {
			const Icon = resolveIcon(icon);
			const media = Icon
				? () =>
						createElement(
							"div",
							{
								style: {
									background: "white",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "100%",
									height: "100%",
								},
							},
							createElement(Icon, {
								style: { width: 20, height: 20, color: "#374151" },
							}),
						)
				: undefined;
			return {
				title: title || "Untitled Item",
				subtitle,
				media,
			};
		},
	},
});

const column = defineArrayMember({
	type: "object",
	title: "Column",
	fields: [
		defineField({ name: "title", title: "Column Title", type: "string" }),
		defineField({
			name: "items",
			title: "Items",
			type: "array",
			of: [menuItem],
		}),
	],
	preview: {
		select: { title: "title" },
		prepare({ title }) {
			return { title: title || "Untitled Column" };
		},
	},
});

export const navigationType = defineType({
	name: "navigation",
	title: "Navigation",
	type: "document",
	__experimental_actions: ["update", "publish"],
	preview: {
		prepare() {
			return { title: "Navigation" };
		},
	},
	fields: [
		defineField({
			name: "items",
			title: "Nav Items",
			type: "array",
			of: [
				// Simple link
				defineArrayMember({
					name: "navLink",
					type: "object",
					title: "Link",
					fields: [
						defineField({ name: "title", title: "Title", type: "string" }),
						defineField({ name: "href", title: "URL", type: "string" }),
					],
					preview: {
						select: { title: "title" },
						prepare({ title }) {
							return { title: title || "Untitled Link", subtitle: "Link" };
						},
					},
				}),
				// Button
				defineArrayMember({
					name: "navButton",
					type: "object",
					title: "Button",
					fields: [
						defineField({ name: "title", title: "Title", type: "string" }),
						defineField({ name: "href", title: "URL", type: "string" }),
					],
					preview: {
						select: { title: "title" },
						prepare({ title }) {
							return { title: title || "Untitled Button", subtitle: "Button" };
						},
					},
				}),
				// Flyout menu (1 column = flyout, 2+ columns = multi-column)
				defineArrayMember({
					name: "navFlyout",
					type: "object",
					title: "Flyout Menu",
					fields: [
						defineField({ name: "title", title: "Title", type: "string" }),
						defineField({
							name: "columns",
							title: "Columns",
							type: "array",
							of: [column],
							validation: (Rule) => Rule.min(1).max(3),
						}),
					],
					preview: {
						select: { title: "title", columns: "columns" },
						prepare({ title, columns }) {
							const count = columns?.length ?? 0;
							return {
								title: title || "Untitled Flyout",
								subtitle: `Flyout Menu – ${count} column${count === 1 ? "" : "s"}`,
							};
						},
					},
				}),
			],
		}),
	],
});

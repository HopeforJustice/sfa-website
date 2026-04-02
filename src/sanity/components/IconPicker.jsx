"use client";

import { set, unset } from "sanity";
import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";
import { useState } from "react";

const toTitle = (name) =>
	name
		.replace(/Icon$/, "")
		.replace(/([A-Z])/g, " $1")
		.trim();

const outlineIcons = Object.entries(OutlineIcons).map(([name, Component]) => ({
	title: toTitle(name),
	value: `outline:${name}`,
	Component,
}));

const solidIcons = Object.entries(SolidIcons).map(([name, Component]) => ({
	title: toTitle(name),
	value: `solid:${name}`,
	Component,
}));

export function IconPicker({ value, onChange }) {
	const [search, setSearch] = useState("");
	const [variant, setVariant] = useState("outline");

	const icons = variant === "outline" ? outlineIcons : solidIcons;

	const filtered = icons.filter((icon) =>
		icon.title.toLowerCase().includes(search.toLowerCase()),
	);

	const handleSelect = (iconValue) => {
		if (iconValue === value) {
			onChange(unset());
		} else {
			onChange(set(iconValue));
		}
	};

	const selectedTitle =
		value &&
		[...outlineIcons, ...solidIcons].find((i) => i.value === value)?.title;

	return (
		<div style={{ fontFamily: "sans-serif" }}>
			{/* Search & variant toggle */}
			<div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
				<input
					type="text"
					placeholder="Search icons…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					style={{
						flex: 1,
						padding: "6px 10px",
						border: "1px solid #ccc",
						borderRadius: 4,
						fontSize: 13,
					}}
				/>
				{["outline", "solid"].map((v) => (
					<button
						key={v}
						type="button"
						onClick={() => setVariant(v)}
						style={{
							padding: "6px 14px",
							border: "none",
							borderRadius: 4,
							cursor: "pointer",
							fontSize: 13,
							background: variant === v ? "#0f6fec" : "#e5e7eb",
							color: variant === v ? "#fff" : "#111",
							fontWeight: variant === v ? 600 : 400,
						}}
					>
						{v.charAt(0).toUpperCase() + v.slice(1)}
					</button>
				))}
			</div>

			{/* Current selection */}
			{value ? (
				<div
					style={{
						marginBottom: 8,
						fontSize: 12,
						display: "flex",
						alignItems: "center",
						gap: 6,
					}}
				>
					<span>Selected:</span>
					<strong>{selectedTitle}</strong>
					<span style={{ color: "#999" }}>({value})</span>
					<button
						type="button"
						onClick={() => onChange(unset())}
						style={{
							marginLeft: 4,
							padding: "1px 7px",
							border: "none",
							borderRadius: 3,
							cursor: "pointer",
							fontSize: 12,
							background: "#f9f9f9",
							color: "#555",
						}}
					>
						Clear
					</button>
				</div>
			) : (
				<div style={{ marginBottom: 8, fontSize: 12, color: "#999" }}>
					No icon selected
				</div>
			)}

			{/* Icon grid */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
					gap: 6,
					maxHeight: 420,
					overflowY: "auto",
					border: "1px solid #e5e7eb",
					borderRadius: 6,
					padding: 8,
					background: "#fafafa",
				}}
			>
				{filtered.length === 0 && (
					<div
						style={{
							gridColumn: "1 / -1",
							textAlign: "center",
							padding: 24,
							color: "#999",
							fontSize: 13,
						}}
					>
						No icons match &ldquo;{search}&rdquo;
					</div>
				)}
				{filtered.map(({ title, value: iconValue, Component }) => {
					const selected = value === iconValue;
					return (
						<button
							key={iconValue}
							type="button"
							title={title}
							onClick={() => handleSelect(iconValue)}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								padding: "8px 4px 6px",
								border: `2px solid ${selected ? "#0f6fec" : "transparent"}`,
								borderRadius: 6,
								background: selected ? "#dbeafe" : "transparent",
								cursor: "pointer",
								gap: 4,
								transition: "border-color 0.1s, background 0.1s",
							}}
						>
							<Component
								style={{
									width: 22,
									height: 22,
									color: selected ? "#0f6fec" : "#374151",
								}}
							/>
							<span
								style={{
									fontSize: 9,
									textAlign: "center",
									wordBreak: "break-word",
									lineHeight: 1.2,
									color: selected ? "#0f6fec" : "#6b7280",
									maxWidth: 64,
								}}
							>
								{title}
							</span>
						</button>
					);
				})}
			</div>

			<div
				style={{
					marginTop: 6,
					fontSize: 11,
					color: "#aaa",
					textAlign: "right",
				}}
			>
				{filtered.length} icon{filtered.length !== 1 ? "s" : ""}
			</div>
		</div>
	);
}

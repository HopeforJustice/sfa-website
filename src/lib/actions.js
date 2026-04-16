"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SUPPORTED_LOCALES = ["en", "en-US"];

export async function setLocale(locale, path) {
	if (!SUPPORTED_LOCALES.includes(locale)) {
		return;
	}
	const cookieStore = await cookies();
	cookieStore.set("locale_preference", locale, {
		maxAge: 60 * 60 * 24 * 365,
		path: "/",
		sameSite: "lax",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	redirect(path);
}

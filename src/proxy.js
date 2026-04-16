import { NextResponse } from "next/server";

export default function proxy(request) {
	const cookieHeader = request.headers.get("cookie") ?? "";
	const cookieLocale = cookieHeader
		.split(";")
		.map((c) => c.trim())
		.find((c) => c.startsWith("locale_preference="))
		?.split("=")[1];

	let locale;
	if (cookieLocale === "en" || cookieLocale === "en-US") {
		locale = cookieLocale;
	} else {
		const country = request.headers.get("x-vercel-ip-country") ?? "";
		locale = country === "US" ? "en-US" : "en";
	}

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-locale", locale);

	return NextResponse.next({
		request: { headers: requestHeaders },
	});
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|studio).*)"],
};

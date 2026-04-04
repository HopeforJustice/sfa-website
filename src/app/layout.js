import { draftMode } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SanityLive } from "../sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";

export const metadata = {
	title: "Slave-Free Alliance",
	description: "Increase your resilience to modern slavery",
};

export default async function RootLayout({ children }) {
	const { isEnabled: isDraftMode } = await draftMode();
	return (
		<html lang="en">
			<head>
				<link rel="stylesheet" href="https://use.typekit.net/dlv0xph.css" />
				<script async src="https://player.vimeo.com/api/player.js"></script>
			</head>
			<body className={`antialiased overflow-x-hidden bg-white`}>
				<Header />
				<div className="">{children}</div>
				<Footer />
				<SanityLive />
				{isDraftMode && <VisualEditing />}
			</body>
		</html>
	);
}

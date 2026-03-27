import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
	title: "Slave-Free Alliance",
	description: "Increase your resilience to modern slavery",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="stylesheet" href="https://use.typekit.net/dlv0xph.css" />
				<script async src="https://player.vimeo.com/api/player.js"></script>
			</head>
			<body className={`antialiased overflow-x-hidden w-[100vw]`}>
				<Header />
				<div className="overflow-x-hidden">{children}</div>
				<Footer />
			</body>
		</html>
	);
}

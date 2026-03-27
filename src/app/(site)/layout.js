import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SiteLayout({ children }) {
	return (
		<>
			<Header />
			<div className="overflow-x-hidden">{children}</div>
			<Footer />
		</>
	);
}

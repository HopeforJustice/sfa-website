import HeroDefault from "./HeroDefault";
import HeroImageColumns from "./HeroImageColumns";

export default function Hero({ data, documentId, documentType }) {
	if (!data) return null;

	const props = { data, documentId, documentType };

	if (data.style === "imageColumns") {
		return <HeroImageColumns {...props} />;
	}

	return <HeroDefault {...props} />;
}

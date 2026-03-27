import MemberLogos from "../../components/MemberLogos";
import ImageTilesWithText from "../../components/ImageTilesWithText";
import Quote from "../../components/Quote";
import VideoWithText from "../../components/VideoWithText";
import ImageWithText from "../../components/ImageWithText";
import Hero from "../../components/Hero";

export default function Home() {
	return (
		<>
			<Hero />
			<ImageTilesWithText />
			<VideoWithText />
			<MemberLogos />
			<Quote />
			<ImageWithText />
		</>
	);
}

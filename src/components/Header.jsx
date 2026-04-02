import Logo from "./Logo";
import Nav from "./Nav";
import Container from "./Container";
import { sanityFetch } from "../sanity/lib/live";
import { NAV_QUERY } from "../sanity/lib/queries";

export default async function Header() {
	const { data: navData } = await sanityFetch({ query: NAV_QUERY });

	return (
		<>
			<div className="py-5 lg:py-8 w-full text-white absolute top-0">
				<Container>
					<div className="flex justify-between">
						<div className="inline-block w-56 pr-4">
							<Logo />
						</div>

						<Nav data={navData} />
					</div>
				</Container>
			</div>
		</>
	);
}

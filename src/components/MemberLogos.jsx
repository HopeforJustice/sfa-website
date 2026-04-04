import Container from "./Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import placeholderImage from "@/app/img/placeholder.svg";

export default function MemberLogos({ data }) {
	if (!data) return null;

	const { heading, logos } = data;

	if (!logos?.length) return null;

	return (
		<div className="bg-white py-4 sm:py-8">
			<Container>
				<div>
					{heading && (
						<h2 className="text-2xl font-bold mb-8 text-sfa-blue">{heading}</h2>
					)}
				</div>
				<div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-4">
					{logos.map((member) => (
						<div
							key={member.name}
							className="bg-sfa-blue-100 p-8 sm:p-10 flex items-center"
						>
							{member.logo?.asset && (
								<Image
									alt={member.name || ""}
									src={urlFor(member.logo).width(316).height(112).url()}
									width={158}
									height={56}
									className="max-h-14 w-full object-contain"
								/>
							)}
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

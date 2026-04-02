import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function Quote({ data }) {
	if (!data) return null;

	const { companyLogo, quote, personImage, personName, personRole } = data;

	return (
		<section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="mx-auto max-w-2xl lg:max-w-4xl">
				{companyLogo?.asset && (
					<Image
						alt={companyLogo.alt || ""}
						src={urlFor(companyLogo).height(48).url()}
						width={158}
						height={48}
						className="mx-auto h-12 w-auto"
					/>
				)}
				{quote && (
					<figure className="mt-10">
						<blockquote className="text-center text-xl/8 font-semibold text-sfa-blue sm:text-2xl/9">
							<p>&quot;{quote}&quot;</p>
						</blockquote>
						<figcaption className="mt-10">
							{personImage?.asset && (
								<Image
									alt={personImage.alt || personName || ""}
									src={urlFor(personImage).width(80).height(80).url()}
									width={80}
									height={80}
									className="mx-auto size-20 rounded-full"
								/>
							)}
							<div className="mt-4 flex flex-col max-w-lg text-center text-balance mx-auto items-center justify-center space-x-3 text-base">
								{personName && (
									<div className="font-semibold text-sfa-blue-600">
										{personName}
									</div>
								)}
								{personRole && (
									<div className="text-sfa-blue-600">{personRole}</div>
								)}
							</div>
						</figcaption>
					</figure>
				)}
			</div>
		</section>
	);
}

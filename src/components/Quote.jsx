import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function Quote({ data }) {
	if (!data) return null;

	const { companyLogo, quote, personImage, personName, personRole } = data;

	return (
		<section className="relative isolate overflow-hidden bg-white px-6 lg:px-8">
			<div className="mx-auto max-w-2xl lg:max-w-4xl">
				{companyLogo?.asset && (
					<img
						alt={companyLogo.alt || ""}
						src={urlFor(companyLogo).fit("max").width(300).url()}
						className="mx-auto max-h-20 w-auto max-w-[200px]"
					/>
				)}
				{quote && (
					<figure className="mt-10">
						<blockquote className="text-center text-xl/8 font-semibold text-sfa-blue sm:text-2xl/9">
							<p>{quote}</p>
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

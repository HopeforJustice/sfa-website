import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import { urlFor } from "@/sanity/lib/image";

export default function ImageWithText({ data }) {
	if (!data) return null;

	const { eyebrow, heading, body, button, image } = data;

	return (
		<div className="overflow-hidden mb-20">
			<Container>
				<div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
					<div className="px-6 lg:px-0">
						<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
							{eyebrow && (
								<h2 className="text-base/7 font-semibold text-sfa-orange">
									{eyebrow}
								</h2>
							)}
							{heading && (
								<p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
									{heading}
								</p>
							)}
							{body && (
								<p className="mt-6 text-lg/8 text-gray-600 mb-10">{body}</p>
							)}
							{button?.text && (
								<Button buttonText={button.text} href={button.href || "#"} />
							)}
						</div>
					</div>
					{image?.asset && (
						<div className="sm:px-6 lg:px-0">
							<div className="rounded-xl overflow-hidden mx-auto max-w-2xl sm:mx-0 sm:w-full">
								<Image
									alt={image.alt || ""}
									src={urlFor(image).width(800).url()}
									width={800}
									height={600}
									className="-mb-12 w-full max-w-none bg-gray-800 ring-1 ring-white/10"
								/>
							</div>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
}

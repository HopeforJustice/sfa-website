import Container from "./Container";
import Image from "next/image";
import Button from "./Button";
import { urlFor } from "@/sanity/lib/image";

// Tile offset classes alternate for the mosaic effect
const tileOffsets = ["", "-mt-8 lg:-mt-40", "", "-mt-8 lg:-mt-40"];

export default function ImageTilesWithText({ data }) {
	if (!data) return null;

	const { heading, body, subheading, subheadingBody, button, images, stats } =
		data;

	return (
		<div className="overflow-hidden bg-white py-24 sm:py-32">
			<Container>
				<div className="max-w-4xl">
					{heading && (
						<h1 className="mt-2 text-4xl font-semibold tracking-tight text-sfa-blue sm:text-5xl text-balance">
							{heading}
						</h1>
					)}
					{body && (
						<p className="mt-6 text-balance text-xl/8 text-sfa-blue-600">
							{body}
						</p>
					)}
				</div>
				<section className="mt-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
					<div className="lg:pr-8">
						{subheading && (
							<h2 className="text-pretty text-2xl font-semibold tracking-tight text-sfa-blue">
								{subheading}
							</h2>
						)}
						{subheadingBody && (
							<p className="mt-6 text-lg text-sfa-blue-500 mb-10">
								{subheadingBody}
							</p>
						)}
						{button?.text && (
							<Button
								buttonText={button.text}
								href={button.href || "#"}
								type="primary"
							/>
						)}
					</div>
					{images?.length > 0 && (
						<div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
							<div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
								{images.slice(0, 4).map((img, i) => (
									<div
										key={img._key || i}
										className={`aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 ${tileOffsets[i] || ""}`}
									>
										<Image
											alt={img.alt || ""}
											src={urlFor(img).width(400).height(400).url()}
											width={400}
											height={400}
											className="block size-full object-cover"
										/>
									</div>
								))}
							</div>
						</div>
					)}
					{stats?.length > 0 && (
						<div className="max-lg:mt-16 lg:col-span-1">
							<p className="text-xl font-bold text-sfa-blue">
								Modern slavery statistics
							</p>
							<hr className="mt-6 border-t border-gray-200" />
							<dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
								{stats.map((stat, i) => (
									<div
										key={i}
										className={`flex flex-col gap-y-2 pb-4 ${
											i < stats.length - 2
												? "border-b border-dotted border-gray-200"
												: "max-sm:border-b max-sm:border-dotted max-sm:border-gray-200"
										}`}
									>
										<dt className="text-sm/6 text-sfa-blue-600 text-balance">
											{stat.label}
										</dt>
										<dd className="order-first text-5xl font-semibold tracking-tight">
											{stat.value}
										</dd>
									</div>
								))}
							</dl>
						</div>
					)}
				</section>
			</Container>
		</div>
	);
}

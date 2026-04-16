import Container from "./Container";

export default function TwoColText({ data }) {
	if (!data) return null;

	const { eyebrow, heading, body } = data;

	const paragraphs = body
		? body
				.split("\n")
				.map((p) => p.trim())
				.filter(Boolean)
		: [];

	const mid = Math.ceil(paragraphs.length / 2);
	const leftCol = paragraphs.slice(0, mid);
	const rightCol = paragraphs.slice(mid);

	return (
		<div className="bg-white">
			<Container>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
						{eyebrow && (
							<p className="text-base/7 font-semibold text-sfa-orange">
								{eyebrow}
							</p>
						)}
						{heading && (
							<h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
								{heading}
							</h2>
						)}
						<div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2">
							<div>
								{leftCol.map((paragraph, i) => (
									<p key={i} className={i > 0 ? "mt-8" : undefined}>
										{paragraph}
									</p>
								))}
							</div>
							<div>
								{rightCol.map((paragraph, i) => (
									<p key={i} className={i > 0 ? "mt-8" : undefined}>
										{paragraph}
									</p>
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

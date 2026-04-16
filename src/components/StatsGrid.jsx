import Container from "./Container";

const FALLBACK_STATS = [
	{ value: "49.6M", name: "Stat label one" },
	{ value: "77%", name: "Stat label two" },
	{ value: "£193B", name: "Stat label three" },
	{ value: "5,500+", name: "Stat label four" },
];

export default function StatsGrid({ data }) {
	const { heading, body, stats } = data;

	const resolvedHeading = heading ?? "Section heading";
	const resolvedBody = body ?? "Supporting description text goes here.";
	const resolvedStats = stats ?? FALLBACK_STATS;

	return (
		<div>
			<Container>
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<div className="text-center mb-16 max-w-4xl mx-auto">
						<h2 className="text-balance text-4xl font-semibold tracking-tight text-sfa-blue sm:text-5xl">
							{resolvedHeading}
						</h2>
						<p className="mt-4 text-lg/8 text-sfa-blue-600">{resolvedBody}</p>
					</div>
					<dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
						{resolvedStats.map((stat, i) => (
							<div key={i} className="flex flex-col bg-gray-400/5 p-8">
								<dt className="text-sm/6 font-semibold text-sfa-blue-600">
									{stat.name}
								</dt>
								<dd className="order-first text-3xl font-semibold tracking-tight text-sfa-orange mb-2">
									{stat.value}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</Container>
		</div>
	);
}

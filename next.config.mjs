/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/admin",
				destination: "https://sfa-website.sanity.studio",
				permanent: false,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
};

export default nextConfig;

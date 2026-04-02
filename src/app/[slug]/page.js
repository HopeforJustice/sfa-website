import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export async function generateStaticParams() {
	const { data: pages } = await sanityFetch({
		query: PAGE_SLUGS_QUERY,
	});

	return (pages ?? []).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const { data: page } = await sanityFetch({
		query: PAGE_QUERY,
		params: { slug },
	});

	if (!page) return {};

	return {
		title: page.title,
	};
}

export default async function Page({ params }) {
	const { slug } = await params;

	// "home" is reserved for the root / route
	if (slug === "home") notFound();

	const { data: page } = await sanityFetch({
		query: PAGE_QUERY,
		params: { slug },
	});

	if (!page) notFound();

	return (
		<PageBuilder
			blocks={page?.pageBuilder}
			documentId={page?._id}
			documentType="page"
		/>
	);
}

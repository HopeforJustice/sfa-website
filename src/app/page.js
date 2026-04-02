import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export default async function Home() {
	const { data: page } = await sanityFetch({
		query: PAGE_QUERY,
		params: { slug: "home" },
	});

	return (
		<PageBuilder
			blocks={page?.pageBuilder}
			documentId={page?._id}
			documentType="page"
		/>
	);
}

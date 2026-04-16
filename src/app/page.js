import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";
import { getLocale } from "@/lib/locale";

export default async function Home() {
	const locale = await getLocale();
	const { data: page } = await sanityFetch({
		query: PAGE_QUERY,
		params: { slug: "home", locale, baseLocale: "en" },
	});

	return (
		<PageBuilder
			blocks={page?.pageBuilder}
			documentId={page?._id}
			documentType="page"
		/>
	);
}

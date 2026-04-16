/**
 * Resolves the href from a link object that may contain either an external URL
 * or an internal page reference.
 *
 * @param {object} link - The link object with linkType, href, and/or pageRef
 * @returns {string} The resolved URL
 */
export function resolveHref(link) {
	if (!link) return "#";
	if (link.linkType === "page" && link.pageRef?.slug) {
		const slug = link.pageRef.slug;
		return slug === "home" ? "/" : `/${slug}`;
	}
	return link.href || "#";
}

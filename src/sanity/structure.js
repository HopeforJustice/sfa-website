// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
	S.list()
		.title("Website content")
		.items([
			S.listItem()
				.title("Pages")
				.child(
					S.documentTypeList("page").title("Pages"),
				),
			S.divider(),
			S.listItem()
				.title("Navigation")
				.child(S.document().schemaType("navigation").documentId("navigation")),
		]);

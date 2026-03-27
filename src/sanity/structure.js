// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
	S.list()
		.title("Website content")
		.items([
			S.documentTypeListItem("page").title("Pages"),
			S.documentTypeListItem("event").title("Events"),
			S.documentTypeListItem("artist").title("Artists"),
			S.documentTypeListItem("venue").title("Venues"),
		]);

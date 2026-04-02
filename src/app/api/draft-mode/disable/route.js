import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
	const draftModeStore = await draftMode();
	draftModeStore.disable();
	const { searchParams } = new URL(request.url);
	const redirectUrl = searchParams.get("redirect") || "/";
	redirect(redirectUrl);
}

import StatsGrid from "@/components/StatsGrid";
import TwoColText from "@/components/TwoColText";

export default async function Test() {
	return (
		<>
			<style>{`
			#header, #footer {
				display: none;
			}
			`}</style>
			<div>
				<TwoColText
					data={{
						eyebrow: "Eyebrow label",
						heading: "Section heading",
						body: "This is paragraph one. It will appear in the left column.\nThis is paragraph two. It will also appear in the left column.\nThis is paragraph three. It will appear in the right column.\nThis is paragraph four. It will also appear in the right column.",
					}}
				/>
			</div>
		</>
	);
}

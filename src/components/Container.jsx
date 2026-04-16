import clsx from "clsx";

export default function Container({ children, allowFullWidth = false }) {
	return (
		<div
			className={clsx(
				"mx-auto max-w-7xl lg:px-8",
				allowFullWidth ? "px-0 sm:px-6" : "px-6 ",
			)}
		>
			<div className="mx-auto max-w-7xl">{children}</div>
		</div>
	);
}

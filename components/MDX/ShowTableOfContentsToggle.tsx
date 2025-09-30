"use client";

import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { LocalStorageKey, useLocalStorage } from "@/hooks/useLocalStorage";

const ShowTableOfContentsToggle = () => {
	const [isTocHidden, setIsTocHidden] = useLocalStorage<boolean>(
		LocalStorageKey.ShowTableOfContentsOnMobile,
		false,
	);
	const isLargeScreen = useIsLargeScreen();

	if (isLargeScreen) {
		return null;
	}

	return (
		<div className="block text-center mb-20">
			<small
				className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer"
				onClick={() => {
					setIsTocHidden(s => !s);
				}}
			>
				{isTocHidden
					? "Show table of contents"
					: "Hide table of contents"}
			</small>
		</div>
	);
};

export default ShowTableOfContentsToggle;

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

	if (!isTocHidden) {
		return <div className="mt-10">&nbsp;</div>;
	}

	return (
		<div className="block text-center">
			<small
				className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer"
				onClick={() => {
					setIsTocHidden(false);
				}}
			>
				Show table of contents
			</small>
		</div>
	);
};

export default ShowTableOfContentsToggle;

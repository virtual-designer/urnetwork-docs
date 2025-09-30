"use client";

import { LocalStorageKey, useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@mui/material";
import clsx from "clsx";
import { FC, Fragment, PointerEvent, useCallback, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import TableOfContents from "./TableOfContents";

const MobileTableOfContentsWrapper: FC = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isTocHidden] = useLocalStorage<boolean>(
		LocalStorageKey.ShowTableOfContentsOnMobile,
		false,
	);

	const toggleIsExpanded = useCallback((event: PointerEvent) => {
		setIsExpanded(s => !s);
		event.stopPropagation();
	}, [setIsExpanded]);

	if (isTocHidden) {
		return null;
	}

	return (
		<div className="fixed bottom-0 md:hidden block z-[900]" onPointerUp={toggleIsExpanded}>
			<div className="bg-neutral-800/20 backdrop-blur-2xl m-3 px-2 py-3 rounded-lg shadow shadow-white/40 overflow-x-hidden w-[calc(100vw-1.5rem)]">
				<div className="pl-3 pr-2 flex items-center justify-between relative">
					<h4 className="uppercase font-bold tracking-wider text-[15px]">
						On this page
					</h4>
					<div className="flex gap-1 items-center">
						<Button
							className="!min-w-0 !text-white !text-base"
							 onPointerUp={toggleIsExpanded}
						>
							{isExpanded ? <HiChevronDown /> : <HiChevronUp />}
						</Button>
					</div>
				</div>

				<div
					className={clsx("[transition:ease_0.2s]", {
						"max-h-0 overflow-y-hidden": !isExpanded,
						"max-h-[40vh] overflow-y-scroll": isExpanded,
					})}
					onPointerDown={e => e.stopPropagation()}
				>
					<TableOfContents mobileMode as={Fragment} />
				</div>
			</div>
		</div>
	);
};

export default MobileTableOfContentsWrapper;

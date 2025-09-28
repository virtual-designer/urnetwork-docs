"use client";

import { LocalStorageKey, useLocalStorage } from "@/hooks/useLocalStorage";
import { Button, Tooltip } from "@mui/material";
import clsx from "clsx";
import { FC, Fragment, useCallback, useState } from "react";
import { HiChevronDown, HiChevronUp, HiOutlineXCircle } from "react-icons/hi2";
import TableOfContents from "./TableOfContents";

const MobileTableOfContentsWrapper: FC = () => {
	const [isExpanded, setIsExpanded] = useState(false);
    const [isTocHidden, setIsTocHidden] = useLocalStorage<boolean>(LocalStorageKey.ShowTableOfContentsOnMobile, false);

	const toggleIsExpanded = useCallback(() => {
		setIsExpanded(s => !s);
	}, [setIsExpanded]);

	const hideToc = useCallback(() => {
		setIsTocHidden(true);
	}, [setIsTocHidden]);

    if (isTocHidden) {
        return null;
    }

	return (
		<div className="fixed bottom-0 md:hidden bg-neutral-800/20 backdrop-blur-2xl m-3 px-2 py-3 rounded-lg shadow shadow-white/40 z-[900] overflow-x-hidden block w-[calc(100vw-1.5rem)]">
			<div className="pl-3 pr-2 flex items-center justify-between">
				<h4 className="uppercase font-bold tracking-wider text-[15px]">
					On this page
				</h4>

				<div className="flex gap-1 items-center">
					<Tooltip title="Hide this">
						<Button
							className="!min-w-0 !text-white !text-base"
							onClick={hideToc}
						>
							<HiOutlineXCircle />
						</Button>
					</Tooltip>

					<Button
						className="!min-w-0 !text-white !text-base"
						onClick={toggleIsExpanded}
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
			>
				<TableOfContents mobileMode as={Fragment} />
			</div>
		</div>
	);
};

export default MobileTableOfContentsWrapper;

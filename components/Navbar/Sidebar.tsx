"use client";

import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { useAppStore } from "@/store/AppStore";
import styles from "@/styles/Sidebar.module.css";
import { getPageTree } from "@/utils/pages";
import clsx from "clsx";
import { useEffect } from "react";
import SidebarItem from "./SidebarItem";

type SidebarProps = {
	expanded?: boolean;
	desktopOnly?: boolean;
	fragment?: boolean;
	onNavigate?: () => void;
};

export default function Sidebar({
	expanded,
	desktopOnly = false,
	fragment = false,
	onNavigate,
}: SidebarProps) {
	const isLargeScreen = useIsLargeScreen();
	const isSidebarExpanded = useAppStore(state => state.isSidebarExpanded);
	const setIsSidebarToggleVisible = useAppStore(state => state.setIsSidebarToggleVisible);

	useEffect(() => {
		if (desktopOnly) {
			setIsSidebarToggleVisible(true)
		}
	}, [desktopOnly, setIsSidebarToggleVisible]);

	return (
		<>
			{fragment && (
				<div
					className={clsx({
						"hidden md:block": desktopOnly,
						"w-0": !isSidebarExpanded,
					})}
				></div>
			)}
			<div
				className={clsx(
					{
						[styles.scrollbarStyles]: isLargeScreen,
						"hidden md:block": desktopOnly,
					},
					"md:w-[25vw] lg:w-[20vw] xl:w-[20vw]",
					"max-md:absolute",
					{
						"max-md:left-[100vw]": !expanded,
						"max-md:left-0": expanded,
					},
					"[transition:ease_0.3s] max-md:w-full",
					"md:[border-right:1px_solid_#222] md:h-[92vh] md:max-h-[92vh] md:overflow-y-scroll md:fixed",
					{
						"md:left-0": isSidebarExpanded,
						"md:left-[-30vw]": !isSidebarExpanded,
					},
				)}
				id={desktopOnly ? "sidebarDesktop" : "sidebarMobile"}
			>
				<ul className="list-none m-3">
					{getPageTree().children.map(item => (
						<SidebarItem
							key={`${item.name}_${item.href}`}
							as="li"
							item={item}
							onNavigate={onNavigate}
						/>
					))}
				</ul>
			</div>
		</>
	);
}

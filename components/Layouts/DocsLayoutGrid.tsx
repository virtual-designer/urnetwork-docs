"use client";

import { useAppStore } from "@/store/AppStore";
import clsx from "clsx";
import { FC, ReactNode } from "react";

type DocsLayoutGridProps = {
	children: ReactNode;
};

const DocsLayoutGrid: FC<DocsLayoutGridProps> = ({ children }) => {
	const isSidebarExpanded = useAppStore(state => state.isSidebarExpanded);

	return (
		<div
			className={clsx(
				"grid md:grid-cols-[4fr_8fr_4fr] md:gap-[25px] lg:gap-[50px] mb-10 relative [transition:ease_0.3s]",
				{
					"lg:grid-cols-[3fr_10fr_3.8fr]": isSidebarExpanded,
					"lg:grid-cols-[0fr_10fr_3.8fr]": !isSidebarExpanded,
				},
			)}
			id="docs_layout_root"
		>
			{children}
		</div>
	);
};

export default DocsLayoutGrid;

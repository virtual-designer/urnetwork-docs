import { Box } from "@mui/material";
import { Fragment, PropsWithChildren } from "react";
import PoweredByFooter from "../Branding/PoweredByFooter";
import MobileTableOfContentsWrapper from "../MDX/MobileTableOfContentsWrapper";
import PageInfo from "../MDX/PageInfo";
import ShowTableOfContentsToggle from "../MDX/ShowTableOfContentsToggle";
import TableOfContents from "../MDX/TableOfContents";
import Sidebar from "../Navbar/Sidebar";
import Navigator from "../Navigation/Navigator";
import TreeBreadcrumbNavigation from "../Navigation/TreeBreadcrumbNavigation";
import DocsLayoutGrid from "./DocsLayoutGrid";

export default function DocsLayout({ children }: PropsWithChildren) {
	return (
		<DocsLayoutGrid>
			<Sidebar desktopOnly fragment />

			<div className="lg:px-[50px] xl:px-[100px] lg:max-w-[60vw]">
				<MobileTableOfContentsWrapper />

				<div className="m-3">
					<TreeBreadcrumbNavigation />
				</div>

				<article
					id="article"
					className="prose prose-neutral prose-invert prose-code:before:hidden prose-code:after:hidden mt-8 p-3 text-wrap max-w-[100vw] relative"
				>
					{children}
				</article>
				<br />
				<div className="mx-3">
					<Navigator />
					<hr className="[border-top:1px_solid_#333] mb-5" />
					<PageInfo />
				</div>
				<br />
				<div className="mx-3 mt-5">
					<PoweredByFooter />
					<ShowTableOfContentsToggle />
				</div>
			</div>

			<Box
				className="hidden md:block mr-5 max-h-[calc(100vh-4rem)] overflow-y-scroll pb-8 relative"
				sx={{
					scrollbarWidth: 0,
					"::-webkit-scrollbar": {
						display: "none",
					},
				}}
			>
				<div className="fixed">
					<TableOfContents as={Fragment} />
				</div>
			</Box>
		</DocsLayoutGrid>
	);
}

import Link from "@/components/Navigation/Link";
import useActualPathname from "@/hooks/useActualPathname";
import styles from "@/styles/SidebarItem.module.css";
import { Page } from "@/types/Tree";
import { flatten, resolveDocsURL } from "@/utils/pages";
import { getTitle } from "@/utils/utils";
import { Button } from "@mui/material";
import {
    JSX,
    SyntheticEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { MdExpandMore } from "react-icons/md";

type SidebarItemProps = {
	as: keyof JSX.IntrinsicElements;
	item: Page;
	onNavigate?: () => void;
	level?: number;
};

export default function SidebarItem({
	as = "li",
	onNavigate,
	item,
	level = 0,
}: SidebarItemProps) {
	const pathname = useActualPathname();
	const flattenPages = useMemo(() => flatten([item]), [item]);

	const isDefaultExpanded = useCallback(
		(expanded: boolean = false): boolean => {
			return (
				expanded ||
				flattenPages?.some(page => {
					const link = page.type === "page" ? `${page.href}` : "#";

					return (
						(link === "/" && pathname === "/") ||
						(link !== "/" &&
							pathname !== "/" &&
							pathname.startsWith(link))
					);
				})
			);
		},
		[flattenPages, pathname],
	);

	const [expanded, setExpanded] = useState(isDefaultExpanded);

	useEffect(() => {
		setExpanded(isDefaultExpanded(expanded));
	}, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

	const toggle = (e: SyntheticEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setExpanded(s => !s);
	};

	const Root = as;
	const url = item.type === "page" ? `${item.href}` : undefined;
	const link = url ? resolveDocsURL(url) : "#";
	const LinkComponent = url ? Link : "a";
	const IconWrapperComponent = url === undefined ? "span" : Button;
	const name =
		item.data?.short_name ?? getTitle(item.data?.title) ?? item.title;
	const maxHeight = useMemo(
		() =>
			flattenPages.length *
			(50 +
				Math.max(
					flattenPages
						.map(p => (p.data?.short_name ?? p.title).length)
						.sort()[0] - 10,
					0,
				)),
		[flattenPages],
	);
	const sidebarSelectedIndex = useMemo(
		() =>
			item.children.findIndex(
				page =>
					item.type === "page" &&
					page.href &&
					resolveDocsURL(page.href) === pathname,
			),
		[item, pathname],
	);

	return (
		<Root
			className={`${styles.root}  ${
				pathname === link ? styles.active : ""
			} ${level ? styles.rootNested : ""} ${
				item.children?.length ? styles.rootWithChildren : ""
			}`}
		>
			<div className={`${styles.innerDiv}`}>
				<LinkComponent
					className={`${styles.anchor} ${level ? "ml-2" : ""}`}
					href={link}
					title={name}
					onClick={url !== undefined ? onNavigate : toggle}
					style={{
						paddingRight: 2,
					}}
				>
					<span>{name}</span>
					{!!item.children?.length && (
						<IconWrapperComponent
							onClick={toggle}
							style={{
								minWidth: 0,
								padding: 2,
								margin: 0,
								color: "white",
							}}
						>
							<MdExpandMore
								size={20}
								className={`${
									expanded ? "rotate-180" : ""
								} transition-[0.2s]`}
							/>
						</IconWrapperComponent>
					)}
				</LinkComponent>

				{!!item.children?.length && (
					<div
						className="ml-[13px] mt-2"
						style={{
							maxHeight: expanded ? `${maxHeight}px` : 0,
							transition: "0.2s",
							overflowY: "hidden",
						}}
					>
						<ul
							className={`list-none ${styles.children}`}
							style={{
								"--sidebar-selected-index":
									sidebarSelectedIndex,
							}}
						>
							{item.children.map(page => (
								<SidebarItem
									key={`${page.name}_${page.href}`}
									as="li"
									item={page}
									onNavigate={onNavigate}
									level={level + 1}
								/>
							))}
						</ul>
					</div>
				)}
			</div>
		</Root>
	);
}

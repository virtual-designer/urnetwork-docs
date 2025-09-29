"use client";

import useActualPathname from "@/hooks/useActualPathname";
import { getSubTree } from "@/utils/pages";
import clsx from "clsx";
import { FC, useMemo } from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import Link from "./Link";

const TreeBreadcrumbNavigation: FC = () => {
	const pathname = useActualPathname();
	const treePath = useMemo(() => {
		const result = getSubTree(pathname);

		if (result && result.length > 1) {
			const [first, ...others] = result;

			return [
				{
					...first,
					title: "Home",
				},
				...others,
			];
		}

		return null;
	}, [pathname]);

	if (!treePath?.length) {
		return;
	}

	return (
		<ol className="flex items-center flex-wrap gap-1">
			{treePath.map((pathEntry, index) => {
				const Component = pathEntry.type === "page" ? Link : "span";

				return (
					<li
						key={pathEntry.href}
						className="text-sm flex items-center gap-1"
					>
						{index > 0 && (
							<span>
								<HiOutlineChevronRight className="-mb-0.5" />
							</span>
						)}
						<Component
							href={pathEntry.href}
							title={pathEntry.title || pathEntry.name}
							className={clsx("hover:text-neutral-300", {
								"font-semibold underline":
									index === treePath.length - 1,
								"cursor-pointer": pathEntry.type === "page",
								"cursor-default": pathEntry.type !== "page",
							})}
						>
							{pathEntry.title || pathEntry.name}
						</Component>
					</li>
				);
			})}
		</ol>
	);
};

export default TreeBreadcrumbNavigation;

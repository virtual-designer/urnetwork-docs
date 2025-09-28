"use client";

import { DOCS_BRAND_NAME, BLOG_BRAND_NAME } from "@/config/config";
import { isBlogPath } from "@/utils/pages";
import { usePathname } from "next/navigation";

export const NavbarTitle = () => {
    const pathname = usePathname();

    return (
        <span className="desktop">
            {isBlogPath(pathname) ? BLOG_BRAND_NAME : DOCS_BRAND_NAME}
        </span>
    );
};

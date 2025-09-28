import { GITHUB_REPOSITORY } from "./config.ts";

/**
 * The base URL of this website.
 */
export const BASE_URL: string =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

type NavbarPageEntry = {
    name: string;
    url: string;
};

/**
 * List of pages shown in the Navbar (at the top).
 */
export const NAVBAR_PAGES: NavbarPageEntry[] = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "GitHub",
        url: `https://github.com/${GITHUB_REPOSITORY}`
    },
    {
        name: "About",
        url: '#'
    }
];

/**
 * Whether to list the root page in the sidebar.
 */
export const LIST_ROOT_PAGE_IN_SIDEBAR: boolean = true;

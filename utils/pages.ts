import { LIST_ROOT_PAGE_IN_SIDEBAR } from "@/config/links";
import index from "@/index.json";
import tree from "@/tree.json";
import { IndexEntry } from "@/types/IndexEntry";
import { Page, Tree } from "@/types/Tree";

const normalizedTree: Tree = {
	href: "/",
	hrefRelative: "",
	name: "[root]",
	title: "Root",
	children: [
		...(LIST_ROOT_PAGE_IN_SIDEBAR
			? [
					{
						...(tree[0] as Page),
						children: [],
					},
			  ]
			: []),
		...(tree.flatMap(p => p.children) as Page[]),
	],
};

export function getPageTree() {
	return normalizedTree;
}

export function flatten(pages: Page[] = getPageTree().children): Page[] {
	return pages.reduce<Page[]>((acc, page) => {
		if (page.children) {
			acc.push(page, ...flatten(page.children));
		} else {
			acc.push(page);
		}

		return acc;
	}, []);
}

export const isBlogPath = (path: string) => path.startsWith("/blog/");
export const resolveDocsURL = (url: string) => url;

let lowercasedIndex: IndexEntry[] = [];

export function getIndex(lowercased = false) {
	if (lowercased && lowercasedIndex.length === 0) {
		lowercasedIndex = index.map(e => ({
			contents: e.contents.toLowerCase(),
			title: e.title.toLowerCase(),
			frontmatter: e.frontmatter?.toLowerCase(),
			href: e.href.toLowerCase(),
			fs_path: e.fs_path,
		}));
	}

	return lowercased ? lowercasedIndex : index;
}

export function getSubTree(path: string, tree = normalizedTree) {
	const levels: Page[] = [tree];

	if (path === "/") {
		return levels;
	}

	for (const page of tree.children) {
		if (page.href === path) {
			levels.push(page);
			return levels;
		}

		if (page.children.length) {
			const subtree = getSubTree(path, page);

			if (subtree) {
				levels.push(...subtree);
				return levels;
			}
		}
	}

	return null;
}

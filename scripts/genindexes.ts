#!/usr/bin/env node

import { existsSync } from "fs";
import { cp, lstat, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import YAML from "yaml";
import { BASE_URL } from "../config/links.ts";
import {
	DirectoryMetadataSchema,
	type DirectoryMetadataType,
} from "../schemas/IndexSchema.ts";
import type { IndexEntry } from "../types/IndexEntry.ts";
import type { Page } from "../types/Tree.ts";

const rootDirectory = path.resolve(import.meta.dirname, "../app/(docs)");

function extractTitle(
	title:
		| string
		| { absolute?: string; template?: string; default?: string }
		| null
		| undefined,
) {
	return typeof title === "string"
		? title
		: title?.absolute ?? title?.template ?? title?.default ?? null;
}

async function scanDirectory(
	directory: string = rootDirectory,
	indexArray: IndexEntry[],
	sitemapEntryArray: SitemapEntry[],
): Promise<Page[]> {
	const files = await readdir(directory);
	const mainResult: Page = {
		title: "Untitled Page",
		children: [],
		href: "/#",
		hrefRelative: "#",
		name: "unnamed",
	};
	const results: Page[] = [];

	let directoryMetadataParsed: DirectoryMetadataType | null = null;
	const directoryFile = path.join(directory, "directory.ts");

	if (existsSync(directoryFile)) {
		const { default: directoryMetadataExported } = await import(
			directoryFile
		);
		const parseResult = DirectoryMetadataSchema.safeParse(
			directoryMetadataExported,
		);

		if (!parseResult.success) {
			console.error("%s: Invalid data exported", directoryFile);
			console.error(parseResult.error);
		} else {
			directoryMetadataParsed = parseResult.data;
		}
	}

	if (!directoryMetadataParsed?.thisPage?.title) {
		directoryMetadataParsed = {
			...directoryMetadataParsed,
			thisPage: {
				...directoryMetadataParsed?.thisPage,
				title: path
					.basename(directory)
					.replace(
						/([-_]*)([^-_]+)/g,
						(_, $1, $2) =>
							`${$1 ? " " : ""}${$2[0].toUpperCase()}${$2.slice(
								1,
							)}`,
					),
			},
		};
	}

	self: {
		const mdFilePath = path.join(directory, "page.md");
		const mdxFilePath = path.join(directory, "page.mdx");
		const tsxFilePath = path.join(directory, "page.tsx");
		const filePath = directoryMetadataParsed?.thisPage?.file
			? path.join(directory, directoryMetadataParsed?.thisPage.file)
			: existsSync(mdxFilePath)
			? mdxFilePath
			: existsSync(mdFilePath)
			? mdFilePath
			: existsSync(tsxFilePath)
			? tsxFilePath
			: null;
		const uri =
			directory === rootDirectory
				? "/"
				: directory.replace(rootDirectory, "");
		const [frontmatter, contents] = !filePath
			? [null, null]
			: filePath.endsWith(".tsx")
			? [null, await readFile(filePath, "utf8")]
			: await extractFrontmatter(filePath);

		console.log("Found page %s via file %s", uri, filePath);

		mainResult.title =
			extractTitle(frontmatter?.title) ??
			directoryMetadataParsed?.thisPage?.title ??
			"Untitled Page";
		mainResult.hrefRelative =
			directoryMetadataParsed?.thisPage?.href ??
			(directory === rootDirectory ? "" : path.basename(directory));
		mainResult.href = directoryMetadataParsed?.thisPage?.href
			? path.join(
					path.dirname(uri),
					directoryMetadataParsed.thisPage.href,
			  )
			: uri;
		mainResult.name =
			mainResult.href === "/" ? "[root]" : path.basename(mainResult.href);
		mainResult.data = frontmatter || undefined;
		mainResult.type =
			directoryMetadataParsed?.thisPage?.type ??
			(filePath ? "page" : "directory");

		if (!directoryMetadataParsed?.hideThisDirectory) {
			results.push(mainResult);
		}

		if (
			!directoryMetadataParsed?.hideThisDirectoryInSearches &&
			mainResult.type === "page"
		) {
			indexArray.push({
				contents: contents ?? "",
				href: mainResult.href,
				title: mainResult.title,
				frontmatter: frontmatter
					? JSON.stringify(frontmatter, null, 2)
					: "",
				fs_path: filePath ?? "",
			});

			sitemapEntryArray.push({
				href: mainResult.href,
				lastmod: new Date().toISOString(),
			});
		}

		let i = -1;

		for (const pageEntry of directoryMetadataParsed?.pageEntries ?? []) {
			i++;

			if (!pageEntry.href && !pageEntry.absoluteHref) {
				console.error(
					"%s: Entry #%d does not have href property set",
					directoryFile,
					i,
				);
				continue;
			}

			if (pageEntry.href && pageEntry.absoluteHref) {
				console.error(
					"%s: Entry #%d has both href and absoluteHref properties set",
					directoryFile,
					i,
				);
				continue;
			}

			const [entryFrontmatter, entryContents] = pageEntry.file
				? !pageEntry.file.endsWith(".mdx") &&
				  !pageEntry.file.endsWith(".md")
					? [
							null,
							await readFile(
								path.join(directory, pageEntry.file),
								"utf8",
							),
					  ]
					: await extractFrontmatter(
							path.join(directory, pageEntry.file),
					  )
				: [null, null];

			const href = pageEntry.absoluteHref
				? pageEntry.absoluteHref
				: path.join(
						pageEntry.sameLevelAsParent
							? path.dirname(mainResult.href)
							: mainResult.href,
						pageEntry.href!,
				  );

			const page: Page = {
				title:
					extractTitle(entryFrontmatter?.title) ??
					pageEntry.title ??
					"Untitled Page",
				hrefRelative: pageEntry.absoluteHref ? null : pageEntry.href!,
				href,
				children: [],
				name: pageEntry.name ?? path.basename(href),
				data: entryFrontmatter || undefined,
				type: pageEntry.type || "page",
			};

			if (pageEntry.sameLevelAsParent) {
				results.push(page);
			} else {
				mainResult.children.push(page);
			}

			if (!pageEntry.hideInSearches && page.type === "page") {
				indexArray.push({
					contents: entryContents || "",
					href,
					title: page.title,
					frontmatter: entryFrontmatter
						? JSON.stringify(entryFrontmatter, null, 2)
						: "",
					fs_path: pageEntry.file
						? path.join(directory, pageEntry.file)
						: undefined,
				});

				sitemapEntryArray.push({
					href: href,
					lastmod: new Date().toISOString(),
				});
			}
		}

		if (
			directory !== rootDirectory &&
			directoryMetadataParsed?.rootSortOrder
		) {
			console.error(
				"%s: rootSortOrder is set, but this isn't the root directory.ts file",
				directoryFile,
				i,
			);

			break self;
		}
	}

	for (const file of files) {
		const filePath = path.join(directory, file);
		const statResult = await lstat(filePath);

		if (statResult.isDirectory()) {
			const childResults = await scanDirectory(
				filePath,
				indexArray,
				sitemapEntryArray,
			);
			mainResult.children.push(...childResults);
		}
	}

	if (directory === rootDirectory && directoryMetadataParsed?.rootSortOrder) {
		sortPages(results, directoryMetadataParsed.rootSortOrder);
	}

	if (directoryMetadataParsed?.sortOrder) {
		console.dir(
			sortPages(mainResult.children, directoryMetadataParsed.sortOrder),
			{
				depth: Infinity,
			},
		);
	}

	return results;
}

type SitemapEntry = {
	href: string;
	lastmod: string;
};

function sortPages(pages: Page[], sortList: string[]) {
	return pages.sort((a, b) => {
		const aIndex = sortList.indexOf(a.name),
			bIndex = sortList.indexOf(b.name);

		if (aIndex !== -1 && bIndex !== -1) {
			return sortList.indexOf(a.name) - sortList.indexOf(b.name);
		}

		if (aIndex === -1 && bIndex === -1) {
			return 0;
		}

		if (aIndex === -1 && bIndex >= 0) {
			return 1;
		}

		return -1;
	});
}

async function extractFrontmatter(
	pageFile: string,
): Promise<[null, string] | [FrontmatterType, string]> {
	const contents: string = (await readFile(pageFile, "utf8")).trim();

	if (contents.startsWith("---\n")) {
		const slicedContent = contents.slice(4);
		const frontmatterEndIndex = slicedContent.endsWith("\n---") 
			&& slicedContent.split("\n---\n").length <= 1
			? slicedContent.length - 4
			: slicedContent.indexOf("\n---\n");

		if (frontmatterEndIndex < 0) {
			console.error(
				"%s: Could not extract frontmatter, end marker missing",
				pageFile,
			);
			return [null, contents];
		}

		const frontmatter = slicedContent.slice(0, frontmatterEndIndex);
		const body = slicedContent.slice(frontmatterEndIndex + 5);

		try {
			return [YAML.parse(frontmatter), body];
		} catch (error) {
			console.error("%s: Error parsing frontmatter: %s", pageFile, error);
			return [null, contents];
		}
	}

	return [null, contents];
}

type FrontmatterType = {
	title?: string | { absolute?: string; template?: string; default?: string };
	short_name?: string;
};

if (process.argv.includes("--pre")) {
	const index: IndexEntry[] = [];
	const sitemap: SitemapEntry[] = [];
	const tree = await scanDirectory(undefined, index, sitemap);

	await writeFile("index.json", JSON.stringify(index, null, 4));
	await writeFile("tree.json", JSON.stringify(tree, null, 4));

	let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

	for (const entry of sitemap.toReversed()) {
		sitemapXML += `
        <url>
            <loc>https://${BASE_URL}${entry.href}</loc>
            <lastmod>${entry.lastmod}</lastmod>
        </url>
    `;
	}

	sitemapXML += `
</urlset>
`;

	await writeFile("sitemap.xml", sitemapXML);
	await writeFile(
		"sitemap.json",
		JSON.stringify(sitemap.toReversed(), null, 2),
	);
}

if (process.argv.includes("--post")) {
	await cp("index.json", ".next/server/index.json");
}

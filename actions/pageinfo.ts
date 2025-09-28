"use server";

import { GITHUB_REPOSITORY, GITHUB_REPOSITORY_BRANCH } from "@/config/config";
import { IndexEntry } from "@/types/IndexEntry";
import { getIndex } from "@/utils/pages";

const map = new Map<string, IndexEntry>();

export async function getPageInfo(pathname: string) {
    "use server";

    if (Object.keys(map).length === 0) {
        for (const entry of getIndex()) {
            map.set(entry.href, entry);
        }
    }

    const trimmedPathname = pathname.replace(/\/$/, "");
    const path = (map.get(trimmedPathname) ?? map.get(trimmedPathname + "/"))?.fs_path;

    console.log('path', path);

    const pageExtension = !path ? null : path?.endsWith(".mdx")
        ? "mdx"
        : path?.endsWith(".md")
          ? "md"
          : "tsx";

    const urlEncodedPath = !pageExtension ? null : `app/(docs)${pathname.trim() + (pathname[pathname.length - 1] !== "/" ? "/" : "")}page.${pageExtension}`;

    const githubURL = pathname && urlEncodedPath
        ? `https://api.github.com/repos/${GITHUB_REPOSITORY}/commits?path=${encodeURIComponent(urlEncodedPath)}&sha=${encodeURIComponent(GITHUB_REPOSITORY_BRANCH)}`
        : null;

    let lastModifiedDate = new Date();
    let avatarURL = null;
    let username = null;

    if (githubURL) {
        try {
            const response = await fetch(githubURL, {
                next: {
                    revalidate: 3600,
                },
            });

            const json = await response.json();
            const timestamp = json?.[0]?.commit?.author?.date;
            avatarURL = json?.[0]?.author?.avatar_url;
            username = json?.[0]?.author?.name ?? json?.[0]?.author?.login;

            if (timestamp) {
                lastModifiedDate = new Date(timestamp);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { lastModifiedDate, avatarURL, urlEncodedPath, username };
}

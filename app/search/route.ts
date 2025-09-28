import { IndexEntry } from "@/types/IndexEntry";
import { getIndex } from "@/utils/pages";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const query = new URL(request.url).searchParams.get("q")?.toLowerCase();

    if (!query) {
        return NextResponse.json(
            {
                error: "Invalid Request Payload",
            },
            {
                status: 400,
            },
        );
    }

    const index = getIndex();
    const lowercasedIndex = getIndex(true);

    const results: (IndexEntry & { match: keyof IndexEntry })[] = [];

    if (lowercasedIndex) {
        for (const i in lowercasedIndex) {
            if (results.length >= 15) {
                break;
            }

            const titleIncludes = lowercasedIndex[i].title?.includes(query);
            const descriptionIncludes =
                lowercasedIndex[i].contents?.includes(query);
            const frontmatterIncludes =
                lowercasedIndex[i].frontmatter?.includes(query);
            const hrefIncludes = lowercasedIndex[i].href?.includes(query);

            if (
                titleIncludes ||
                descriptionIncludes ||
                frontmatterIncludes ||
                hrefIncludes
            ) {
                results.push({
                    ...index?.[i],
                    match: titleIncludes
                        ? ("title" as const)
                        : descriptionIncludes
                        ? ("contents" as const)
                        : frontmatterIncludes
                        ? ("frontmatter" as const)
                        : ("href" as const),
                });
            }
        }
    }

    results.sort((a, b) => {
        if (a.match === "title" && b.match === "title") {
            return a.title!.localeCompare(b.title!);
        }

        if (a.match === "title") {
            return -1;
        }

        if (b.match === "title") {
            return 1;
        }

        return a[a.match]!.substring(0, 10).localeCompare(
            b[b.match]!.substring(0, 10),
        );
    });

    return NextResponse.json({
        results,
    });
}

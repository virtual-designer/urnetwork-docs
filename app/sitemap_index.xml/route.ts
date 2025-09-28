import { absoluteURL } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET() {
    const sitemaps = ["/sitemap.xml"];

    return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>\n
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${sitemaps.map(sitemap => `<sitemap><loc>${absoluteURL(sitemap)}</loc></sitemap>`).join("")}
        </sitemapindex>
    `,
        {
            headers: {
                "Content-Type": "application/xml",
            },
        },
    );
}

import createMDX from "@next/mdx";
import { NextConfig } from "next";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx", "md"],
    async rewrites() {
        return [{ source: "/:path*.(mdx?)", destination: "/:path*" }];
    },
    outputFileTracingRoot: path.resolve(__dirname)
};

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
    theme: "material-theme-ocean",
};

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [
            remarkGfm,
            remarkFrontmatter,
            [remarkMdxFrontmatter, { name: "metadata" }],
        ],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "append",
                    properties: { className: "autolink", tabindex: -1 },
                },
            ],
            [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
    },
});

export default withMDX(nextConfig);

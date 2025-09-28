import "@/styles/globals.css";

import Navbar from "@/components/Navbar/Navbar";
import Progress from "@/components/Navigation/Progress";
import type { Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { BASE_URL } from "@/config/links";
import { SITE_DEFAULT_TITLE, SITE_TITLE_FORMAT } from "@/config/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: SITE_DEFAULT_TITLE,
        template: SITE_TITLE_FORMAT,
    },
    alternates: {
        canonical: "./",
    },
};

export const viewport: Viewport = {
    colorScheme: "dark",
    initialScale: 1,
    themeColor: "#000",
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <Providers>
                    <Navbar />
                    <Progress />
                    {children}
                </Providers>
            </body>
        </html>
    );
}

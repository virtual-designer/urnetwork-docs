"use client";

import useActualPathname from "@/hooks/useActualPathname";
import styles from "@/styles/Navigator.module.css";
import { flatten, resolveDocsURL } from "@/utils/pages";
import { getTitle } from "@/utils/utils";
import Link from "next/link";
import { FC } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const flatRoutes = flatten().filter(page => page.type !== "directory");

const Navigator: FC = () => {
    const pathname = useActualPathname();

    if (flatRoutes.length === 0) {
        return null;
    }

    const currentPage = flatRoutes.findIndex(page => {
        if (!page.href) {
            return false;
        }

        const url = resolveDocsURL(page.href);
        return url === pathname;
    });

    const nextIndex = currentPage + 1;
    const prevIndex = currentPage - 1;
    const nextPage = flatRoutes[nextIndex];
    const prevPage = flatRoutes[prevIndex];

    return (
        <div
            className={styles.root}
            data-wrap={!nextPage || !prevPage ? "true" : "false"}
        >
            {prevPage && (
                <Link
                    href={prevPage.href ? resolveDocsURL(prevPage.href) : "#"}
                    className={`${styles.navigationControl} ${styles.navigationControlBack}`}
                >
                    <div className={styles.iconWrapper}>
                        <MdArrowBack size={26} />
                    </div>
                    <div className={styles.text}>
                        <small>Back</small>
                        <span>
                            {prevPage.data?.short_name ?? getTitle(prevPage.data?.title) ?? prevPage.title}
                        </span>
                    </div>
                </Link>
            )}
            {nextPage && (
                <Link
                    href={nextPage.href ? resolveDocsURL(nextPage.href) : "#"}
                    className={`${styles.navigationControl} ${styles.navigationControlNext}`}
                >
                    <div className={styles.text}>
                        <small>Next</small>
                        <span>
                            {nextPage.data?.short_name ?? getTitle(nextPage.data?.title) ?? nextPage.title}
                        </span>
                    </div>
                    <div className={styles.iconWrapper}>
                        <MdArrowForward size={26} />
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Navigator;

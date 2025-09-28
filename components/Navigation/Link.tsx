"use client";

import { useRouterContext } from "@/contexts/RouterContext";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, FC, KeyboardEvent, MouseEvent, JSX } from "react";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "as"> & {
    nextLink?: boolean;
    as?: keyof JSX.IntrinsicElements | FC;
};

export default function Link({
    nextLink = true,
    as = NextLink as unknown as keyof JSX.IntrinsicElements,
    onClick,
    onKeyUp,
    href,
    children,
    ...props
}: LinkProps) {
    const { setIsChanging } = useRouterContext();
    const pathname = usePathname();
    const Component = ((nextLink ? NextLink : as) ?? "a") as "a";
    const propsToPass = {
        ...props,
        href,
    } as ComponentProps<typeof NextLink>;

    if (nextLink) {
        propsToPass.as = as as unknown as keyof JSX.IntrinsicElements;
    }

    const stringHref = href.toString();

    const onNavigate = () => {
        const pos = stringHref.indexOf("?");

        if (
            !stringHref.startsWith("https://") &&
            !stringHref.startsWith("http://") &&
            pathname !==
                stringHref
                    .substring(0, pos === -1 ? undefined : pos)
                    .replace(/\/+/g, "/")
                    .replace(/\/$/g, "") &&
            !(
                pathname === "/" &&
                stringHref.substring(0, pos === -1 ? undefined : pos) === "/"
            )
        ) {
            setIsChanging(true);
        }
    };

    return (
        <Component
            href={href as string}
            {...props}
            onClick={event => {
                event.stopPropagation();
                onClick?.(event as MouseEvent<HTMLAnchorElement>);
                onNavigate();
            }}
            onKeyUp={event => {
                onKeyUp?.(event as KeyboardEvent<HTMLAnchorElement>);

                if (event.key === "Enter") {
                    onNavigate();
                }
            }}
        >
            {children}
        </Component>
    );
}

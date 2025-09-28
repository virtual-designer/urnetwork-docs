import { Skeleton } from "@mui/material";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { ComponentProps } from "react";
import Figure from "./components/MDX/Figure";
import ImageWithSkeleton from "./components/MDX/ImageWithSkeleton";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		Image: (props: ComponentProps<typeof Image>) => <Image {...props} />, // eslint-disable-line jsx-a11y/alt-text
		ImageWithSkeleton: (
			props: ComponentProps<typeof ImageWithSkeleton>,
		) => <ImageWithSkeleton {...props} />,
		Skeleton: (props: ComponentProps<typeof Skeleton>) => (
			<Skeleton {...props} />
		),
		figure: Figure,
	};
}

import { Skeleton } from "@mui/material";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Callout from "./components/Alerts/Callout";
import Anchor from "./components/MDX/Anchor";
import Figure from "./components/MDX/Figure";
import ImageWithSkeleton from "./components/MDX/ImageWithSkeleton";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		Image,
		ImageWithSkeleton,
		Skeleton,
		Callout,
		figure: Figure,
		a: Anchor,
	};
}

"use client";

import { ComponentProps, FC, useRef } from "react";
import CodeCopyButton from "./CodeCopyButton";

type FigureProps = ComponentProps<"figure">;

const Figure: FC<FigureProps> = ({ children, ...props }) => {
    const ref = useRef<HTMLElement>(null);
	const isRehypeFigure = "data-rehype-pretty-code-figure" in props;

	return (
		<figure {...props} ref={ref}>
			{isRehypeFigure && (
				<CodeCopyButton ref={ref} />
			)}
			{children}
		</figure>
	);
};

export default Figure;

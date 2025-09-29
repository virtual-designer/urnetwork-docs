import { Button } from "@mui/material";
import { forwardRef, ForwardRefRenderFunction, useEffect, useState } from "react";

type CodeCopyButtonProps = Record<never, never>;

const CodeCopyButton: ForwardRefRenderFunction<
	HTMLElement,
	CodeCopyButtonProps
> = ({}, ref) => {
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (typeof ref === "function") {
            throw new Error("ref cannot be a function");
        }

        const figure = ref?.current;
        const onPointerLeave = () => {
            setIsCopied(false);
        };

        figure?.addEventListener('pointerleave', onPointerLeave);
        return () => figure?.removeEventListener('pointerleave', onPointerLeave)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
	if (typeof ref === "function") {
		throw new Error("ref cannot be a function");
	}

	return (
		<Button
			className="copy-button"
			style={{ minWidth: 0 }}
			role="button"
			onClick={async () => {
				const figure = ref?.current;
				const elements = [
					...(figure?.getElementsByTagName("code") || []),
				];
				let text = "";

				for (const element of elements) {
					text += element.innerText;
				}

				await navigator.clipboard.writeText(text).catch(console.error);
                setIsCopied(true);
			}}
		>
			{isCopied ? "Copied" : "Copy"}
		</Button>
	);
};

export default forwardRef(CodeCopyButton);

import { ComponentProps, FC } from "react";
import { HiOutlineLink } from "react-icons/hi2";

type AnchorProps = ComponentProps<"a">;

const Anchor: FC<AnchorProps> = ({ children, ...props }) => {
	return (
		<a {...props}>
			{"data-footnote-backref" in props ? (
				<HiOutlineLink
					className="inline-block -mt-0.5 ml-1"
					size={16}
				/>
			) : (
				children
			)}
		</a>
	);
};

export default Anchor;

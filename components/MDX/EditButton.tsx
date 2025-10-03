"use client";

import { GITHUB_REPOSITORY, GITHUB_REPOSITORY_BRANCH } from "@/config/config";
import {
	Button,
	ButtonGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";
import { Key } from "react";
import { BsGit } from "react-icons/bs";
import {
	HiChevronDown,
	HiOutlineClipboardDocument,
	HiOutlineLink,
} from "react-icons/hi2";
import { MdEdit } from "react-icons/md";
import Link from "../Navigation/Link";

type EditButtonProps = {
	editPath: string | null;
	isChanging?: boolean;
};

export default function EditButton({ editPath, isChanging }: EditButtonProps) {
	const url = editPath
		? `https://github.com/${GITHUB_REPOSITORY}/edit/${encodeURIComponent(
				GITHUB_REPOSITORY_BRANCH,
		  )}/${editPath ?? ""}`
		: "#";
	const changesURL = editPath
		? `https://github.com/${GITHUB_REPOSITORY}/commits/${encodeURIComponent(
				GITHUB_REPOSITORY_BRANCH,
		  )}/${editPath ?? ""}`
		: "#";
	const isDisabled = !editPath || isChanging;

	const copyPageContentsPlain = async () => {
		const article = document.getElementById("article");

		if (!article) {
			return;
		}

		try {
			await navigator.clipboard.writeText(article.innerText);
		} catch (error) {
			console.error(error);
		}
	};

	const copyURL = async () => {
		try {
			const url = location.toString();
			await navigator.clipboard.writeText(url);
		} catch (error) {
			console.error(error);
		}
	};

	const onAction = (key: Key) => {
		switch (key) {
			case "copyPlain":
				copyPageContentsPlain();
				break;

			case "copyURL":
				copyURL();
				break;
		}
	};

	return (
		<ButtonGroup variant="flat">
			<Button
				startContent={<MdEdit size={18} />}
				isDisabled={isDisabled}
				as={Link}
				href={url}
				target="_blank"
			>
				Edit this page
			</Button>
			<Dropdown
				placement="bottom-end"
				className="editbuttonOptionsDropdown"
			>
				<DropdownTrigger>
					<Button isIconOnly isDisabled={isDisabled}>
						<HiChevronDown />
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					disallowEmptySelection
					aria-label="Options"
					className="max-w-[300px] editbuttonOptions"
					selectionMode="single"
					onAction={onAction}
					variant="flat"
				>
					<DropdownItem
						key="copyPlain"
						description="Copy the page contents as plain text."
						startContent={<HiOutlineClipboardDocument size={30} />}
					>
						Copy page contents
					</DropdownItem>
					<DropdownItem
						key="copyURL"
						description="Copy the link of this page."
						startContent={<HiOutlineLink size={30} />}
					>
						Copy URL
					</DropdownItem>
					<DropdownItem
						key="viewChanges"
						description="View changes made to this page."
						startContent={<BsGit size={30} />}
						as={Link}
						href={changesURL}
						target="_blank"
					>
						View Changes
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</ButtonGroup>
	);
}

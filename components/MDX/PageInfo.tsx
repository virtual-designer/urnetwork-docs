"use client";

import { getPageInfo } from "@/actions/pageinfo";
import { GITHUB_REPOSITORY, GITHUB_REPOSITORY_BRANCH } from "@/config/config";
import { useRouterContext } from "@/contexts/RouterContext";
import useActualPathname from "@/hooks/useActualPathname";
import { Tooltip } from "@heroui/react";
import { Button } from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

export default function LastModified() {
	const [date, setDate] = useState<Date | null>(null);
	const [avatar, setAvatar] = useState<string | null>(null);
	const [editURL, setEditURL] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const pathname = useActualPathname();
	const { isChanging } = useRouterContext();

	useEffect(() => {
		getPageInfo(pathname)
			.then(
				({ avatarURL, lastModifiedDate, urlEncodedPath, username }) => {
					setDate(lastModifiedDate);
					setAvatar(avatarURL);
					setEditURL(urlEncodedPath);
					setUsername(username);
				},
			)
			.catch(console.error);
	}, [pathname]);

	return (
		<div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-center">
			<div className="flex items-center gap-3">
				{date && username && (
					<>
						{avatar ? (
							<Tooltip content={username ?? "Unknown"}>
								{/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
								<img
									src={avatar}
									className="w-[30px] h-[30px] rounded-full [border:1px_solid_#007bff]"
								/>
							</Tooltip>
						) : (
							<div className="w-[30px] h-[30px] rounded-full [border:1px_solid_#007bff] bg-[rgba(0,123,255,0.3)]"></div>
						)}

						<span className="text-[#999]">
							Last modified{" "}
							{formatDistanceToNowStrict(date, {
								addSuffix: true,
							})}
						</span>
					</>
				)}
			</div>

			<div>
				<Button
					href={
						editURL
							? `https://github.com/${GITHUB_REPOSITORY}/edit/${encodeURIComponent(
									GITHUB_REPOSITORY_BRANCH,
							  )}/${editURL ?? ""}`
							: "#"
					}
					disabled={!editURL || isChanging}
					target="_blank"
					rel="noreferrer"
					startIcon={<MdEdit size={16} />}
					className="-mt-1"
				>
					Edit this page
				</Button>
			</div>
		</div>
	);
}

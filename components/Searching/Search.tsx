"use client";

import useIsDesktop from "@/hooks/useIsDesktop";
import usePlatform from "@/hooks/usePlatform";
import { useAppStore } from "@/store/AppStore";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

export default function Search() {
	const platform = usePlatform();
	const isDesktop = useIsDesktop();
	const wrapperRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const query = useAppStore(store => store.searchQuery);
	const setQuery = useAppStore(store => store.setSearchQuery);
	const setHideResults = useAppStore(store => store.setHideSearchResults);
	const [toggled, setToggled] = useState(false);
	const [focusJumped, setFocusJumped] = useState(false);

	useEffect(() => {
		const callback = (event: KeyboardEvent) => {
			if (
				event.code === "Slash" ||
				((platform === "darwin" ? event.metaKey : event.ctrlKey) &&
					event.code === "KeyK")
			) {
				event.preventDefault();
				inputRef.current?.focus();
				setFocusJumped(true);
			}
		};

		const wrapper = wrapperRef.current;

		const wrapperRefCallback = (event: KeyboardEvent) => {
			if (event.code === "Escape") {
				setHideResults(true);
			} else if (event.code === "ArrowUp" || event.code === "ArrowDown") {
				window.dispatchEvent(
					new CustomEvent("search:desktop:wrapper:focus"),
				);
			}
		};

		wrapper?.addEventListener("keydown", wrapperRefCallback);
		window.addEventListener("keydown", callback);

		return () => {
			window.removeEventListener("keydown", callback);
			wrapper?.removeEventListener("keydown", wrapperRefCallback);
		};
	}, [platform, setHideResults]);

	return (
		<>
			<div
				className="relative lg:max-w-[20vw] lg:min-w-64 lg:w-full justify-self-end"
				ref={wrapperRef}
			>
				{isDesktop && (
					<SearchInput
						ref={inputRef}
						setQuery={query => {
							setQuery(query);
							setHideResults(false);
						}}
						isFocusJumped={focusJumped}
						clearFocusJumped={() => setFocusJumped(false)}
					/>
				)}

				{!isDesktop && (
					<Button
						style={{ minWidth: 0, color: "white" }}
						onClick={() => {
							setToggled(true);
						}}
					>
						<MdSearch size={23} />
					</Button>
				)}

				{!isDesktop && toggled && (
					<div
						className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-[100000005]"
						onClick={() => setToggled(false)}
					>
						<div
							className="overflow-y-scroll shadow shadow-neutral-700 bg-neutral-500/20 backdrop-blur-2xl w-[calc(100vw-1.4rem)] h-[calc(80vh-0.7rem)] mx-[0.7rem] rounded-lg absolute bottom-3"
							onClickCapture={event => event.stopPropagation()}
						>
							<div className="p-4">
								<SearchInput
									ref={inputRef}
									setQuery={setQuery}
								/>
							</div>

							<div className="p-2">
								{query && (
									<SearchResults
										query={query}
										onClose={() => setQuery(null)}
									/>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

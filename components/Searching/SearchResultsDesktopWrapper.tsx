"use client";

import useIsDesktop from "@/hooks/useIsDesktop";
import { useAppStore } from "@/store/AppStore";
import { FC, useEffect, useRef } from "react";
import SearchResults from "./SearchResults";

type SearchResultsDesktopWrapperProps = {};

const SearchResultsDesktopWrapper: FC<
	SearchResultsDesktopWrapperProps
> = ({}) => {
	const query = useAppStore(store => store.searchQuery);
	const setQuery = useAppStore(store => store.setSearchQuery);
	const hideResults = useAppStore(store => store.hideSearchResults);
	const isDesktop = useIsDesktop();
	const searchResultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onEvent = () => searchResultsRef.current?.focus();

		window.addEventListener("search:desktop:wrapper:focus", onEvent);
		return () =>
			window.removeEventListener("search:desktop:wrapper:focus", onEvent);
	}, []);

	return (
		<>
			{query && isDesktop && !hideResults && (
				<SearchResults
					query={query}
					onClose={() => setQuery(null)}
					ref={searchResultsRef}
				/>
			)}
		</>
	);
};

export default SearchResultsDesktopWrapper;

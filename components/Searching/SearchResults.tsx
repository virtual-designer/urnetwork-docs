import styles from '@/styles/Navbar.module.css';
import { CircularProgress } from "@heroui/react";
import { forwardRef, Ref, useEffect, useState } from "react";
import SearchResult from "./SearchResult";

type SearchResultsProps = {
	query: string;
	onClose: () => void;
};

type SearchResultItem = {
	title?: string;
	data: string;
	match: "title" | "contents" | "frontmatter" | "href";
	href: string;
};

const SearchResults = (
	{ query, onClose }: SearchResultsProps,
	ref: Ref<HTMLDivElement>,
) => {
	const [results, setResults] = useState<SearchResultItem[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);

	const performSearch = async (controller: AbortController) => {
		try {
			const response = await fetch(
				`/search?q=${encodeURIComponent(query)}`,
				{
					signal: controller.signal,
				},
			);
			const data = await response.json();

			setIsNotFound(false);
			setIsLoading(false);
			setResults(data.results);
			setIsNotFound(data.results.length === 0);

			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!query?.trim()) {
			return;
		}

		const controller = new AbortController();
		setIsLoading(true);
		performSearch(controller);

		return () => {
			try {
				controller.abort();
			} catch {}
		};
	}, [query]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{" "}
			{isLoading ||
				isNotFound ||
				(results?.length && (
					<div
						className="max-lg:hidden fixed top-0 left-0 z-[1000000001] bg-transparent h-screen w-screen"
						onClick={onClose}
					/>
				))}
			<div
				ref={ref}
				className={`${styles.searchResultsWrapper} !outline-none lg:fixed lg:right-0 top-12 lg:top-15 w-full lg:max-w-[20vw] lg:min-w-64 lg:z-[1000000002] rounded-lg p-2 lg:max-h-[60vh] lg:bg-neutral-500/30 lg:backdrop-blur-2xl lg:overflow-y-scroll lg:[box-shadow:0_0_3px_0_rgba(255,255,255,0.4)]`}
			>
				{isLoading && (
					<div className="flex items-center gap-2 justify-center">
						<CircularProgress size={"sm"} />
						<p>Loading...</p>
					</div>
				)}
				{isNotFound && !isLoading && (
					<div className="text-center">No result found</div>
				)}
				{!!results?.length &&
					!isLoading &&
					!isNotFound &&
					results.map(result => (
						<SearchResult
							key={result.href}
							onClick={onClose}
							query={query}
							result={result}
						/>
					))}
			</div>
		</>
	);
};

export default forwardRef(SearchResults);

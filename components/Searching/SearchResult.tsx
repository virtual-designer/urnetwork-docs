import Link from "@/components/Navigation/Link";
import { SearchResultItem } from "./SearchModal";

type SearchResultProps = {
    result: SearchResultItem;
    query: string;
    onClick: () => void;
};

function SearchResult({ result, query, onClick }: SearchResultProps) {
    return (
        <Link
            href={result.href}
            onClick={onClick}
            className="!outline-none p-2 shadow-[0_0_1px_1px_rgba(255,255,255,0.1)] block rounded mb-2 last:!mb-0 bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.3)] cursor-pointer md:shadow-none md:bg-transparent md:hover:bg-neutral-600/30 md:focus:bg-neutral-600/30 md:rounded-lg"
        >
            <h3>{result.title}</h3>

            <p className="text-[#999] md:text-sm">
                May include information related to{" "}
                <strong className="text-white">{query}</strong>
            </p>
        </Link>
    );
}

export default SearchResult;

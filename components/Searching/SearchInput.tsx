import { forwardRef, Ref } from "react";
import { MdSearch } from "react-icons/md";

type SearchInputProps = {
    setQuery: (query: string | null) => void;
    isFocusJumped?: boolean;
    clearFocusJumped?: () => void;
};

const SearchInput = (
    { setQuery, clearFocusJumped, isFocusJumped = false }: SearchInputProps,
    ref: Ref<HTMLInputElement>,
) => {
    return (
        <div
            className={`flex items-center gap-2 bg-neutral-900 lg:bg-neutral-800 rounded-lg p-2 ${
                isFocusJumped ? "outline-2 outline-blue-500" : ""
            } searchInputWrapper`}
        >
            <MdSearch
                className="text-black/50 mt-0.5 dark:text-white/90 pointer-events-none flex-shrink-0"
                size={23}
            />

            <input
                ref={ref}
                type="text"
                onChange={event => {
                    setQuery(event.target.value);

                    if (isFocusJumped) {
                        clearFocusJumped?.();
                    }
                }}
                placeholder="Type to search..."
                className="!outline-none !border-0 !focus:outline-none searchInput"
                onBlur={() => (isFocusJumped ? clearFocusJumped?.() : void 0)}
            />
        </div>
    );
};

export default forwardRef(SearchInput);

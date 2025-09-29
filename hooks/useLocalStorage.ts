import { useCallback, useEffect, useRef, useState } from "react";

export type Serializable =
	| number
	| string
	| null
	| undefined
	| boolean
	| object;

export enum LocalStorageKey {
	ShowTableOfContentsOnMobile = "sudoc:show_toc_on_mobile",
}

const jsonSerialize = JSON.stringify;
const jsonDeserialize = JSON.parse;

export function useLocalStorage<T extends Serializable>(
	key: LocalStorageKey,
	defaultValue: null,
	serialize?: (data: T) => string,
	deserialize?: (data: string) => T,
): [T | null, (data: T | ((current: T) => T)) => void];

export function useLocalStorage<T extends Serializable>(
	key: LocalStorageKey,
	defaultValue: T,
	serialize?: (data: T) => string,
	deserialize?: (data: string) => T,
): [T, (data: T | ((current: T) => T)) => void];

export function useLocalStorage<T extends Serializable>(
	key: LocalStorageKey,
	defaultValue: T | null = null,
	serialize: (data: T) => string = jsonSerialize,
	deserialize: (data: string) => T = jsonDeserialize,
): [T | null, (data: T | ((current: T) => T)) => void] {
	const [state, setState] = useState<T | null>(defaultValue);
	const reload = useCallback(() => {
		const item = localStorage.getItem(key);
		const tranformed =
			typeof item === "string"
				? deserialize
					? deserialize(item)
					: item
				: defaultValue;
		setState(tranformed as T);
	}, [key, defaultValue, setState, deserialize]);
	const changeRef = useRef(false);

	useEffect(() => {
		reload();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		window.addEventListener("localStorage:updated", reload);

		return () => {
			window.removeEventListener("localStorage:updated", reload);
		};
	}, [reload]);

	useEffect(() => {
		if (changeRef.current) {
			window.dispatchEvent(new CustomEvent("localStorage:updated"));
			changeRef.current = false;
		}
	}, [state]);

	const customSetState = (data: T | ((current: T) => T)) => {
		setState(current => {
			const result =
				typeof data === "function" ? data(current as T) : data;
			const serialized = serialize ? serialize(result) : String(result);

			try {
				localStorage.setItem(key, serialized);
				changeRef.current = true;
			} catch {}

			return result;
		});
	};

	return [state, customSetState] as const;
}

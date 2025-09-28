import { BASE_URL } from "@/config/links";

export const toTitleCase = (s: string) =>
	s
		.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
		.replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());

export const absoluteURL = (url: string) => `${BASE_URL}${url}`;

export const getTitle = (
	title:
		| string
		| undefined
		| null
		| { absolute?: string; template?: string; default?: string },
) => {
	return typeof title === "string"
		? title
		: title?.absolute ?? title?.template ?? title?.default ?? null;
};

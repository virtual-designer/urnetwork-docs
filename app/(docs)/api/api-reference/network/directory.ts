import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"auth-client",
		"remove-client",
		"clients",
		"provider-locations",
		"find-provider-locations",
		"find-locations",
		"find-providers",
		"find-providers2",
		"create-provider-spec",
		"ranking",
		"ranking-visibility",
		"block-location",
		"unblock-location",
		"blocked-locations",
		"reliability",
		"control"
	],
	thisPage: {
		title: "Network",
	},
};

export default config;

import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"last-90",
		"providers-overview-last-90",
		"providers",
		"provider-last-90",
	],
	thisPage: {
		title: "Stats",
	},
};

export default config;

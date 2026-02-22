import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"last-90",
		"providers-overview-last-90",
		"providers",
		"providers-last-n",
		"provider-last-90",
		"provider-last-n",
		"leaderboard",
	],
	thisPage: {
		title: "Stats",
	},
};

export default config;

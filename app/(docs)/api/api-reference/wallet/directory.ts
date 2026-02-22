import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"balance",
		"validate-address",
		"circle-init",
		"circle-transfer-out",
	],
	thisPage: {
		title: "Wallet",
	},
};

export default config;

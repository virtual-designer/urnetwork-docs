import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"balance",
		"check-balance-code",
		"redeem-balance-code",
		"create-payment-id",
	],
	thisPage: {
		title: "Subscription",
	},
};

export default config;

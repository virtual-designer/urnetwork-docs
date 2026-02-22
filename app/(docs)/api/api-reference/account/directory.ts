import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"points",
		"payout-wallet",
		"wallet",
		"wallets",
		"wallets-remove",
		"payments",
		"balance-codes",
		"referral-code",
		"referral-network",
		"set-referral",
		"unlink-referral-network",
		"validate-referral-code",
	],
	thisPage: {
		title: "Account",
	},
};

export default config;

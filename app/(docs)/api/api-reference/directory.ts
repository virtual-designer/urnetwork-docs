import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"hello",
		"preferences",
		"set-preferences",
		"stats",
		"login",
		"login-with-password",
		"verify",
		"verify-send",
		"password-reset",
		"password-set",
		"auth-code-login",
		"upgrade-guest",
		"code-create",
		"network-check",
		"network-create",
		"network-delete",
		"network",
		"device",
		"account",
		"wallet",
		"subscription",
		"feedback",
		"solana",
		"transfer",
	],
	thisPage: {
		title: "API Reference",
	},
};

export default config;

import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"preferences",
		"set-preferences",
		"hello",
		"stats",
		"auth-code-login",
		"login",
		"login-with-password",
		"verify",
		"verify-send",
		"password-reset",
		"password-set",
		"network-check",
		"code-create",
	],
	thisPage: {
		title: "API Reference",
	},
};

export default config;

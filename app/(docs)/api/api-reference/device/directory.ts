import type { DirectoryMetadataType } from "@/schemas/IndexSchema";

const config: DirectoryMetadataType = {
	sortOrder: [
		"add",
		"create-share-code",
		"share-code-qr",
		"share-status",
		"confirm-share",
		"create-adopt-code",
		"adopt-code-qr",
		"adopt-status",
		"confirm-adopt",
		"remove-adopt-code",
		"associations",
		"remove-association",
		"set-association-name",
		"set-name",
		"set-provide",
	],
	thisPage: {
		title: "Device",
	},
};

export default config;

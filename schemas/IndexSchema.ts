import { z } from "zod";

export const PageEntrySchema = z.object({
    name: z.string().nonempty().optional(),
    title: z.string().nonempty().optional(),
    href: z.string().nonempty().optional(),
    absoluteHref: z.string().nonempty().optional(),
    file: z.string().nonempty().optional(),
    sameLevelAsParent: z.boolean().optional(),
    hideInSearches: z.boolean().optional(),
});

export const DirectoryMetadataSchema = z.object({
    sortOrder: z.array(z.string().nonempty()).nonempty().optional(),
    rootSortOrder: z.array(z.string().nonempty()).nonempty().optional(),
    hideThisDirectory: z.boolean().optional(),
    hideThisDirectoryInSearches: z.boolean().optional(),
    pageEntries: z.array(PageEntrySchema).optional(),
    thisPage: PageEntrySchema.optional(),
});

export type DirectoryMetadataType = z.infer<typeof DirectoryMetadataSchema>;

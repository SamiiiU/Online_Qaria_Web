export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "aaaaaaaa";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = "2026-10-01";
export const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

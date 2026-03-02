import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * List Synced Addresses - adds pagination to base and metadata
 */
export const ListSyncedAddressesAttributesSchema = RequestMetadataSchema.merge(CursorPaginationSchema);

export type ListSyncedAddressesAttributes = z.infer<typeof ListSyncedAddressesAttributesSchema>;

/**
 * Synced address item in response
 */
export const SyncedAddressSchema = z.object({
    address: z.string().describe("The synced address"),
    blockchain: z.string().describe("Blockchain protocol"),
    network: z.string().describe("Network name"),
    status: z.string().describe("Sync status (syncing, synced, inactive)"),
    createdAt: z.number().describe("Unix timestamp when sync was initiated"),
    firstSeenInBlockTimestamp: z.number().optional().describe("Unix timestamp of first transaction"),
    lastSeenInBlockTimestamp: z.number().optional().describe("Unix timestamp of last transaction"),
}).passthrough();

/**
 * List Synced Addresses Response
 */
export const ListSyncedAddressesOutputSchema = z.object({
    items: z.array(SyncedAddressSchema).describe("List of synced addresses"),
    limit: z.number().describe("Number of items returned"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListSyncedAddressesOutput = z.infer<typeof ListSyncedAddressesOutputSchema>;

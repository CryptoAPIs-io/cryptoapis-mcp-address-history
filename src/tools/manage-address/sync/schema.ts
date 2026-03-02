import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Sync Address - adds address to base and metadata
 */
export const SyncAddressAttributesSchema = z.object({
    address: z.string().describe("Address to sync"),
}).merge(RequestMetadataSchema);

export type SyncAddressAttributes = z.infer<typeof SyncAddressAttributesSchema>;

/**
 * Sync Address Response
 */
export const SyncAddressOutputSchema = z.object({
    address: z.string().describe("The synced address"),
    blockchain: z.string().describe("Blockchain protocol"),
    network: z.string().describe("Network name"),
    status: z.string().describe("Sync status (syncing, synced, failed)"),
    createdAt: z.number().describe("Unix timestamp when sync was initiated"),
}).passthrough();

export type SyncAddressOutput = z.infer<typeof SyncAddressOutputSchema>;

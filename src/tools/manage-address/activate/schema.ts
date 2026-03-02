import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Activate Synced Address - adds address to base and metadata
 */
export const ActivateSyncedAddressAttributesSchema = z.object({
    address: z.string().describe("Address to activate"),
}).merge(RequestMetadataSchema);

export type ActivateSyncedAddressAttributes = z.infer<typeof ActivateSyncedAddressAttributesSchema>;

/**
 * Activate Synced Address Response
 */
export const ActivateSyncedAddressOutputSchema = z.object({
    address: z.string().describe("The activated address"),
    blockchain: z.string().describe("Blockchain protocol"),
    network: z.string().describe("Network name"),
    status: z.string().describe("New status (syncing, synced)"),
    activatedAt: z.number().describe("Unix timestamp when address was activated"),
}).passthrough();

export type ActivateSyncedAddressOutput = z.infer<typeof ActivateSyncedAddressOutputSchema>;

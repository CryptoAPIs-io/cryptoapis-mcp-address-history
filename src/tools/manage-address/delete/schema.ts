import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Delete Synced Address - adds address to base and metadata
 */
export const DeleteSyncedAddressAttributesSchema = z.object({
    address: z.string().describe("Address to delete"),
}).merge(RequestMetadataSchema);

export type DeleteSyncedAddressAttributes = z.infer<typeof DeleteSyncedAddressAttributesSchema>;

/**
 * Delete Synced Address Response
 */
export const DeleteSyncedAddressOutputSchema = z.object({
    address: z.string().describe("The deleted address"),
    blockchain: z.string().describe("Blockchain protocol"),
    network: z.string().describe("Network name"),
    deletedAt: z.number().describe("Unix timestamp when address was deleted"),
}).passthrough();

export type DeleteSyncedAddressOutput = z.infer<typeof DeleteSyncedAddressOutputSchema>;

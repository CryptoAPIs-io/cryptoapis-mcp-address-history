import * as z from "zod";

/**
 * Actions available for UTXO Address History endpoints
 */
export const UtxoAddressAction = z.enum([
    "get-statistics",
    "list-transactions",
    "list-transactions-by-timestamp",
    "list-unspent-outputs",
]);

/**
 * Base request for UTXO address endpoints - only address field
 * Blockchain/network are defined per-endpoint with specific supported values
 */
export const UtxoAddressBaseSchema = z.object({
    address: z.string().describe("Address to query"),
});

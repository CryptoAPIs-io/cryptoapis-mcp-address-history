import * as z from "zod";

/**
 * Actions available for EVM Address History endpoints
 */
export const EvmAddressAction = z.enum([
    "get-statistics",
    "list-transactions",
    "list-transactions-by-timestamp",
    "list-token-transfers",
    "list-internal-transactions",
    "list-tokens",
]);

/**
 * Base request for EVM address endpoints - only address field
 * Blockchain/network are defined per-endpoint with specific supported values
 */
export const EvmAddressBaseSchema = z.object({
    address: z.string().describe("Address to query"),
});

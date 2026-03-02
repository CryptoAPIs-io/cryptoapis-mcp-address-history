import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema, OffsetPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoAddressAction, UtxoAddressBaseSchema } from "./base-schema.js";
import { GetStatisticsOutputSchema } from "./get-statistics/schema.js";
import { ListTransactionsOutputSchema, UtxoTransactionSchema } from "./list-transactions/schema.js";
import { ListTransactionsByTimestampOutputSchema } from "./list-transactions-by-timestamp/schema.js";
import { ListUnspentOutputsOutputSchema, UnspentOutputSchema } from "./list-unspent-outputs/schema.js";

/**
 * Supported UTXO blockchains for Address History (union of all endpoints)
 * Source: https://developers.cryptoapis.io/download/175
 */
export const UtxoBlockchain = z.enum([
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
]);

/**
 * Supported UTXO networks for Address History
 */
export const UtxoNetwork = z.enum([
    "mainnet",
    "testnet",
]);

/**
 * Flat schema for all UTXO address history actions
 * Includes both cursor and offset pagination (different actions use different pagination)
 * - list-transactions, list-transactions-by-timestamp: cursor pagination (startingAfter)
 * - list-unspent-outputs: offset pagination (offset)
 */
export const UtxoAddressToolSchema = z.object({
    action: UtxoAddressAction.describe("Action to perform"),
    blockchain: UtxoBlockchain.describe("Blockchain protocol"),
    network: UtxoNetwork.describe("Network name"),
    timestamp: z.number().int().positive().optional().describe("Unix timestamp (starting point) for list-transactions-by-timestamp action"),
}).merge(UtxoAddressBaseSchema).merge(RequestMetadataSchema).merge(CursorPaginationSchema).merge(OffsetPaginationSchema);

export type UtxoAddressInput = z.infer<typeof UtxoAddressToolSchema>;

// Re-export base schema
export { UtxoAddressAction, UtxoAddressBaseSchema } from "./base-schema.js";

// Re-export output schemas
export { GetStatisticsOutputSchema } from "./get-statistics/schema.js";
export { ListTransactionsOutputSchema, UtxoTransactionSchema } from "./list-transactions/schema.js";
export { ListTransactionsByTimestampOutputSchema } from "./list-transactions-by-timestamp/schema.js";
export { ListUnspentOutputsOutputSchema, UnspentOutputSchema } from "./list-unspent-outputs/schema.js";

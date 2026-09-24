import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema, OffsetPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoAddressAction, UtxoAddressBaseSchema } from "./base-schema.js";
import { GetStatisticsBlockchain, GetStatisticsOutputSchema } from "./get-statistics/schema.js";
import { ListTransactionsBlockchain, ListTransactionsOutputSchema, UtxoTransactionSchema } from "./list-transactions/schema.js";
import { ListTransactionsByTimestampBlockchain, ListTransactionsByTimestampOutputSchema } from "./list-transactions-by-timestamp/schema.js";
import { ListUnspentOutputsBlockchain, ListUnspentOutputsOutputSchema, UnspentOutputSchema } from "./list-unspent-outputs/schema.js";

/**
 * Per-action supported blockchains, sourced from each action's own (spec-derived)
 * enum. Exported so the tool handler can validate the actual action+blockchain
 * combination before calling the API — kept out of the Zod schema itself (no
 * .superRefine()) so MCP clients that introspect inputSchema (e.g. MCP Inspector)
 * can still render plain form fields. Networks are uniform (mainnet/testnet)
 * across all UTXO address-history actions, so no per-action network map is needed.
 */
export const ACTION_BLOCKCHAINS: Record<string, readonly string[]> = {
    "get-statistics": GetStatisticsBlockchain.options,
    "list-transactions": ListTransactionsBlockchain.options,
    "list-transactions-by-timestamp": ListTransactionsByTimestampBlockchain.options,
    "list-unspent-outputs": ListUnspentOutputsBlockchain.options,
};

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
 *
 * `blockchain` is the union across all actions; get-statistics and
 * list-transactions-by-timestamp support only bitcoin/bitcoin-cash per the spec.
 * Enforced in the tool handler via ACTION_BLOCKCHAINS above, not via
 * .superRefine() (breaks inputSchema introspection in MCP clients).
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

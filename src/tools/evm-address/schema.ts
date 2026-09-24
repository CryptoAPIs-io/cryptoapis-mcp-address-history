import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { EvmAddressAction, EvmAddressBaseSchema } from "./base-schema.js";
import { GetStatisticsBlockchain, GetStatisticsNetwork, GetStatisticsOutputSchema } from "./get-statistics/schema.js";
import { ListTransactionsBlockchain, ListTransactionsNetwork, ListTransactionsOutputSchema, TransactionSchema } from "./list-transactions/schema.js";
import { ListTransactionsByTimestampBlockchain, ListTransactionsByTimestampNetwork, ListTransactionsByTimestampOutputSchema } from "./list-transactions-by-timestamp/schema.js";
import { ListTokenTransfersBlockchain, ListTokenTransfersNetwork, ListTokenTransfersOutputSchema, TokenTransferSchema } from "./list-token-transfers/schema.js";
import { ListInternalTransactionsBlockchain, ListInternalTransactionsNetwork, ListInternalTransactionsOutputSchema, InternalTransactionSchema } from "./list-internal-transactions/schema.js";
import { ListTokensBlockchain, ListTokensNetwork, ListTokensOutputSchema, TokenSchema } from "./list-tokens/schema.js";

/**
 * Per-action supported blockchains/networks, sourced from each action's own
 * (spec-derived) enum. Exported so the tool handler can validate the actual
 * action+blockchain+network combination before calling the API — kept out of
 * the Zod schema itself (no .superRefine()) so MCP clients that introspect
 * inputSchema (e.g. MCP Inspector) can still render plain form fields.
 */
export const ACTION_BLOCKCHAINS: Record<string, readonly string[]> = {
    "get-statistics": GetStatisticsBlockchain.options,
    "list-transactions": ListTransactionsBlockchain.options,
    "list-transactions-by-timestamp": ListTransactionsByTimestampBlockchain.options,
    "list-token-transfers": ListTokenTransfersBlockchain.options,
    "list-internal-transactions": ListInternalTransactionsBlockchain.options,
    "list-tokens": ListTokensBlockchain.options,
};

export const ACTION_NETWORKS: Record<string, readonly string[]> = {
    "get-statistics": GetStatisticsNetwork.options,
    "list-transactions": ListTransactionsNetwork.options,
    "list-transactions-by-timestamp": ListTransactionsByTimestampNetwork.options,
    "list-token-transfers": ListTokenTransfersNetwork.options,
    "list-internal-transactions": ListInternalTransactionsNetwork.options,
    "list-tokens": ListTokensNetwork.options,
};

/**
 * Supported EVM blockchains for Address History (union of all endpoints)
 * Source: https://developers.cryptoapis.io/download/175
 */
export const EvmBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "polygon",
    "tron",
]);

/**
 * Supported EVM networks for Address History (union of all endpoints)
 */
export const EvmNetwork = z.enum([
    "mainnet",
    "mordor",
    "testnet",
    "sepolia",
    "amoy",
    "nile",
]);

/**
 * Flat schema for all EVM address history actions.
 *
 * `blockchain`/`network` are the union across all actions; each action supports a
 * narrower subset per the spec (e.g. get-statistics is ethereum/ethereum-classic
 * only, list-transactions also allows binance-smart-chain/polygon/tron). The
 * narrower per-action set is enforced in the tool handler (see ACTION_BLOCKCHAINS/
 * ACTION_NETWORKS above), not via .superRefine() here — cross-field refinement
 * breaks inputSchema introspection in MCP clients like the Inspector.
 */
export const EvmAddressToolSchema = z.object({
    action: EvmAddressAction.describe("Action to perform"),
    blockchain: EvmBlockchain.describe("Blockchain protocol"),
    network: EvmNetwork.describe("Network name"),
    timestamp: z.number().int().positive().optional().describe("Unix timestamp (starting point) for list-transactions-by-timestamp action"),
}).merge(EvmAddressBaseSchema).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type EvmAddressInput = z.infer<typeof EvmAddressToolSchema>;

// Re-export base schema
export { EvmAddressAction, EvmAddressBaseSchema } from "./base-schema.js";

// Re-export output schemas
export { GetStatisticsOutputSchema } from "./get-statistics/schema.js";
export { ListTransactionsOutputSchema, TransactionSchema } from "./list-transactions/schema.js";
export { ListTransactionsByTimestampOutputSchema } from "./list-transactions-by-timestamp/schema.js";
export { ListTokenTransfersOutputSchema, TokenTransferSchema } from "./list-token-transfers/schema.js";
export { ListInternalTransactionsOutputSchema, InternalTransactionSchema } from "./list-internal-transactions/schema.js";
export { ListTokensOutputSchema, TokenSchema } from "./list-tokens/schema.js";

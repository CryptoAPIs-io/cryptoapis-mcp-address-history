import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { EvmAddressAction, EvmAddressBaseSchema } from "./base-schema.js";
import { GetStatisticsOutputSchema } from "./get-statistics/schema.js";
import { ListTransactionsOutputSchema, TransactionSchema } from "./list-transactions/schema.js";
import { ListTransactionsByTimestampOutputSchema } from "./list-transactions-by-timestamp/schema.js";
import { ListTokenTransfersOutputSchema, TokenTransferSchema } from "./list-token-transfers/schema.js";
import { ListInternalTransactionsOutputSchema, InternalTransactionSchema } from "./list-internal-transactions/schema.js";
import { ListTokensOutputSchema, TokenSchema } from "./list-tokens/schema.js";

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
 * Flat schema for all EVM address history actions
 * API will validate specific action+blockchain+network combinations
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

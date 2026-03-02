import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoTransactionSchema } from "../list-transactions/schema.js";

/**
 * Supported blockchains for List Transactions By Timestamp UTXO History
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ListTransactionsByTimestampBlockchain = z.enum([
    "bitcoin",
    "bitcoin-cash",
]);

/**
 * Supported networks for List Transactions By Timestamp UTXO History
 */
export const ListTransactionsByTimestampNetwork = z.enum([
    "mainnet",
    "testnet",
]);

/**
 * List Transactions By Timestamp - includes blockchain/network specific to this endpoint
 */
export const ListTransactionsByTimestampAttributesSchema = z.object({
    blockchain: ListTransactionsByTimestampBlockchain.describe("Blockchain protocol"),
    network: ListTransactionsByTimestampNetwork.describe("Network name"),
    timestamp: z.number().int().positive().describe("Unix timestamp (starting point) to list transactions from"),
}).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type ListTransactionsByTimestampAttributes = z.infer<typeof ListTransactionsByTimestampAttributesSchema>;

/**
 * List Transactions By Timestamp Response
 */
export const ListTransactionsByTimestampOutputSchema = z.object({
    items: z.array(UtxoTransactionSchema).describe("List of transactions"),
    limit: z.number().describe("Number of items returned"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTransactionsByTimestampOutput = z.infer<typeof ListTransactionsByTimestampOutputSchema>;

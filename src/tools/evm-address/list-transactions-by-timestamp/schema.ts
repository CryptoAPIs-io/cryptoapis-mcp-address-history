import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { TransactionSchema } from "../list-transactions/schema.js";

/**
 * Supported blockchains for List Transactions By Timestamp EVM History
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ListTransactionsByTimestampBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
]);

/**
 * Supported networks for List Transactions By Timestamp EVM History
 */
export const ListTransactionsByTimestampNetwork = z.enum([
    "mainnet",
    "sepolia",
    "mordor",
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
    items: z.array(TransactionSchema).describe("List of transactions"),
    limit: z.number().describe("Number of items returned"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTransactionsByTimestampOutput = z.infer<typeof ListTransactionsByTimestampOutputSchema>;

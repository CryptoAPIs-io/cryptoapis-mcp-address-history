import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains for List Transactions UTXO History
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ListTransactionsBlockchain = z.enum([
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
]);

/**
 * Supported networks for List Transactions UTXO History
 */
export const ListTransactionsNetwork = z.enum([
    "mainnet",
    "testnet",
]);

/**
 * List Transactions - includes blockchain/network specific to this endpoint
 */
export const ListTransactionsAttributesSchema = z.object({
    blockchain: ListTransactionsBlockchain.describe("Blockchain protocol"),
    network: ListTransactionsNetwork.describe("Network name"),
}).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type ListTransactionsAttributes = z.infer<typeof ListTransactionsAttributesSchema>;

/**
 * UTXO Transaction item in response
 */
export const UtxoTransactionSchema = z.object({
    transactionId: z.string().describe("Transaction ID"),
    blockHeight: z.number().describe("Block number"),
    blockTimestamp: z.number().describe("Unix timestamp of the block"),
    fee: z.object({
        amount: z.string().describe("Transaction fee"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Transaction fee"),
    inputs: z.array(z.object({
        address: z.string().describe("Input address"),
        value: z.object({
            amount: z.string().describe("Input value"),
            unit: z.string().describe("Currency unit"),
        }).passthrough(),
    }).passthrough()).describe("Transaction inputs"),
    outputs: z.array(z.object({
        address: z.string().describe("Output address"),
        value: z.object({
            amount: z.string().describe("Output value"),
            unit: z.string().describe("Currency unit"),
        }).passthrough(),
    }).passthrough()).describe("Transaction outputs"),
}).passthrough();

/**
 * List Transactions Response
 */
export const ListTransactionsOutputSchema = z.object({
    items: z.array(UtxoTransactionSchema).describe("List of transactions"),
    limit: z.number().describe("Number of items returned"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTransactionsOutput = z.infer<typeof ListTransactionsOutputSchema>;

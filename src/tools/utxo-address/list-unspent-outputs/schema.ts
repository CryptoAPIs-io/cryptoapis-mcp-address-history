import * as z from "zod";
import { RequestMetadataSchema, OffsetPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains for List Unspent Outputs UTXO History
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ListUnspentOutputsBlockchain = z.enum([
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
]);

/**
 * Supported networks for List Unspent Outputs UTXO History
 */
export const ListUnspentOutputsNetwork = z.enum([
    "mainnet",
    "testnet",
]);

/**
 * List Unspent Outputs - includes blockchain/network specific to this endpoint
 * NOTE: This endpoint uses OFFSET pagination, not cursor pagination
 */
export const ListUnspentOutputsAttributesSchema = z.object({
    blockchain: ListUnspentOutputsBlockchain.describe("Blockchain protocol"),
    network: ListUnspentOutputsNetwork.describe("Network name"),
}).merge(RequestMetadataSchema).merge(OffsetPaginationSchema);

export type ListUnspentOutputsAttributes = z.infer<typeof ListUnspentOutputsAttributesSchema>;

/**
 * Unspent output (UTXO) item in response
 */
export const UnspentOutputSchema = z.object({
    transactionId: z.string().describe("Transaction ID that created this output"),
    index: z.number().describe("Output index in the transaction"),
    amount: z.object({
        amount: z.string().describe("UTXO value"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("UTXO value"),
    address: z.string().describe("Address holding the UTXO"),
    blockHeight: z.number().describe("Block number where UTXO was created"),
    blockTimestamp: z.number().describe("Unix timestamp of the block"),
    isConfirmed: z.boolean().describe("Whether the UTXO is confirmed"),
}).passthrough();

/**
 * List Unspent Outputs Response - offset paginated
 */
export const ListUnspentOutputsOutputSchema = z.object({
    items: z.array(UnspentOutputSchema).describe("List of unspent outputs (UTXOs)"),
    limit: z.number().describe("Number of items returned"),
    offset: z.number().describe("Current offset"),
    total: z.number().describe("Total number of items"),
}).passthrough();

export type ListUnspentOutputsOutput = z.infer<typeof ListUnspentOutputsOutputSchema>;

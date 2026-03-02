import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains for Get Statistics EVM History
 * Source: https://developers.cryptoapis.io/download/175
 */
export const GetStatisticsBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
]);

/**
 * Supported networks for Get Statistics EVM History
 */
export const GetStatisticsNetwork = z.enum([
    "mainnet",
    "sepolia",
    "mordor",
]);

/**
 * Get Statistics - includes blockchain/network specific to this endpoint
 */
export const GetStatisticsAttributesSchema = z.object({
    blockchain: GetStatisticsBlockchain.describe("Blockchain protocol"),
    network: GetStatisticsNetwork.describe("Network name"),
}).merge(RequestMetadataSchema);

export type GetStatisticsAttributes = z.infer<typeof GetStatisticsAttributesSchema>;

/**
 * Get Statistics Response
 */
export const GetStatisticsOutputSchema = z.object({
    transactionsCount: z.number().describe("Total number of transactions"),
    confirmedBalance: z.object({
        amount: z.string().describe("Balance amount"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Confirmed balance of the address"),
    firstSeenInBlockTimestamp: z.number().describe("Unix timestamp of first transaction"),
    lastSeenInBlockTimestamp: z.number().describe("Unix timestamp of last transaction"),
}).passthrough();

export type GetStatisticsOutput = z.infer<typeof GetStatisticsOutputSchema>;

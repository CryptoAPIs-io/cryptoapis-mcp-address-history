import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains for List Tokens EVM History
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ListTokensBlockchain = z.enum([
    "ethereum",
    "polygon",
    "tron",
    "ethereum-classic",
    "binance-smart-chain",
]);

/**
 * Supported networks for List Tokens EVM History
 */
export const ListTokensNetwork = z.enum([
    "mainnet",
    "sepolia",
    "amoy",
    "nile",
    "mordor",
    "testnet",
]);

/**
 * List Tokens - includes blockchain/network specific to this endpoint
 */
export const ListTokensAttributesSchema = z.object({
    blockchain: ListTokensBlockchain.describe("Blockchain protocol"),
    network: ListTokensNetwork.describe("Network name"),
}).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type ListTokensAttributes = z.infer<typeof ListTokensAttributesSchema>;

/**
 * Token item in response
 */
export const TokenSchema = z.object({
    tokenContractAddress: z.string().describe("Token contract address"),
    tokenType: z.string().describe("Token type (ERC-20, ERC-721, ERC-1155)"),
    tokenName: z.string().optional().describe("Token name"),
    tokenSymbol: z.string().optional().describe("Token symbol"),
    tokenDecimals: z.number().optional().describe("Token decimals"),
    balance: z.string().describe("Token balance"),
    tokenId: z.string().optional().describe("Token ID (for NFTs)"),
}).passthrough();

/**
 * List Tokens Response
 */
export const ListTokensOutputSchema = z.object({
    items: z.array(TokenSchema).describe("List of tokens held by address"),
    limit: z.number().describe("Number of items returned"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTokensOutput = z.infer<typeof ListTokensOutputSchema>;

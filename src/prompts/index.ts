import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { formatSupportedChains } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "../resources/supported-chains.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "sync-and-query-history",
        {
            description: "Sync an address for history tracking and query its transaction history",
            argsSchema: {
                blockchain: z.string().describe("Blockchain protocol (e.g. ethereum, bitcoin)"),
                network: z.string().describe("Network name (e.g. mainnet, testnet, sepolia)"),
                address: z.string().describe("Blockchain address to sync and query"),
            },
        },
        (args): GetPromptResult => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `First use manage_address with action 'sync' to start syncing address ${args.address} on ${args.blockchain}/${args.network}. This will begin continuous monitoring with daily credit costs. Once synced, use evm_address_history or utxo_address_history (depending on the blockchain family) to query the full transaction history. Available history actions include listing transactions, token transfers, internal transactions, and getting statistics.\n\n${formatSupportedChains(supportedChains)}`,
                    },
                },
            ],
        }),
    );
}

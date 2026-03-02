import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import { EVM_BLOCKCHAIN_NETWORK_DESCRIPTION } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { EvmAddressToolSchema, type EvmAddressInput } from "./schema.js";
import { handleGetStatistics } from "./get-statistics/index.js";
import { credits as getStatisticsCredits } from "./get-statistics/credits.js";
import { handleListTransactions } from "./list-transactions/index.js";
import { credits as listTransactionsCredits } from "./list-transactions/credits.js";
import { handleListTransactionsByTimestamp } from "./list-transactions-by-timestamp/index.js";
import { credits as listTransactionsByTimestampCredits } from "./list-transactions-by-timestamp/credits.js";
import { handleListTokenTransfers } from "./list-token-transfers/index.js";
import { credits as listTokenTransfersCredits } from "./list-token-transfers/credits.js";
import { handleListInternalTransactions } from "./list-internal-transactions/index.js";
import { credits as listInternalTransactionsCredits } from "./list-internal-transactions/credits.js";
import { handleListTokens } from "./list-tokens/index.js";
import { credits as listTokensCredits } from "./list-tokens/credits.js";

export const evmAddressTool: McpToolDef<typeof EvmAddressToolSchema> = {
    name: "evm_address_history",
    description: `Query EVM address full history (requires synced address). Cursor pagination: use 'nextStartingAfter' from response as 'startingAfter'.

Actions & supported blockchains:
• get-statistics: ethereum, ethereum-classic
• list-transactions: ethereum, ethereum-classic, binance-smart-chain, polygon, tron
• list-transactions-by-timestamp: ethereum, ethereum-classic (requires timestamp)
• list-token-transfers: ethereum, polygon, tron, ethereum-classic, binance-smart-chain
• list-internal-transactions: ethereum, polygon, tron, ethereum-classic, binance-smart-chain
• list-tokens: ethereum, polygon, tron, ethereum-classic, binance-smart-chain

${EVM_BLOCKCHAIN_NETWORK_DESCRIPTION}`,
    credits: {
        "get-statistics": getStatisticsCredits,
        "list-internal-transactions": listInternalTransactionsCredits,
        "list-token-transfers": listTokenTransfersCredits,
        "list-tokens": listTokensCredits,
        "list-transactions": listTransactionsCredits,
        "list-transactions-by-timestamp": listTransactionsByTimestampCredits,
    },
    inputSchema: EvmAddressToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: EvmAddressInput) => {
            let result: RequestResult<unknown>;

            const baseParams = {
                blockchain: input.blockchain,
                network: input.network,
                address: input.address,
                context: input.context,
            };

            switch (input.action) {
                case "get-statistics":
                    result = await handleGetStatistics(client, baseParams);
                    break;
                case "list-transactions":
                    result = await handleListTransactions(client, {
                        ...baseParams,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                        sortingOrder: input.sortingOrder,
                    });
                    break;
                case "list-transactions-by-timestamp":
                    result = await handleListTransactionsByTimestamp(client, {
                        ...baseParams,
                        timestamp: input.timestamp!,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                        sortingOrder: input.sortingOrder,
                    });
                    break;
                case "list-token-transfers":
                    result = await handleListTokenTransfers(client, {
                        ...baseParams,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                        sortingOrder: input.sortingOrder,
                    });
                    break;
                case "list-internal-transactions":
                    result = await handleListInternalTransactions(client, {
                        ...baseParams,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                        sortingOrder: input.sortingOrder,
                    });
                    break;
                case "list-tokens":
                    result = await handleListTokens(client, {
                        ...baseParams,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                    });
                    break;
            }

            return {
                content: [{ type: "text", text: JSON.stringify({
                    ...(result.data as object),
                    creditsConsumed: result.creditsConsumed,
                    creditsAvailable: result.creditsAvailable,
                    responseTime: result.responseTime,
                    throughputUsage: result.throughputUsage,
                }) }],
            };
        },
};

export { EvmAddressToolSchema, type EvmAddressInput } from "./schema.js";

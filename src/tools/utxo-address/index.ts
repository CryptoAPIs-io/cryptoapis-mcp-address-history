import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import { UTXO_BLOCKCHAIN_NETWORK_DESCRIPTION } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { UtxoAddressToolSchema, type UtxoAddressInput } from "./schema.js";
import { handleGetStatistics } from "./get-statistics/index.js";
import { credits as getStatisticsCredits } from "./get-statistics/credits.js";
import { handleListTransactions } from "./list-transactions/index.js";
import { credits as listTransactionsCredits } from "./list-transactions/credits.js";
import { handleListTransactionsByTimestamp } from "./list-transactions-by-timestamp/index.js";
import { credits as listTransactionsByTimestampCredits } from "./list-transactions-by-timestamp/credits.js";
import { handleListUnspentOutputs } from "./list-unspent-outputs/index.js";
import { credits as listUnspentOutputsCredits } from "./list-unspent-outputs/credits.js";

export const utxoAddressTool: McpToolDef<typeof UtxoAddressToolSchema> = {
    name: "utxo_address_history",
    description: `Query UTXO address full history (requires synced address).

Pagination:
• list-transactions, list-transactions-by-timestamp: cursor pagination (use 'nextStartingAfter' → 'startingAfter')
• list-unspent-outputs: offset pagination (use 'offset', response has 'total')

Actions & supported blockchains:
• get-statistics: bitcoin, bitcoin-cash
• list-transactions: bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash
• list-transactions-by-timestamp: bitcoin, bitcoin-cash (requires timestamp)
• list-unspent-outputs: bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash (uses offset pagination)

${UTXO_BLOCKCHAIN_NETWORK_DESCRIPTION}`,
    credits: {
        "get-statistics": getStatisticsCredits,
        "list-transactions": listTransactionsCredits,
        "list-transactions-by-timestamp": listTransactionsByTimestampCredits,
        "list-unspent-outputs": listUnspentOutputsCredits,
    },
    inputSchema: UtxoAddressToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: UtxoAddressInput) => {
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
                    });
                    break;
                case "list-transactions-by-timestamp":
                    result = await handleListTransactionsByTimestamp(client, {
                        ...baseParams,
                        timestamp: input.timestamp!,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                    });
                    break;
                case "list-unspent-outputs":
                    result = await handleListUnspentOutputs(client, {
                        ...baseParams,
                        limit: input.limit,
                        offset: input.offset,
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

export { UtxoAddressToolSchema, type UtxoAddressInput } from "./schema.js";

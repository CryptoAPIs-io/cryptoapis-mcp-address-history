import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listTransactionsByTimestamp } from "../../../api/utxo-address/index.js";

export async function handleListTransactionsByTimestamp(
    client: CryptoApisHttpClient,
    input: {
        blockchain: string;
        network: string;
        address: string;
        timestamp: number;
        context?: string;
        limit?: number;
        startingAfter?: string;
    }
) {
    return listTransactionsByTimestamp(client, input);
}

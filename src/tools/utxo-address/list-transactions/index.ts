import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listTransactions } from "../../../api/utxo-address/index.js";

export async function handleListTransactions(
    client: CryptoApisHttpClient,
    input: { blockchain: string; network: string; address: string; context?: string; limit?: number; startingAfter?: string }
) {
    return listTransactions(client, input);
}

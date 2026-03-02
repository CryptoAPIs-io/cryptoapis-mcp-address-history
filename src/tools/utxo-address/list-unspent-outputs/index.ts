import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listUnspentOutputs } from "../../../api/utxo-address/index.js";

export async function handleListUnspentOutputs(
    client: CryptoApisHttpClient,
    input: { blockchain: string; network: string; address: string; context?: string; limit?: number; offset?: number }
) {
    return listUnspentOutputs(client, input);
}

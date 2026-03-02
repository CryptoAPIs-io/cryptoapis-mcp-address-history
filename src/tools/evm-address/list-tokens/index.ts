import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listTokens } from "../../../api/evm-address/index.js";

export async function handleListTokens(
    client: CryptoApisHttpClient,
    input: { blockchain: string; network: string; address: string; context?: string; limit?: number; startingAfter?: string }
) {
    return listTokens(client, input);
}

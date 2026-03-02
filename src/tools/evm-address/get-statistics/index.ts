import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { getStatistics } from "../../../api/evm-address/index.js";

export async function handleGetStatistics(
    client: CryptoApisHttpClient,
    input: { blockchain: string; network: string; address: string; context?: string }
) {
    return getStatistics(client, input);
}

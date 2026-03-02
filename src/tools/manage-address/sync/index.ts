import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { syncAddress } from "../../../api/manage-address/index.js";

export async function handleSync(
    client: CryptoApisHttpClient,
    input: { blockchain: string; network: string; address: string; context?: string }
) {
    return syncAddress(client, input);
}

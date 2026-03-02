import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listSyncedAddresses } from "../../../api/manage-address/index.js";

export async function handleList(
    client: CryptoApisHttpClient,
    input: { blockchain: string; network: string; context?: string; limit?: number; startingAfter?: string }
) {
    return listSyncedAddresses(client, input);
}

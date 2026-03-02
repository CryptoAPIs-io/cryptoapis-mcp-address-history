import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { deleteSyncedAddress } from "../../../api/manage-address/index.js";

export async function handleDelete(
    client: CryptoApisHttpClient,
    input: { blockchain: string; network: string; address: string; context?: string }
) {
    return deleteSyncedAddress(client, input);
}

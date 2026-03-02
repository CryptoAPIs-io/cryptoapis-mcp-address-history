import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { activateSyncedAddress } from "../../../api/manage-address/index.js";

export async function handleActivate(
    client: CryptoApisHttpClient,
    input: { blockchain: string; network: string; address: string; context?: string }
) {
    return activateSyncedAddress(client, input);
}

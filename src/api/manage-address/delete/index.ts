import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { DeleteSyncedAddressRequest } from "./types.js";

export type DeleteSyncedAddressInput = DeleteSyncedAddressRequest & RequestMetadata;

export async function deleteSyncedAddress(client: CryptoApisHttpClient, input: DeleteSyncedAddressInput) {
    const { blockchain, network, address, context } = input;
    const path = `/addresses-historical/manage/${blockchain}/${network}/${address}`;

    return client.request<unknown>("DELETE", path, { query: { context } });
}

import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { ActivateSyncedAddressRequest } from "./types.js";

export type ActivateSyncedAddressInput = ActivateSyncedAddressRequest & RequestMetadata;

export async function activateSyncedAddress(client: CryptoApisHttpClient, input: ActivateSyncedAddressInput) {
    const { blockchain, network, address, context } = input;
    const path = `/addresses-historical/manage/${blockchain}/${network}/${address}/activate`;

    return client.request<unknown>("POST", path, {
        query: { context },
        body: { data: { item: {} } },
    });
}


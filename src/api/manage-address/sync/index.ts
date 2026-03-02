import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { SyncAddressRequest } from "./types.js";

export type SyncAddressInput = SyncAddressRequest & RequestMetadata;

export async function syncAddress(client: CryptoApisHttpClient, input: SyncAddressInput) {
    const { blockchain, network, address, context } = input;
    const path = `/addresses-historical/manage/${blockchain}/${network}`;

    return client.request<unknown>("POST", path, {
        query: { context },
        body: { data: { item: { address } } },
    });
}

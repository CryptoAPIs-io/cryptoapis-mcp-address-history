import type { CryptoApisHttpClient, RequestMetadata, CursorPaginationParams } from "@cryptoapis-io/mcp-shared";
import type { ListSyncedAddressesRequest } from "./types.js";

export type ListSyncedAddressesInput = ListSyncedAddressesRequest & RequestMetadata & CursorPaginationParams;

export async function listSyncedAddresses(client: CryptoApisHttpClient, input: ListSyncedAddressesInput) {
    const { blockchain, network } = input;
    const path = `/addresses-historical/manage/${blockchain}/${network}`;

    const metadata: RequestMetadata = { context: input.context };
    const pagination: CursorPaginationParams = { limit: input.limit, startingAfter: input.startingAfter };

    return client.request<unknown>("GET", path, { query: { ...metadata, ...pagination } });
}

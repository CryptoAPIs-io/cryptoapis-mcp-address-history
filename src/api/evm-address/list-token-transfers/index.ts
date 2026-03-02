import type { CryptoApisHttpClient, RequestMetadata, CursorPaginationParams } from "@cryptoapis-io/mcp-shared";
import type { ListTokenTransfersRequest } from "./types.js";

export type ListTokenTransfersInput = ListTokenTransfersRequest & RequestMetadata & CursorPaginationParams;

export async function listTokenTransfers(client: CryptoApisHttpClient, input: ListTokenTransfersInput) {
    const { blockchain, network, address } = input;
    const path = `/addresses-historical/evm/${blockchain}/${network}/${address}/tokens-transfers`;

    const metadata: RequestMetadata = { context: input.context };
    const pagination: CursorPaginationParams = { limit: input.limit, startingAfter: input.startingAfter, sortingOrder: input.sortingOrder };

    return client.request<unknown>("GET", path, { query: { ...metadata, ...pagination } });
}

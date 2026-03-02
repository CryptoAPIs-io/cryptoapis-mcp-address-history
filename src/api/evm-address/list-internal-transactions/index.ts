import type { CryptoApisHttpClient, RequestMetadata, CursorPaginationParams } from "@cryptoapis-io/mcp-shared";
import type { ListInternalTransactionsRequest } from "./types.js";

export type ListInternalTransactionsInput = ListInternalTransactionsRequest & RequestMetadata & CursorPaginationParams;

export async function listInternalTransactions(client: CryptoApisHttpClient, input: ListInternalTransactionsInput) {
    const { blockchain, network, address } = input;
    const path = `/addresses-historical/evm/${blockchain}/${network}/${address}/internal-transactions`;

    const metadata: RequestMetadata = { context: input.context };
    const pagination: CursorPaginationParams = { limit: input.limit, startingAfter: input.startingAfter, sortingOrder: input.sortingOrder };

    return client.request<unknown>("GET", path, { query: { ...metadata, ...pagination } });
}

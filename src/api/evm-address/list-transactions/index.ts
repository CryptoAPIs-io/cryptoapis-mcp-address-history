import type { CryptoApisHttpClient, RequestMetadata, CursorPaginationParams } from "@cryptoapis-io/mcp-shared";
import type { ListTransactionsRequest } from "./types.js";

export type ListTransactionsInput = ListTransactionsRequest & RequestMetadata & CursorPaginationParams;

export async function listTransactions(client: CryptoApisHttpClient, input: ListTransactionsInput) {
    const { blockchain, network, address } = input;
    const path = `/addresses-historical/evm/${blockchain}/${network}/${address}/transactions`;

    const metadata: RequestMetadata = { context: input.context };
    const pagination: CursorPaginationParams = { limit: input.limit, startingAfter: input.startingAfter, sortingOrder: input.sortingOrder };

    return client.request<unknown>("GET", path, { query: { ...metadata, ...pagination } });
}

import type { CryptoApisHttpClient, RequestMetadata, CursorPaginationParams } from "@cryptoapis-io/mcp-shared";
import type { ListTokensRequest } from "./types.js";

export type ListTokensInput = ListTokensRequest & RequestMetadata & CursorPaginationParams;

export async function listTokens(client: CryptoApisHttpClient, input: ListTokensInput) {
    const { blockchain, network, address } = input;
    const path = `/addresses-historical/evm/${blockchain}/${network}/${address}/tokens`;

    const metadata: RequestMetadata = { context: input.context };
    const pagination: CursorPaginationParams = { limit: input.limit, startingAfter: input.startingAfter };

    return client.request<unknown>("GET", path, { query: { ...metadata, ...pagination } });
}

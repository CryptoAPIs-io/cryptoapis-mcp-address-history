import type { CryptoApisHttpClient, RequestMetadata, CursorPaginationParams } from "@cryptoapis-io/mcp-shared";
import type { ListTransactionsByTimestampRequest } from "./types.js";

export type ListTransactionsByTimestampInput = ListTransactionsByTimestampRequest & RequestMetadata & CursorPaginationParams;

export async function listTransactionsByTimestamp(client: CryptoApisHttpClient, input: ListTransactionsByTimestampInput) {
    const { blockchain, network, address, timestamp } = input;
    const path = `/addresses-historical/utxo/${blockchain}/${network}/${address}/transactions/from-timestamp/${timestamp}`;

    return client.request<unknown>("GET", path, { 
        query: { 
            context: input.context, 
            limit: input.limit, 
            startingAfter: input.startingAfter 
        } 
    });
}

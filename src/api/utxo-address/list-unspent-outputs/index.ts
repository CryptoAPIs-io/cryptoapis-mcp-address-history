import type { CryptoApisHttpClient, RequestMetadata, OffsetPaginationParams } from "@cryptoapis-io/mcp-shared";
import type { ListUnspentOutputsRequest } from "./types.js";

export type ListUnspentOutputsInput = ListUnspentOutputsRequest & RequestMetadata & OffsetPaginationParams;

export async function listUnspentOutputs(client: CryptoApisHttpClient, input: ListUnspentOutputsInput) {
    const { blockchain, network, address } = input;
    const path = `/addresses-historical/utxo/${blockchain}/${network}/${address}/unspent-outputs`;

    const metadata: RequestMetadata = { context: input.context };
    const pagination: OffsetPaginationParams = { limit: input.limit, offset: input.offset };

    return client.request<unknown>("GET", path, { query: { ...metadata, ...pagination } });
}

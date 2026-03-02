import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { GetStatisticsRequest } from "./types.js";

export type GetStatisticsInput = GetStatisticsRequest & RequestMetadata;

export async function getStatistics(client: CryptoApisHttpClient, input: GetStatisticsInput) {
    const { blockchain, network, address } = input;
    const path = `/addresses-historical/evm/${blockchain}/${network}/${address}/statistics`;

    const metadata: RequestMetadata = { context: input.context };

    return client.request<unknown>("GET", path, { query: { ...metadata } });
}

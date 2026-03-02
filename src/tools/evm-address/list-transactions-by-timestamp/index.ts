import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listTransactionsByTimestamp, type ListTransactionsByTimestampInput } from "../../../api/evm-address/index.js";

export async function handleListTransactionsByTimestamp(
    client: CryptoApisHttpClient,
    input: ListTransactionsByTimestampInput
) {
    return listTransactionsByTimestamp(client, input);
}

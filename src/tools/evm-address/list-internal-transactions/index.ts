import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listInternalTransactions, type ListInternalTransactionsInput } from "../../../api/evm-address/index.js";

export async function handleListInternalTransactions(
    client: CryptoApisHttpClient,
    input: ListInternalTransactionsInput
) {
    return listInternalTransactions(client, input);
}

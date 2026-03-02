import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    "binance-smart-chain": 325,
    ethereum: 130,
    "ethereum-classic": 169,
    polygon: 260,
    tron: 195,
};

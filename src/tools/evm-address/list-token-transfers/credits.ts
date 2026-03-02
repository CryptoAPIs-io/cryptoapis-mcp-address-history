import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    "binance-smart-chain": 575,
    ethereum: 230,
    "ethereum-classic": 299,
    polygon: 460,
    tron: 345,
};

import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    "binance-smart-chain": 825,
    ethereum: 330,
    "ethereum-classic": 429,
    polygon: 660,
    tron: 495,
};

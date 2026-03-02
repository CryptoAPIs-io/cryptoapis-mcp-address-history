import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    bitcoin: 130,
    "bitcoin-cash": 169,
    dash: 143,
    dogecoin: 143,
    litecoin: 143,
    zcash: 169,
};

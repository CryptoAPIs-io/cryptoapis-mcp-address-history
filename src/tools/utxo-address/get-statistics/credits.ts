import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    bitcoin: 530,
    "bitcoin-cash": 689,
    dash: 583,
    dogecoin: 583,
    litecoin: 583,
    zcash: 689,
};

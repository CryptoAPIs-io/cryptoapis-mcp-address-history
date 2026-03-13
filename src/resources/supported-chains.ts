import type { SupportedChainsResource } from "@cryptoapis-io/mcp-shared";

/**
 * Supported chains resource for address-history package.
 *
 * Separate sections for historyActions (evm/utxo query tools) and
 * managementActions (manage_address tool) per blockchain family.
 *
 * Blockchain→action mappings are derived from the tool descriptions and schemas.
 */
export const supportedChains: SupportedChainsResource = {
    evm: {
        blockchains: ["ethereum", "ethereum-classic", "binance-smart-chain", "polygon", "tron"],
        networks: {
            ethereum: ["mainnet", "sepolia"],
            "ethereum-classic": ["mainnet", "mordor"],
            "binance-smart-chain": ["mainnet", "testnet"],
            polygon: ["mainnet", "amoy"],
            tron: ["mainnet", "nile"],
        },
        actions: {
            "get-statistics": ["ethereum", "ethereum-classic"],
            "list-transactions": ["ethereum", "ethereum-classic", "binance-smart-chain", "polygon", "tron"],
            "list-transactions-by-timestamp": ["ethereum", "ethereum-classic"],
            "list-token-transfers": ["ethereum", "polygon", "tron", "ethereum-classic", "binance-smart-chain"],
            "list-internal-transactions": ["ethereum", "polygon", "tron", "ethereum-classic", "binance-smart-chain"],
            "list-tokens": ["ethereum", "polygon", "tron", "ethereum-classic", "binance-smart-chain"],
            sync: ["ethereum", "ethereum-classic", "binance-smart-chain", "polygon", "tron"],
            list: ["ethereum", "ethereum-classic", "binance-smart-chain", "polygon", "tron"],
            activate: ["ethereum", "ethereum-classic", "binance-smart-chain", "polygon", "tron"],
            delete: ["ethereum", "ethereum-classic", "binance-smart-chain", "polygon", "tron"],
        },
    },
    utxo: {
        blockchains: ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
        networks: {
            bitcoin: ["mainnet", "testnet"],
            "bitcoin-cash": ["mainnet", "testnet"],
            litecoin: ["mainnet", "testnet"],
            dogecoin: ["mainnet", "testnet"],
            dash: ["mainnet", "testnet"],
            zcash: ["mainnet", "testnet"],
        },
        actions: {
            "get-statistics": ["bitcoin", "bitcoin-cash"],
            "list-transactions": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "list-transactions-by-timestamp": ["bitcoin", "bitcoin-cash"],
            "list-unspent-outputs": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            sync: ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            list: ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            activate: ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            delete: ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
        },
    },
};

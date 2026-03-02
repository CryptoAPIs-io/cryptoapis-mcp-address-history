import * as z from "zod";

/**
 * Actions available for Manage Address endpoints
 */
export const ManageAddressAction = z.enum([
    "sync",
    "list",
    "activate",
    "delete",
]);

/**
 * Supported blockchains for Manage Address
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ManageAddressBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "polygon",
    "tron",
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
]);

/**
 * Supported networks for Manage Address
 */
export const ManageAddressNetwork = z.enum([
    "mainnet",
    "testnet",
    "sepolia",
    "amoy",
    "nile",
    "mordor",
]);

/**
 * Base request for manage address endpoints
 */
export const ManageAddressBaseSchema = z.object({
    blockchain: ManageAddressBlockchain.describe("Blockchain protocol"),
    network: ManageAddressNetwork.describe("Network name"),
});

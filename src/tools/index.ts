import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { manageAddressTool } from "./manage-address/index.js";
import { evmAddressTool } from "./evm-address/index.js";
import { utxoAddressTool } from "./utxo-address/index.js";

export const tools = [manageAddressTool, evmAddressTool, utxoAddressTool, systemInfoTool] as const;

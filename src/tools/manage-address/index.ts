import type { CryptoApisHttpClient, RequestResult, DangerousActionMap } from "@cryptoapis-io/mcp-shared";
import {
    BLOCKCHAIN_NETWORK_DESCRIPTION,
    requiresConfirmation,
    buildConfirmationPreview,
    formatDangerousActionsWarning,
} from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { ManageAddressToolSchema, type ManageAddressInput } from "./schema.js";
import { handleSync } from "./sync/index.js";
import { credits as syncCredits } from "./sync/credits.js";
import { handleList } from "./list/index.js";
import { credits as listCredits } from "./list/credits.js";
import { handleActivate } from "./activate/index.js";
import { credits as activateCredits } from "./activate/credits.js";
import { handleDelete } from "./delete/index.js";
import { credits as deleteCredits } from "./delete/credits.js";

const DANGEROUS_ACTIONS: DangerousActionMap = {
    sync: {
        warning: "Syncing an address starts continuous monitoring with daily credit costs.",
        impact: "Daily monitoring tax will be charged per address. One-time processing tax per indexed transaction. Use system_info(action='credits') for exact costs per blockchain.",
    },
    activate: {
        warning: "Reactivating an address resumes monitoring and daily credit charges.",
        impact: "Daily monitoring tax will resume for this address.",
    },
    delete: {
        warning: "Deleting a synced address permanently stops monitoring.",
        impact: "Monitoring will stop and the address will need to be re-synced to resume tracking.",
    },
};

const ACTION_CREDITS: Record<string, number> = {
    sync: syncCredits,
    activate: activateCredits,
    delete: deleteCredits,
};

export const manageAddressTool: McpToolDef<typeof ManageAddressToolSchema> = {
    name: "manage_address",
    description: `Manage synced addresses for Address History APIs. Cursor pagination for 'list': use 'nextStartingAfter' as 'startingAfter'.

Actions:
• sync: Add new address to sync (requires 'address')
• list: Get all synced addresses for blockchain/network
• activate: Reactivate a paused address (requires 'address')
• delete: Remove synced address (requires 'address')

${BLOCKCHAIN_NETWORK_DESCRIPTION}${formatDangerousActionsWarning(DANGEROUS_ACTIONS)}`,
    credits: {
        activate: activateCredits,
        delete: deleteCredits,
        list: listCredits,
        sync: syncCredits,
    },
    inputSchema: ManageAddressToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: ManageAddressInput) => {
            const dangerousAction = await requiresConfirmation(input.action, DANGEROUS_ACTIONS, input.confirmationToken);
            if (dangerousAction) {
                return await buildConfirmationPreview(input.action, dangerousAction, ACTION_CREDITS[input.action]);
            }

            let result: RequestResult<unknown>;

            switch (input.action) {
                case "sync":
                    result = await handleSync(client, {
                        blockchain: input.blockchain,
                        network: input.network,
                        address: input.address!,
                        context: input.context,
                    });
                    break;
                case "list":
                    result = await handleList(client, {
                        blockchain: input.blockchain,
                        network: input.network,
                        context: input.context,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                    });
                    break;
                case "activate":
                    result = await handleActivate(client, {
                        blockchain: input.blockchain,
                        network: input.network,
                        address: input.address!,
                        context: input.context,
                    });
                    break;
                case "delete":
                    result = await handleDelete(client, {
                        blockchain: input.blockchain,
                        network: input.network,
                        address: input.address!,
                        context: input.context,
                    });
                    break;
            }

            return {
                content: [{ type: "text", text: JSON.stringify({
                    ...(result.data as object),
                    creditsConsumed: result.creditsConsumed,
                    creditsAvailable: result.creditsAvailable,
                    responseTime: result.responseTime,
                    throughputUsage: result.throughputUsage,
                }) }],
            };
        },
};

export { ManageAddressToolSchema, type ManageAddressInput } from "./schema.js";

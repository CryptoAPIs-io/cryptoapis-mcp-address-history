import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema, ConfirmationSchema } from "@cryptoapis-io/mcp-shared";
import { ManageAddressAction, ManageAddressBaseSchema } from "./base-schema.js";

/**
 * Combined schema for all manage address actions - using simple object instead of discriminated union
 */
export const ManageAddressToolSchema = z.object({
    action: ManageAddressAction.describe("Action to perform: sync, list, activate, delete"),
    address: z.string().optional().describe("Address (required for sync, activate, delete)"),
}).merge(ManageAddressBaseSchema).merge(RequestMetadataSchema).merge(CursorPaginationSchema).merge(ConfirmationSchema);

export type ManageAddressInput = z.infer<typeof ManageAddressToolSchema>;

// Re-export base schema
export { ManageAddressAction, ManageAddressBaseSchema } from "./base-schema.js";

// Re-export action attribute schemas
export { SyncAddressAttributesSchema, SyncAddressOutputSchema } from "./sync/schema.js";
export { ListSyncedAddressesAttributesSchema, ListSyncedAddressesOutputSchema, SyncedAddressSchema } from "./list/schema.js";
export { ActivateSyncedAddressAttributesSchema, ActivateSyncedAddressOutputSchema } from "./activate/schema.js";
export { DeleteSyncedAddressAttributesSchema, DeleteSyncedAddressOutputSchema } from "./delete/schema.js";

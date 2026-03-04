# @cryptoapis-io/mcp-address-history

MCP server for [Crypto APIs](https://cryptoapis.io/) Address History product. Query full blockchain address transaction history for synced addresses.

> **API Version:** Compatible with Crypto APIs version **2024-12-12**

## Features

- Query complete EVM address history (Ethereum, Ethereum Classic, BSC, Polygon, Tron)
- Query complete UTXO address history (Bitcoin, Bitcoin Cash, Litecoin, Dogecoin, Dash, Zcash)
- Manage address sync (activate, sync, delete, list)
- Query by timestamp range
- Cursor-based pagination for large result sets

## Prerequisites

To use this MCP server, you need:
1. [Register at Crypto APIs](https://app.cryptoapis.io/signup)
2. [Generate an API key](https://app.cryptoapis.io/api-keys) from your dashboard

## Installation

```bash
npm install @cryptoapis-io/mcp-address-history
```

Or install all Crypto APIs MCP servers: `npm install @cryptoapis-io/mcp`

## Usage

```bash
# Run with API key
npx @cryptoapis-io/mcp-address-history --api-key YOUR_API_KEY

# Or use environment variable
export CRYPTOAPIS_API_KEY=YOUR_API_KEY
npx @cryptoapis-io/mcp-address-history
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "cryptoapis-address-history": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-address-history"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "cryptoapis-address-history": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-address-history"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx @cryptoapis-io/mcp-address-history --api-key YOUR_API_KEY
```

### n8n

1. Start the server in HTTP mode:
   ```bash
   npx @cryptoapis-io/mcp-address-history --transport http --port 3000 --api-key YOUR_API_KEY
   ```
2. In your n8n workflow, add an **AI Agent** node
3. Under **Tools**, add an **MCP Client Tool** and set the URL to `http://localhost:3000/mcp`

> All servers default to port 3000. Use `--port` to assign different ports when running multiple servers.

## Available Tools

### `manage_address`

Manage synced addresses for historical data access. Supports all EVM and UTXO blockchains.

**Actions:**

| Action | Description |
|--------|-------------|
| `sync` | Sync a new address for historical data |
| `activate` | Activate a previously synced address |
| `delete` | Delete a synced address |
| `list` | List all synced addresses |

### `evm_address_history`

Query EVM address full history (requires synced address).

**Actions:**

| Action | Description |
|--------|-------------|
| `get-statistics` | Get address statistics |
| `list-transactions` | List all transactions |
| `list-transactions-by-timestamp` | List transactions from a timestamp |
| `list-token-transfers` | List token transfers |
| `list-internal-transactions` | List internal transactions |
| `list-tokens` | List tokens held by address |

**Supported Blockchains:** ethereum, ethereum-classic, binance-smart-chain, polygon, tron

> **Note:** `get-statistics` and `list-transactions-by-timestamp` only support Ethereum and Ethereum Classic. Other actions support all five blockchains.

### `utxo_address_history`

Query UTXO address full history (requires synced address).

**Actions:**

| Action | Description | Pagination |
|--------|-------------|------------|
| `get-statistics` | Get address statistics | - |
| `list-transactions` | List all transactions | cursor |
| `list-transactions-by-timestamp` | List transactions from timestamp | cursor |
| `list-unspent-outputs` | List unspent outputs (UTXOs) | offset |

**Supported Blockchains:** bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash

## Pagination

Most endpoints use **cursor-based pagination**:

```json
// Response
{
  "items": [...],
  "limit": 10,
  "hasMore": true,
  "nextStartingAfter": "abc123"
}
```

Use `nextStartingAfter` value as `startingAfter` parameter in the next request.

**Exception:** `list-unspent-outputs` uses **offset pagination**:

```json
// Response
{
  "items": [...],
  "limit": 10,
  "offset": 0,
  "total": 150
}
```

## Configuration

For **stdio** transport, provide the API key at startup via CLI argument or environment variable. For **HTTP** transport, it can also be provided per-request via `x-api-key` header (see [HTTP API Key Modes](#http-api-key-modes)).

1. **Command-line argument** (recommended):
   ```bash
   npx @cryptoapis-io/mcp-address-history --api-key {your_api_key}
   ```

2. **Environment variable**:
   ```bash
   export CRYPTOAPIS_API_KEY={your_api_key}
   ```

### CLI Arguments

| Argument | Description |
|----------|-------------|
| `--api-key` | Crypto APIs API key |
| `--transport` | Transport type: `stdio` (default) or `http` |
| `--host` | HTTP host (default: `0.0.0.0`) |
| `--port` | HTTP port (default: `3000`) |
| `--path` | HTTP path (default: `/mcp`) |
| `--stateless` | Enable stateless mode for HTTP |

### HTTP API Key Modes

When using HTTP transport, the server supports two API key modes:

- **With `--api-key`:** The key is used for all requests. `x-api-key` request headers are ignored.
- **Without `--api-key`:** Each request must include an `x-api-key` header with a valid Crypto APIs key. This enables hosting a public server where each user provides their own key.

```bash
# Per-request key mode (multi-tenant)
npx @cryptoapis-io/mcp-address-history --transport http --port 3000
# Clients send x-api-key header with each request
```

> Stdio transport always requires an API key at startup.

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Remote MCP Server

Crypto APIs provides an official remote MCP server with all tools available via HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp). Pass your API key via the `x-api-key` header — no installation required.

## License

MIT

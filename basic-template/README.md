# Basic MCP Server Template

A minimal starting point for building MCP (Model Context Protocol) servers.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## Structure

- `src/index.ts` - Main entry point with a simple example tool

## Configuration with Claude Desktop

Add the server to your Claude Desktop configuration file:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "basic-server": {
      "command": "node",
      "args": [
        "path/to/basic-template/build/index.js"
      ]
    }
  }
}
```

## Customization

You can extend this template by:

1. Adding more tools to the server in `src/index.ts`
2. Implementing resources or prompts functionality
3. Connecting to external APIs

## License

MIT
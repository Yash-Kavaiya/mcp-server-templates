# Resources MCP Server Template

This template demonstrates how to create an MCP server that provides resource listing and fetching capabilities, allowing AI assistants to access files and data from your system.

## Features

- List available resources from a configured directory
- Fetch content of resources by URI
- Automatic mime type detection

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## Configuration

Update the following configuration in `src/index.ts` or use environment variables:

```typescript
const BASE_RESOURCE_PATH = process.env.RESOURCE_PATH || '/path/to/your/resources';
```

## Configuration with Claude Desktop

Add the server to your Claude Desktop configuration file:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "resources-server": {
      "command": "node",
      "args": [
        "path/to/resources-template/build/index.js"
      ],
      "env": {
        "RESOURCE_PATH": "/path/to/your/resources"
      }
    }
  }
}
```

## How It Works

This server provides two main capabilities:

1. **Resource Listing**: Claude can request a list of available resources
2. **Resource Reading**: Claude can request the content of a specific resource by its URI

When Claude is connected to this server, it can access files from your configured directory.

## Customization

You can extend this template by:

1. Adding more sophisticated resource filtering
2. Implementing write capabilities for resources
3. Adding authentication/authorization for resource access

## License

MIT
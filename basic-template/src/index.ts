#!/usr/bin/env node

/**
 * Basic MCP Server Template
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Initialize MCP server
const server = new McpServer({
  name: "basic-mcp-server",
  version: "1.0.0",
});

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  try {
    // Add your server configuration here
    
    // Example: Add a simple tool
    server.tool(
      "hello-world",
      "A simple hello world tool",
      {
        params: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name to greet"
            }
          },
          required: ["name"]
        }
      },
      async ({ params }) => {
        const name = params?.name || "World";
        return {
          content: [{ type: "text", text: `Hello, ${name}!` }]
        };
      }
    );

    // Initialize and connect transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.log("Basic MCP Server running on stdio");
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
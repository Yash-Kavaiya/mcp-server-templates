#!/usr/bin/env node

/**
 * MCP Prompts Server Template
 * 
 * This template demonstrates how to create an MCP server
 * that provides prompt templates to AI assistants.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { prompts, registerPrompts } from "./prompts/index.js";

// Initialize MCP server
const server = new McpServer({
  name: "prompts-mcp-server",
  version: "1.0.0",
});

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  try {
    // Register all prompts
    registerPrompts(server);
    
    // Initialize and connect transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.log("Prompts MCP Server running on stdio");
    console.log(`Available prompts: ${Object.keys(prompts).join(", ")}`);
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
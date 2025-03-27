#!/usr/bin/env node

/**
 * MCP Resources Server Template
 * 
 * This template demonstrates how to create an MCP server
 * that provides resource listing and fetching capabilities.
 */

import fs from 'fs/promises';
import path from 'path';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Resource } from "@modelcontextprotocol/sdk/shared/schema.js";

// Initialize MCP server
const server = new McpServer({
  name: "resources-mcp-server",
  version: "1.0.0",
});

// Configuration (update these paths for your environment)
const BASE_RESOURCE_PATH = process.env.RESOURCE_PATH || '/path/to/your/resources';

// Mime type mapping
const MIME_TYPES: Record<string, string> = {
  '.txt': 'text/plain',
  '.log': 'text/plain',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.csv': 'text/csv',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

/**
 * Get mime type based on file extension
 */
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * List available resources
 */
async function listResources(): Promise<Resource[]> {
  try {
    const resources: Resource[] = [];
    
    // Read directory
    const files = await fs.readdir(BASE_RESOURCE_PATH);
    
    // Filter and map files to resources
    for (const file of files) {
      const filePath = path.join(BASE_RESOURCE_PATH, file);
      const stats = await fs.stat(filePath);
      
      // Only include files, not directories
      if (stats.isFile()) {
        resources.push({
          uri: `file://${filePath}`,
          name: file,
          mimeType: getMimeType(file)
        });
      }
    }
    
    return resources;
  } catch (error) {
    console.error('Error listing resources:', error);
    return [];
  }
}

/**
 * Read a resource by URI
 */
async function readResource(uri: string): Promise<string | Buffer> {
  try {
    // Parse URI to get the file path
    const filePath = uri.replace('file://', '');
    
    // Read file content
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading resource:', error);
    throw new Error('Resource not found or inaccessible');
  }
}

/**
 * Register resources handler
 */
server.resources({
  list: async () => {
    return await listResources();
  },
  read: async ({ uri }) => {
    return await readResource(uri);
  }
});

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  try {
    // Initialize and connect transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.log("Resources MCP Server running on stdio");
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
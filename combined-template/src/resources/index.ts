/**
 * Resources Feature Module
 */

import fs from 'fs/promises';
import path from 'path';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Resource } from "@modelcontextprotocol/sdk/shared/schema.js";

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
 * Setup resources feature on the MCP server
 */
export function setupResources(server: McpServer) {
  server.resources({
    list: async () => {
      return await listResources();
    },
    read: async ({ uri }) => {
      return await readResource(uri);
    }
  });
  
  console.log(`Resources feature enabled. Base path: ${BASE_RESOURCE_PATH}`);
}
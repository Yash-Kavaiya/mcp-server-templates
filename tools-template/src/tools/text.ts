/**
 * Text Tools Implementation
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register text manipulation tools with the MCP server
 */
export function registerTextTools(server: McpServer) {
  // Format text tool
  server.tool(
    "format-text",
    "Format text (uppercase, lowercase, capitalize)",
    {
      params: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "Text to format"
          },
          format: {
            type: "string",
            enum: ["uppercase", "lowercase", "capitalize"],
            description: "Format type"
          }
        },
        required: ["text", "format"]
      }
    },
    async ({ params }) => {
      const text = params?.text || "";
      const format = params?.format || "";
      
      let result = text;
      
      switch (format) {
        case "uppercase":
          result = text.toUpperCase();
          break;
        case "lowercase":
          result = text.toLowerCase();
          break;
        case "capitalize":
          result = text.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          break;
        default:
          return {
            content: [{ type: "text", text: "Invalid format specified. Use uppercase, lowercase, or capitalize." }]
          };
      }
      
      return {
        content: [{ type: "text", text: result }]
      };
    }
  );

  // Count characters tool
  server.tool(
    "count-characters",
    "Count characters, words, or lines in text",
    {
      params: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "Text to analyze"
          },
          count: {
            type: "string",
            enum: ["characters", "words", "lines"],
            description: "What to count"
          }
        },
        required: ["text", "count"]
      }
    },
    async ({ params }) => {
      const text = params?.text || "";
      const count = params?.count || "characters";
      
      let result = 0;
      
      switch (count) {
        case "characters":
          result = text.length;
          break;
        case "words":
          result = text.split(/\s+/).filter(word => word.length > 0).length;
          break;
        case "lines":
          result = text.split(/\r\n|\r|\n/).length;
          break;
        default:
          return {
            content: [{ type: "text", text: "Invalid count option. Use characters, words, or lines." }]
          };
      }
      
      return {
        content: [{ type: "text", text: `${count}: ${result}` }]
      };
    }
  );
}
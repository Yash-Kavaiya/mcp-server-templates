/**
 * Calculator Tools Implementation
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register calculator tools with the MCP server
 */
export function registerCalculatorTools(server: McpServer) {
  // Addition tool
  server.tool(
    "calculate-add",
    "Add two numbers together",
    {
      params: {
        type: "object",
        properties: {
          a: {
            type: "number",
            description: "First number"
          },
          b: {
            type: "number",
            description: "Second number"
          }
        },
        required: ["a", "b"]
      }
    },
    async ({ params }) => {
      const a = params?.a || 0;
      const b = params?.b || 0;
      const result = a + b;
      
      return {
        content: [{ type: "text", text: `${a} + ${b} = ${result}` }]
      };
    }
  );

  // Subtraction tool
  server.tool(
    "calculate-subtract",
    "Subtract one number from another",
    {
      params: {
        type: "object",
        properties: {
          a: {
            type: "number",
            description: "Number to subtract from"
          },
          b: {
            type: "number",
            description: "Number to subtract"
          }
        },
        required: ["a", "b"]
      }
    },
    async ({ params }) => {
      const a = params?.a || 0;
      const b = params?.b || 0;
      const result = a - b;
      
      return {
        content: [{ type: "text", text: `${a} - ${b} = ${result}` }]
      };
    }
  );

  // Multiplication tool
  server.tool(
    "calculate-multiply",
    "Multiply two numbers",
    {
      params: {
        type: "object",
        properties: {
          a: {
            type: "number",
            description: "First number"
          },
          b: {
            type: "number",
            description: "Second number"
          }
        },
        required: ["a", "b"]
      }
    },
    async ({ params }) => {
      const a = params?.a || 0;
      const b = params?.b || 0;
      const result = a * b;
      
      return {
        content: [{ type: "text", text: `${a} × ${b} = ${result}` }]
      };
    }
  );

  // Division tool
  server.tool(
    "calculate-divide",
    "Divide one number by another",
    {
      params: {
        type: "object",
        properties: {
          a: {
            type: "number",
            description: "Dividend (number to be divided)"
          },
          b: {
            type: "number",
            description: "Divisor (number to divide by)"
          }
        },
        required: ["a", "b"]
      }
    },
    async ({ params }) => {
      const a = params?.a || 0;
      const b = params?.b || 0;
      
      if (b === 0) {
        return {
          content: [{ type: "text", text: "Error: Division by zero is not allowed" }]
        };
      }
      
      const result = a / b;
      
      return {
        content: [{ type: "text", text: `${a} ÷ ${b} = ${result}` }]
      };
    }
  );
}
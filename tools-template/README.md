# Tools MCP Server Template

This template demonstrates how to create an MCP server that provides various tools to AI assistants like Claude, enabling them to perform calculations, manipulate text, check weather, and more.

## Features

- Calculator tools (add, subtract, multiply, divide)
- Text manipulation tools (format, count)
- Weather information tool (requires API key)
- Modular design for easy extension

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

For the weather tool, you need to provide an API key from [OpenWeatherMap](https://openweathermap.org/api) as an environment variable.

## Configuration with Claude Desktop

Add the server to your Claude Desktop configuration file:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "tools-server": {
      "command": "node",
      "args": [
        "path/to/tools-template/build/index.js"
      ],
      "env": {
        "WEATHER_API_KEY": "your-openweathermap-api-key"
      }
    }
  }
}
```

## How It Works

This server provides a set of tools that Claude can use during conversations:

1. **Calculator**: Perform basic arithmetic operations
2. **Text Manipulation**: Format text or count characters/words/lines
3. **Weather**: Get current weather information for locations

The tools are organized in separate modules for better maintainability.

## Adding Your Own Tools

To add a new tool:

1. Create a new file in the `src/tools` directory
2. Implement your tool function with input schema and logic
3. Register your tool in the `registerTools` function in `index.ts`

Example of a simple tool implementation:

```typescript
export function registerMyTool(server: McpServer) {
  server.tool(
    "my-tool-name",
    "Description of what the tool does",
    {
      params: {
        type: "object",
        properties: {
          input: {
            type: "string",
            description: "Input description"
          }
        },
        required: ["input"]
      }
    },
    async ({ params }) => {
      // Tool implementation
      const result = doSomethingWith(params.input);
      
      return {
        content: [{ type: "text", text: result }]
      };
    }
  );
}
```

## License

MIT
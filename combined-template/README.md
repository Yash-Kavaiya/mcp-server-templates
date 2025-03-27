# Combined MCP Server Template

This template demonstrates how to create a complete MCP server that combines resources, tools, and prompts functionalities for AI assistants like Claude.

## Features

### Resources
- List and fetch files from a configured directory
- Automatic mime type detection

### Tools
- Calculator tools (add, subtract, multiply, divide)
- Text manipulation tools (format, count)
- Weather information tool (requires API key)

### Prompts
- Git commit message generation
- Code explanation with language detection
- Text summarization with length options
- Blog post generation with customizable parameters

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

Update the following configuration in the respective module files or use environment variables:

- **Resources**: Set `RESOURCE_PATH` in environment variables or update in `src/resources/index.ts`
- **Weather Tool**: Set `WEATHER_API_KEY` in environment variables from [OpenWeatherMap](https://openweathermap.org/api)

## Configuration with Claude Desktop

Add the server to your Claude Desktop configuration file:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "combined-server": {
      "command": "node",
      "args": [
        "path/to/combined-template/build/index.js"
      ],
      "env": {
        "RESOURCE_PATH": "/path/to/your/resources",
        "WEATHER_API_KEY": "your-openweathermap-api-key"
      }
    }
  }
}
```

## Modular Architecture

This template uses a modular architecture with separate modules for each feature:

- `src/resources/` - Resources functionality
- `src/tools/` - Tools functionality
- `src/prompts/` - Prompts functionality

Each module is initialized in the main `index.ts` file, making it easy to enable or disable specific features.

## Extending the Template

### Adding a New Tool

1. Create a new file in the `src/tools` directory
2. Implement your tool registration function
3. Import and call your function in `src/tools/index.ts`

### Adding a New Prompt

1. Create a new file in the `src/prompts` directory defining your prompt schema
2. Import and export your prompt in `src/prompts/index.ts`
3. Add a prompt template handler in the `promptTemplates` object

## License

MIT
# MCP Server Templates

This repository contains templates for building MCP (Mission Control Protocol) servers for AI assistants like Claude.

## What is MCP?

The Model Context Protocol (MCP) is a protocol for enabling AI models to interact with external tools and data sources, extending their capabilities beyond the conversation interface.

## Templates

This repository contains different templates for building MCP servers:

1. **Basic Template** - A minimal starting point with just the essentials
2. **Resource Server** - Template for serving resources (files, logs, etc.)
3. **Tools Server** - Template for providing tools that can be called from AI assistants
4. **Prompts Server** - Template for managing AI prompts
5. **Combined Server** - A complete template with all functionalities

## Getting Started

To use these templates:

1. Choose a template that suits your needs
2. Clone this repository
3. Navigate to the template directory
4. Follow the setup instructions in the template's README

## Usage with Claude

To use your MCP server with Claude Desktop:

1. Build your server
2. Add the server configuration to Claude Desktop's config file
   - MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%/Claude/claude_desktop_config.json`

Example configuration:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": [
        "path/to/your/server/build/index.js"
      ],
      "env": {
        "API_KEY": "your-api-key-if-needed"
      }
    }
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Prompts MCP Server Template

This template demonstrates how to create an MCP server that provides prompt templates to AI assistants like Claude, enabling them to handle common tasks like generating Git commit messages, explaining code, summarizing text, and writing blog posts.

## Features

- Git commit message generation
- Code explanation with language detection
- Text summarization with length options
- Blog post generation with customizable parameters
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

## Configuration with Claude Desktop

Add the server to your Claude Desktop configuration file:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "prompts-server": {
      "command": "node",
      "args": [
        "path/to/prompts-template/build/index.js"
      ]
    }
  }
}
```

## How It Works

This server provides prompt templates that Claude can use during conversations:

1. **Git Commit Messages**: Generate concise, descriptive commit messages based on changes
2. **Code Explanation**: Get detailed explanations of code snippets
3. **Text Summarization**: Summarize text with different length options
4. **Blog Post Generation**: Create structured blog posts on specified topics

The prompts are organized in separate modules for better maintainability.

## Available Prompts

### Git Commit
- Name: `git-commit`
- Required Arguments: `changes` (Git diff or description of changes)

### Explain Code
- Name: `explain-code`
- Required Arguments: `code` (Code to explain)
- Optional Arguments: `language` (Programming language)

### Summarize Text
- Name: `summarize-text`
- Required Arguments: `text` (Text to summarize)
- Optional Arguments: `length` (short, medium, long)

### Blog Post
- Name: `blog-post`
- Required Arguments: `topic` (Blog post topic)
- Optional Arguments: `tone` (Writing tone), `wordCount` (Approximate word count)

## Adding Your Own Prompts

To add a new prompt:

1. Create a new file in the `src/prompts` directory defining your prompt schema
2. Import and export your prompt in `src/prompts/index.ts`
3. Add a prompt template handler in the `promptTemplates` object

Example of a simple prompt definition:

```typescript
// src/prompts/my-prompt.ts
export const myPrompt: Prompt = {
  name: "my-prompt",
  description: "Description of what the prompt does",
  arguments: [
    {
      name: "parameter1",
      description: "Description of parameter1",
      required: true
    },
    {
      name: "parameter2",
      description: "Description of parameter2",
      required: false
    }
  ],
};

// Add to src/prompts/index.ts
import { myPrompt } from "./my-prompt.js";

export const prompts = {
  // existing prompts...
  "my-prompt": myPrompt,
};

const promptTemplates = {
  // existing templates...
  "my-prompt": (args: Record<string, string>) => {
    const param1 = args.parameter1 || "";
    const param2 = args.parameter2 || "default value";
    
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Custom instruction using ${param1} and ${param2}...`
          }
        }
      ]
    };
  },
};
```

## License

MIT
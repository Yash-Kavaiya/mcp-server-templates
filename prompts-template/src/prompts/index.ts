/**
 * Prompt Repository and Registration
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { gitCommitPrompt } from "./git-commit.js";
import { explainCodePrompt } from "./explain-code.js";
import { summarizeTextPrompt } from "./summarize-text.js";
import { blogPostPrompt } from "./blog-post.js";

// Export all prompts
export const prompts = {
  "git-commit": gitCommitPrompt,
  "explain-code": explainCodePrompt,
  "summarize-text": summarizeTextPrompt,
  "blog-post": blogPostPrompt,
};

/**
 * Register all prompts with the MCP server
 */
export function registerPrompts(server: McpServer) {
  // Initialize prompts functionality
  server.prompts({
    list: async () => {
      return Object.values(prompts);
    },
    get: async ({ name, arguments: promptArgs = {} }) => {
      if (!(name in prompts)) {
        throw new Error(`Prompt not found: ${name}`);
      }

      const prompt = prompts[name];
      
      // Check for required arguments
      for (const arg of prompt.arguments || []) {
        if (arg.required && !(arg.name in promptArgs)) {
          throw new Error(`Missing required argument: ${arg.name}`);
        }
      }

      // Get the prompt template handler
      const getPromptTemplate = promptTemplates[name];
      if (!getPromptTemplate) {
        throw new Error(`Prompt template not implemented: ${name}`);
      }

      return getPromptTemplate(promptArgs);
    },
  });
}

/**
 * Prompt template implementations
 */
const promptTemplates: Record<string, Function> = {
  "git-commit": (args: Record<string, string>) => {
    const changes = args.changes || "";
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Generate a concise but descriptive commit message for these changes:\n\n${changes}`
          }
        }
      ]
    };
  },
  
  "explain-code": (args: Record<string, string>) => {
    const code = args.code || "";
    const language = args.language || "Unknown";
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Explain how this ${language} code works:\n\n${code}`
          }
        }
      ]
    };
  },
  
  "summarize-text": (args: Record<string, string>) => {
    const text = args.text || "";
    const length = args.length || "medium";
    
    let instruction = "";
    switch (length) {
      case "short":
        instruction = "Summarize the following text in 1-2 sentences.";
        break;
      case "medium":
        instruction = "Summarize the following text in a short paragraph.";
        break;
      case "long":
        instruction = "Provide a detailed summary of the following text with key points.";
        break;
      default:
        instruction = "Summarize the following text.";
    }
    
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `${instruction}\n\n${text}`
          }
        }
      ]
    };
  },
  
  "blog-post": (args: Record<string, string>) => {
    const topic = args.topic || "";
    const tone = args.tone || "professional";
    const wordCount = args.wordCount || "800";
    
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Write a ${wordCount}-word blog post about ${topic}. Use a ${tone} tone.\n\n` +
                  `The blog post should include:\n` +
                  `- An engaging introduction\n` +
                  `- 3-5 main points with subheadings\n` +
                  `- A conclusion with a call to action`
          }
        }
      ]
    };
  },
};
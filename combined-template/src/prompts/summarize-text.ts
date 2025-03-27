/**
 * Summarize Text Prompt Definition
 */

import { Prompt } from "@modelcontextprotocol/sdk/shared/schema.js";

export const summarizeTextPrompt: Prompt = {
  name: "summarize-text",
  description: "Summarize text with desired length",
  arguments: [
    {
      name: "text",
      description: "Text to summarize",
      required: true
    },
    {
      name: "length",
      description: "Summary length (short, medium, long)",
      required: false
    }
  ],
};
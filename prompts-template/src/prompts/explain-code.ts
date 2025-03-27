/**
 * Explain Code Prompt Definition
 */

import { Prompt, PromptArgument } from "@modelcontextprotocol/sdk/shared/schema.js";

export const explainCodePrompt: Prompt = {
  name: "explain-code",
  description: "Explain how code works",
  arguments: [
    {
      name: "code",
      description: "Code to explain",
      required: true
    },
    {
      name: "language",
      description: "Programming language",
      required: false
    }
  ],
};
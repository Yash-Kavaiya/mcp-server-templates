/**
 * Git Commit Prompt Definition
 */

import { Prompt } from "@modelcontextprotocol/sdk/shared/schema.js";

export const gitCommitPrompt: Prompt = {
  name: "git-commit",
  description: "Generate a Git commit message",
  arguments: [
    {
      name: "changes",
      description: "Git diff or description of changes",
      required: true
    }
  ],
};
/**
 * Blog Post Prompt Definition
 */

import { Prompt, PromptArgument } from "@modelcontextprotocol/sdk/shared/schema.js";

export const blogPostPrompt: Prompt = {
  name: "blog-post",
  description: "Generate a blog post on a given topic",
  arguments: [
    {
      name: "topic",
      description: "Blog post topic",
      required: true
    },
    {
      name: "tone",
      description: "Writing tone (professional, casual, technical, etc.)",
      required: false
    },
    {
      name: "wordCount",
      description: "Approximate word count",
      required: false
    }
  ],
};
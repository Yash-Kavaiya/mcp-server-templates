/**
 * Tools Feature Module
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// Import tool implementations
import { registerCalculatorTools } from './calculator.js';
import { registerTextTools } from './text.js';
import { registerWeatherTool } from './weather.js';

/**
 * Setup tools feature on the MCP server
 */
export function setupTools(server: McpServer) {
  // Register calculator tools (add, subtract, multiply, divide)
  registerCalculatorTools(server);
  
  // Register text manipulation tools (format, count)
  registerTextTools(server);
  
  // Register weather tool (requires API key)
  if (process.env.WEATHER_API_KEY) {
    registerWeatherTool(server, process.env.WEATHER_API_KEY);
  } else {
    console.warn("Weather API key not provided, weather tool will not be registered.");
  }
  
  console.log('Tools feature enabled. Available tools: calculate-add, calculate-subtract, calculate-multiply, calculate-divide, format-text, count-characters');
  if (process.env.WEATHER_API_KEY) {
    console.log('Weather tool enabled: get-weather');
  }
}
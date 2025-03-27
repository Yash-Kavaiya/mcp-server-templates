/**
 * Weather Tool Implementation
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fetch from 'node-fetch';

/**
 * Register weather tool with the MCP server
 */
export function registerWeatherTool(server: McpServer, apiKey: string) {
  // Weather lookup tool
  server.tool(
    "get-weather",
    "Get current weather for a location",
    {
      params: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "City name or location"
          },
          units: {
            type: "string",
            enum: ["metric", "imperial"],
            description: "Temperature units (metric for Celsius, imperial for Fahrenheit)"
          }
        },
        required: ["location"]
      }
    },
    async ({ params }) => {
      try {
        const location = params?.location || "";
        const units = params?.units || "metric";
        
        // Use OpenWeatherMap API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=${units}&appid=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json() as any;
        
        if (data.cod !== 200) {
          return {
            content: [{ type: "text", text: `Error: ${data.message || 'Failed to get weather data'}` }]
          };
        }
        
        const temperature = data.main.temp;
        const condition = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const cityName = data.name;
        const country = data.sys.country;
        
        const unitLabel = units === 'metric' ? '°C' : '°F';
        const windLabel = units === 'metric' ? 'm/s' : 'mph';
        
        const result = `
          Weather for ${cityName}, ${country}:
          - Temperature: ${temperature}${unitLabel}
          - Condition: ${condition}
          - Humidity: ${humidity}%
          - Wind Speed: ${windSpeed} ${windLabel}
        `.trim();
        
        return {
          content: [{ type: "text", text: result }]
        };
      } catch (error) {
        console.error('Weather API error:', error);
        return {
          content: [{ type: "text", text: "Failed to retrieve weather information. Please check your API key and try again." }]
        };
      }
    }
  );
}
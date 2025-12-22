#!/usr/bin/env node

/**
 * Ratchet MCP Server
 *
 * MCP server for PointCare EMR integration.
 * Enables Claude to document patient visits directly into EMR.
 *
 * STATUS: Skeleton - awaiting PointCare API documentation
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Create MCP server instance
const server = new Server(
  {
    name: 'ratchet-mcp',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions - BLOCKED pending API documentation
const TOOLS = [
  {
    name: 'search_patient',
    description: 'Search for a patient by name, ID, or phone number. [BLOCKED - Awaiting API docs]',
    inputSchema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'Patient name, ID, or phone number to search',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'create_visit_note',
    description: 'Create a visit note for a patient. [BLOCKED - Awaiting API docs]',
    inputSchema: {
      type: 'object' as const,
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient identifier',
        },
        note: {
          type: 'string',
          description: 'Visit note content',
        },
      },
      required: ['patientId', 'note'],
    },
  },
  {
    name: 'get_patient_history',
    description: 'Retrieve visit history for a patient. [BLOCKED - Awaiting API docs]',
    inputSchema: {
      type: 'object' as const,
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient identifier',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return',
        },
      },
      required: ['patientId'],
    },
  },
];

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // All tools currently blocked pending API documentation
  return {
    content: [
      {
        type: 'text',
        text: `Tool '${name}' is currently blocked pending PointCare API documentation. ` +
              `Parameters received: ${JSON.stringify(args)}`,
      },
    ],
    isError: true,
  };
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Ratchet MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

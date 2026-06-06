import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * Finary MCP Server (Unofficial)
 * This server provides read-only access to Finary portfolio data.
 */

const FINARY_EMAIL = process.env.FINARY_EMAIL;
const FINARY_PASSWORD = process.env.FINARY_PASSWORD;
let accessToken: string | null = null;

async function authenticate() {
  if (!FINARY_EMAIL || !FINARY_PASSWORD) {
    throw new Error("Missing FINARY_EMAIL or FINARY_PASSWORD environment variables");
  }

  const response = await fetch("https://api.finary.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: FINARY_EMAIL, password: FINARY_PASSWORD }),
  });

  const data = (await response.json()) as any;
  if (!response.ok) {
    throw new Error(`Authentication failed: ${JSON.stringify(data)}`);
  }
  accessToken = data.result.token;
  return accessToken;
}

async function getHeaders() {
  if (!accessToken) {
    await authenticate();
  }
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

const server = new Server(
  {
    name: "finary-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * List available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_net_worth",
        description: "Get current total net worth and asset breakdown",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_portfolio",
        description: "List all portfolio holdings and balances",
        inputSchema: { type: "object", properties: {} },
      },
    ],
  };
});

/**
 * Handle tool execution.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const headers = await getHeaders();

  switch (request.params.name) {
    case "get_net_worth": {
      const response = await fetch("https://api.finary.com/users/me/dashboard/net_worth", { headers });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
    case "get_portfolio": {
      const response = await fetch("https://api.finary.com/users/me/portfolio", { headers });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
    default:
      throw new Error("Tool not found");
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);

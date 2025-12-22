# Ratchet MCP

**MCP server for PointCare EMR integration** - Enables Claude to document patient visits directly into Electronic Medical Records, reducing administrative burden for home health nurses.

## Status

**Phase:** PRD Development
**Blocker:** PointCare API documentation needed

## Origin Story

Ratchet evolved from the **M2AI NurseCall** n8n workflow, built to help home health nurses with visit documentation:

```
Current Flow (M2AI NurseCall):
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Twilio  │───>│  n8n    │───>│  VAPI   │───>│  Email  │
│  SMS    │    │ Workflow│    │  Call   │    │ Summary │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │
     └── Phone number identifies nurse
```

**The Problem:** Visit notes go to email but still need manual entry into PointCare EMR.

**Ratchet's Solution:**
```
Future Flow (with Ratchet):
┌─────────┐    ┌─────────┐    ┌──────────┐    ┌───────────┐
│ Twilio  │───>│  n8n    │───>│ Ratchet  │───>│ PointCare │
│  SMS    │    │ Workflow│    │   MCP    │    │    EMR    │
└─────────┘    └─────────┘    └──────────┘    └───────────┘
                                   │
                                   └── Direct EMR integration
```

## Planned MCP Tools

| Tool | Description | Status |
|------|-------------|--------|
| `search_patient` | Find patient by name/ID/phone | BLOCKED |
| `create_visit_note` | Document a patient visit | BLOCKED |
| `get_patient_history` | Retrieve patient visit history | BLOCKED |

> Tools specification blocked pending PointCare API documentation.

## Installation

```bash
npm install
npm run build
```

## Development

```bash
npm run dev    # Run with tsx (hot reload)
npm run test   # Run test suite
npm run lint   # Run ESLint
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
POINTCARE_API_URL=        # PointCare API base URL
POINTCARE_API_KEY=        # API key or token
POINTCARE_CLIENT_ID=      # OAuth client ID (if applicable)
POINTCARE_CLIENT_SECRET=  # OAuth client secret (if applicable)
```

## Claude Desktop Integration

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "ratchet": {
      "command": "node",
      "args": ["/path/to/ratchet/dist/index.js"],
      "env": {
        "POINTCARE_API_URL": "https://api.pointcare.com",
        "POINTCARE_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Project Structure

```
ratchet/
├── src/
│   ├── index.ts           # MCP server entry point
│   ├── tools/             # Tool implementations
│   │   ├── search-patient.ts
│   │   ├── create-visit-note.ts
│   │   └── get-patient-history.ts
│   ├── resources/         # Resource handlers (if any)
│   └── prompts/           # Prompt templates (if any)
├── tests/
│   └── *.test.ts          # Jest test suite
├── prds/
│   └── RATCHET-PRD.yaml   # MCP specification
├── docs/
│   └── API_REQUIREMENTS.md
├── package.json
├── tsconfig.json
└── CLAUDE.md
```

## Related Projects

- **Grimlock** - Autonomous MCP Server Factory that will build Ratchet
- **M2AI NurseCall** - n8n workflow that will integrate with Ratchet (ID: 3i0JkX1GdDXnTQbx)

## License

MIT

# mcp-pointcare-ratchet

**MCP server for PointCare EMR integration (internal codename: Ratchet)** - Enables Claude to document patient visits directly into Electronic Medical Records, reducing administrative burden for home health nurses.

## Status

| Component | Status |
|-----------|--------|
| MCP Server | ✅ Working (Mock Mode) |
| Unit Tests | ✅ 20/20 Passing |
| Claude Desktop | ✅ Ready for Testing |
| PointCare API | ⏳ Pending API Documentation |

**Current Mode:** Mock Mode - Uses realistic test data for development and testing.

## Quick Start

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev

# Run tests
npm test
```

## Mock Mode

Ratchet runs in **mock mode** by default when `POINTCARE_API_URL` is not configured. Mock mode:
- Uses 5 fictional test patients
- Stores visit notes in memory
- Returns realistic responses
- Perfect for development and Claude Desktop testing

## Available Tools

| Tool | Description | Mock Mode |
|------|-------------|-----------|
| `search_patient` | Find patient by name, ID, or phone | ✅ Working |
| `create_visit_note` | Document a patient visit with vitals | ✅ Working |
| `get_patient_history` | Retrieve patient visit history | ✅ Working |

### Example Usage (in Claude)

```
"Search for patient Eleanor Thompson"
→ Returns patient PT-10001 with demographics and status

"Create a visit note for PT-10001 with blood pressure 120/80"
→ Creates and stores visit note with vitals

"Get visit history for PT-10001"
→ Returns list of previous visits
```

## Claude Desktop Integration

### Step 1: Build the Project

```bash
cd /path/to/mcp-pointcare-ratchet
npm install
npm run build
```

### Step 2: Configure Claude Desktop

Add to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ratchet": {
      "command": "node",
      "args": ["/absolute/path/to/ratchet/dist/index.js"]
    }
  }
}
```

For mock mode, no environment variables are needed. For production:

```json
{
  "mcpServers": {
    "ratchet": {
      "command": "node",
      "args": ["/absolute/path/to/ratchet/dist/index.js"],
      "env": {
        "POINTCARE_API_URL": "https://api.pointcare.com",
        "POINTCARE_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Step 3: Restart Claude Desktop

Restart Claude Desktop to load the new MCP server.

### Step 4: Verify

In Claude Desktop, you should see:
- `search_patient` tool available
- `create_visit_note` tool available
- `get_patient_history` tool available

Try: "Search for patient Eleanor"

## Test Patients (Mock Mode)

| ID | Name | Status | Primary Diagnosis |
|----|------|--------|-------------------|
| PT-10001 | Eleanor Thompson | Active | Type 2 Diabetes, CHF |
| PT-10002 | Robert Martinez | Active | COPD, Post-surgical |
| PT-10003 | Margaret Wilson | Active | Parkinson's Disease |
| PT-10004 | James Thompson | Active | Post-stroke rehab |
| PT-10005 | Dorothy Anderson | Discharged | Hip replacement |

## Origin Story

Ratchet evolved from the **M2AI NurseCall** n8n workflow, built to help home health nurses with visit documentation:

```
Current Flow (M2AI NurseCall):
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Twilio  │───>│  n8n    │───>│  VAPI   │───>│  Email  │
│  SMS    │    │ Workflow│    │  Call   │    │ Summary │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

**The Problem:** Visit notes go to email but still need manual entry into PointCare EMR.

**Ratchet's Solution:**
```
Future Flow (with Ratchet):
┌─────────┐    ┌─────────┐    ┌──────────┐    ┌───────────┐
│ Twilio  │───>│  n8n    │───>│ Ratchet  │───>│ PointCare │
│  SMS    │    │ Workflow│    │   MCP    │    │    EMR    │
└─────────┘    └─────────┘    └──────────┘    └───────────┘
```

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `POINTCARE_API_URL` | No* | PointCare API base URL |
| `POINTCARE_API_KEY` | No* | API key or token |
| `RATCHET_MOCK_MODE` | No | Force mock mode (`true`/`false`) |
| `LOG_LEVEL` | No | Logging level (`debug`/`info`/`warn`/`error`) |

*Required for production use. Mock mode activates when not set.

## Project Structure

```
ratchet/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── config.ts             # Configuration management
│   ├── tools/                # Tool implementations
│   │   ├── search-patient.ts
│   │   ├── create-visit-note.ts
│   │   └── get-patient-history.ts
│   ├── services/             # Business logic
│   │   ├── patient-service.ts
│   │   └── mock-data.ts
│   ├── types/                # TypeScript types
│   └── utils/                # Logger, errors
├── tests/
│   └── patient-service.test.ts
├── dist/                     # Compiled output
├── prds/
│   └── RATCHET-PRD.yaml
├── docs/
│   └── API_REQUIREMENTS.md
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Development

```bash
# Run in watch mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint
npm run lint
```

## Next Steps

1. **Acquire PointCare API documentation** - See `docs/API_REQUIREMENTS.md`
2. **Complete PRD** - Fill in tool specifications with real API details
3. **Implement real API calls** - Replace mock responses
4. **Integration testing** - Test with PointCare sandbox

## Related Projects

- **Grimlock** - Autonomous MCP Server Factory (github.com/MatthewSnow2/grimlock)
- **M2AI NurseCall** - n8n workflow (ID: 3i0JkX1GdDXnTQbx)

## License

MIT

---

*Built autonomously by [GRIMLOCK](https://github.com/MatthewSnow2/grimlock) - Autonomous MCP Server Factory*

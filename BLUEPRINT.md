# Ratchet MCP - Blueprint

Phase tracking document for Ratchet MCP server development.

## Current Status

**Phase:** PRD Development (Week 1)
**Blocker:** PointCare API documentation required
**Last Updated:** 2024-12-22

---

## Phase 1: Requirements Gathering

- [x] Define project structure
- [x] Create initial CLAUDE.md
- [x] Create README.md
- [x] Document M2AI NurseCall connection
- [ ] **BLOCKED** - Acquire PointCare API documentation
- [ ] **BLOCKED** - Obtain test/sandbox credentials
- [ ] **BLOCKED** - Document authentication method

**Exit Criteria:** Complete PRD with tool specifications

---

## Phase 2: PRD Completion

- [ ] Define `search_patient` tool parameters
- [ ] Define `create_visit_note` tool parameters
- [ ] Define `get_patient_history` tool parameters
- [ ] Document API endpoints and response schemas
- [ ] Define acceptance criteria (functional)
- [ ] Define acceptance criteria (non-functional)
- [ ] Complete security section
- [ ] Complete Grimlock handoff checklist

**Exit Criteria:** PRD ready for Grimlock sprint

---

## Phase 3: Grimlock Build (Weekend Sprint)

- [ ] Grimlock validates PRD
- [ ] Project scaffolding created
- [ ] `search_patient` tool implemented
- [ ] `create_visit_note` tool implemented
- [ ] `get_patient_history` tool implemented
- [ ] Unit tests written
- [ ] Integration tests written
- [ ] Documentation generated

**Exit Criteria:** All acceptance criteria passing

---

## Phase 4: Week 2 Refinement

- [ ] Human security review
- [ ] Manual integration testing with PointCare sandbox
- [ ] Error handling review
- [ ] Performance testing
- [ ] Documentation review
- [ ] Claude Desktop integration test
- [ ] n8n workflow integration (M2AI NurseCall update)

**Exit Criteria:** Production-ready MCP server

---

## Phase 5: Production Deployment

- [ ] Production credentials obtained
- [ ] Deployment documentation created
- [ ] Production deployment executed
- [ ] M2AI NurseCall workflow updated
- [ ] End-to-end testing complete
- [ ] Monitoring/alerting configured

**Exit Criteria:** Live integration with M2AI NurseCall

---

## Blockers

| Blocker | Required From | Status |
|---------|---------------|--------|
| API Documentation | PointCare | Not requested |
| Sandbox Credentials | PointCare | Not requested |
| Auth Method Details | PointCare | Unknown |

---

## Dependencies

```
M2AI NurseCall (n8n)
        │
        ▼
    Ratchet MCP ──> PointCare EMR
        ▲
        │
    Grimlock (builder)
```

---

## Notes

- SDK: TypeScript (@modelcontextprotocol/sdk)
- Aligns with Anthropic MCP patterns for portfolio purposes
- Origin: M2AI NurseCall workflow for nursing admin documentation

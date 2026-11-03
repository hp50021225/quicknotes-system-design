# QuickNotes Architecture & Scaling Plan

## Requirements
- **Functional Requirements**: User account creation, CRUD operations for notes, tagging system, instantaneous search, and background email export notifications.
- **Non-Functional Requirements**: 99.9% availability, sub-100ms API read latency, horizontally scalable infrastructure, and secure data transit.

## Load Estimates (1 Million Users)
- **DAU (Daily Active Users)**: 200,000 (20% activity rate)
- **Writes (New Notes)**: ~10 writes/second (Peak: ~50 writes/sec)
- **Reads (Loaded Notes)**: ~40 reads/second (Peak: ~200 reads/sec)
- **Storage Growth**: ~180 GB per year

## Architecture Diagram
```text
[Browser Client] ──> [DNS] ──> [CDN (Static Assets)]
                            └──> [Load Balancer]
                                      │
                 ┌────────────────────┼────────────────────┐
                 v                    v                    v
            [App Server 1]     [App Server 2]     [App Server 3] ──> [Redis Cache]
                 │ writes             │ reads              │ jobs
                 v                    v                    v
            [Primary DB] ──copy──> [Read Replica]     [Queue] ──> [Worker]
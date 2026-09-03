# Okurka Analytics

Okurka Analytics is a self-contained, read-only plugin for governed questions about the fictional Okurka Market business and its consent-covered real product catalog. It connects directly to the deployed dbt Semantic Layer/MetricFlow MCP server at `https://mcp.agenticanalytics.cz/mcp/okurka-metricflow`; it needs no repository checkout, Python environment, AWS permission, tunnel, private skills tree, or machine-specific path. Claude Code requires `node` on `PATH` for the bundled main-session MCP guard.

Response speed is the highest product priority. The main session only plans, delegates, propagates failures, and assembles. Each executor uses one compact family discovery call and one batched query for a normal question. The server validates immutable artifacts once at startup and safely reuses content-addressed results without changing the returned MetricFlow SQL, rows, provenance, cutoff, or non-release boundary.

## Authentication

Cloudflare Access protects the MCP endpoint with interactive email authentication. On first connection, the client opens the standard OAuth/login flow. Access is limited to the three reviewed email identities configured by the operator; the plugin contains no credential, service token, bypass, or embedded allowlist.

## Codex

Codex supports this package natively through `.codex-plugin/plugin.json`:

```sh
codex plugin marketplace add 1vecera/agentic-analytics-plugins --ref preview
codex plugin add okurka-analytics@agentic-analytics
```

The friend-facing walkthrough is at [agenticanalytics.cz/install](https://agenticanalytics.cz/install). Start a new Codex conversation, complete the browser login when prompted, and ask: `How are net revenue and EBITDA performing versus plan in the latest complete month?` The installed skill requires a delegated executor and refuses to fall back to main-session domain execution. In this repository, the project custom agent also scopes the MCP server itself to `okurka_metric_executor`; because the current OpenAI plugin package schema does not distribute custom Codex agent TOML files, a clean standalone installation delegates to a generic subagent carrying the same executor contract.

## Claude Code

Claude Code supports the same package natively through `.claude-plugin/plugin.json`:

```sh
claude plugin marketplace add https://github.com/1vecera/agentic-analytics-plugins.git
claude plugin install okurka-analytics@agentic-analytics
```

For a clean local package check before publication:

```sh
claude plugin validate --strict ./plugins/okurka-analytics
claude --plugin-dir ./plugins/okurka-analytics
```

The remote HTTP MCP connection is declared in `.claude-mcp.json`; Claude Code owns the OAuth session and does not run a repository script. The plugin selects its orchestration-only main agent and a `PreToolUse` guard denies Okurka MCP calls unless they run inside the packaged `okurka-metric-executor` subagent.

## ChatGPT

ChatGPT and Codex share the `.codex-plugin` package. Its `.app.json` contains the exact registered ChatGPT Apps SDK identifier, while `.mcp.json` retains the direct remote MCP declaration for compatible Codex clients. Install the package from the marketplace, connect Okurka Analytics, and complete the Cloudflare email challenge on first use. ChatGPT Work supports the skill's subagent workflow on eligible accounts; if subagents are unavailable, the skill fails instead of executing analytics in the main session.

## Direct MCP

Any standards-compliant client that supports Streamable HTTP and OAuth can connect to:

```text
https://mcp.agenticanalytics.cz/mcp/okurka-metricflow
```

The endpoint implements MCP over one HTTP path. Anonymous clients receive the Cloudflare Access authorization challenge; authenticated requests reach the AWS-hosted FastAPI/MetricFlow runtime. The analytical data is deterministic, synthetic, not accepted for release, and always reports `release_authority=false`.

## Delegate-only fast question contract

The normal path has three bounded stages:

- The main session creates a non-empty minimum work graph and dispatches independent semantic families concurrently.
- Each executor calls `discover_metrics` once for `executive`, `segment`, `cohort`, or `product`, then calls `query_metrics` once with all compatible metrics and explicit discovery dates.
- The main session accepts only matching terminal result envelopes, propagates failures, and assembles successful content and evidence without domain recomputation.

Use `list_metrics` only for an exhaustive catalog or troubleshooting. Do not add a preliminary time-discovery query, split compatible metrics into serial calls, inspect repository files, search the web for values, or substitute a canned answer.

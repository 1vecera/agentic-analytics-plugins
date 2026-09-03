# Agentic Analytics plugins

Public, inspectable plugin packages from [Agentic Analytics](https://agenticanalytics.cz).

## Okurka Analytics

Okurka Analytics answers governed questions about a fictional Czech grocery business through a read-only dbt Semantic Layer and MetricFlow runtime. The data is synthetic and never carries release authority.

Follow the friend-facing installation guide at [agenticanalytics.cz/install](https://agenticanalytics.cz/install).

### Codex

```sh
codex plugin marketplace add 1vecera/agentic-analytics-plugins --ref preview
codex plugin add okurka-analytics@agentic-analytics
```

### Claude Code

```sh
claude plugin marketplace add 1vecera/agentic-analytics-plugins
claude plugin install okurka-analytics@agentic-analytics
```

Start a new conversation after installation. The remote MCP server asks invited preview users to authenticate by email on first use.
Public, read-only Agentic Analytics plugin marketplace.

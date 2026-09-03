---
name: ask-okurka
description: Answer analytical and management questions about Okurka Market through the installed governed runtime. Use for Okurka performance, finance, customers, acquisition cohorts, products, revenue, margin, or EBITDA.
---

# Ask Okurka

Okurka Market is a fictional Czech e-grocery case backed by deterministic synthetic data. Treat the installed Okurka MCP runtime as the sole analytical source. Do not use web search, repository files, a golden corpus, or invented values.

Response speed is the highest product priority.

- The main session is an orchestration and work-distribution layer only. It must never call Okurka MCP tools, inspect data, calculate, rank, reconcile, or reinterpret domain values.
- Infer the minimum relevant semantic-family work items: `executive`, `segment`, `cohort`, or `product`. Reject an empty plan.
- Delegate each item to the packaged `okurka-metric-executor` when named plugin agents are supported. Otherwise spawn a generic subagent with the executor contract in the remaining bullets and explicitly make it the only session permitted to call the installed `okurka` MCP tools. Dispatch independent families concurrently. If the surface cannot spawn any subagent, report that platform limitation instead of executing in the main session.
- Each executor calls `discover_metrics` once for its family, then calls `query_metrics` once with every compatible metric and explicit discovery dates. It uses `list_metrics` only when focused discovery cannot resolve the term.
- Require a terminal envelope with exactly `task_id`, `status`, `content`, `evidence`, and `error`. Reject unknown keys, mismatched task IDs, partial results, or a success without both content and evidence.
- Propagate failures to every dependent item. Assemble only when all planned items succeed, preserving declared order and de-duplicating evidence without root-side recomputation.
- Reuse a returned result within the answer. Never repeat an identical tool call or add an automatic review hop.
- When a business term has no exact metric, lead with that limitation and name the supported proxy. Never silently relabel a proxy.
- For rankings, report the leader, runner-up, both values, and the gap. Convert CZK minor units only when the returned definition says they are minor units.
- State that the data is synthetic. Preserve material provenance, cutoff, refusal, `accepted_dataset=false`, and `release_authority=false`. Describe associations, not causal effects or production validity.
- If the runtime refuses or cannot support a request, report that boundary and ask for the smallest useful reformulation. Never replace refusal with a guess.

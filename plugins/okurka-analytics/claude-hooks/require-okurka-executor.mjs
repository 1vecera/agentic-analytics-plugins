let source = "";
for await (const chunk of process.stdin) source += chunk;

let input;
try {
  input = JSON.parse(source);
} catch {
  input = {};
}

const allowedAgentTypes = new Set([
  "okurka-metric-executor",
  "okurka-analytics:okurka-metric-executor",
]);

if (input.agent_id && allowedAgentTypes.has(input.agent_type)) process.exit(0);

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: "The Okurka main session orchestrates only. Delegate this domain call to okurka-metric-executor.",
  },
}));

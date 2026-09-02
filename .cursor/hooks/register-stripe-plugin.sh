#!/usr/bin/env bash
# Load the project-vendored Stripe Cursor plugin when this workspace opens.
set -euo pipefail

root="${CURSOR_PROJECT_DIR:-}"
if [ -z "$root" ]; then
  root="$(cd "$(dirname "$0")/../.." && pwd)"
fi

plugin_path="${root}/.cursor/plugins/stripe"

if [ ! -f "${plugin_path}/.cursor-plugin/plugin.json" ]; then
  echo '{"pluginPaths":[]}'
  exit 0
fi

python3 -c 'import json,sys; print(json.dumps({"pluginPaths":[sys.argv[1]]}))' "$plugin_path"

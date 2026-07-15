#!/usr/bin/env bash

set -e

set -o pipefail

cd "$(dirname "$0")"
SCRIPT_DIR="$(pwd)"
. "$SCRIPT_DIR"/utils/resolve_secrets.sh

echo "==> Creating .env files and resolving secrets"

touch "$SCRIPT_DIR/../.env"

secret_names=("hmpps-cas-test-users")
resolve_secrets "$SCRIPT_DIR/../e2e.env.template" \
                "$SCRIPT_DIR/../e2e.env" \
                "hmpps-community-accommodation-dev" \
                "${secret_names[@]}"

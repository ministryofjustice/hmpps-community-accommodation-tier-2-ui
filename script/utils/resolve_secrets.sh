#!/usr/bin/env bash
set -e
# shellcheck disable=SC3040
set -o pipefail

# Resolve Secrets
#
# Will replace entries in a given template file in the format ${SECRET_NAME}
# with secret values derived from the given k8s secret in the given k8s namespace
#
# $1 source template file to update
# $2 where to write the resulting file
# $3 kubernetes namespace
# $4 kubernetes secret names (array)
resolve_secrets() {
  echo "==> Resolve Secrets"

  source="$1"
  shift
  target="$1"
  shift
  k8s_namespace="$1"
  shift
  secretNames=("$@")

  echo "Rendering template '$source' to '$target' in namespace '$k8s_namespace'"

  # shellcheck disable=SC3020
  if ! command -v jq &> /dev/null
  then
      echo "Cannot find 'jq'. Please install using 'brew install jq'"
      exit 1
  fi

  # run in a subshell to limit the script of environment variables
  (
    for secretName in "${secretNames[@]}"; do

      echo "Loading secrets for $secretName"

      secrets=$(kubectl get secrets "$secretName" --namespace "$k8s_namespace" -o json | jq ".data | map_values(@base64d)")
      # get value in format 'key=value' which can then be used with the 'export' command, setting them as env vars
      for secret in $(echo "$secrets" | jq -r "to_entries | map(\"\(.key)=\(.value|tostring)\") | .[]" ); do
        # shellcheck disable=SC2163
        export "$secret" || echo "Cannot export secret"
      done

    done

    rm -f "$target"
    # resolve 'variables' in source with env vars
    envsubst < "$source" > "$target"
  )
}

# 1. Be publicly accessible

Date: 2024-05-09

## Status

Accepted

## Context

This is a retroactive ADR to document a past decision that would have been made
ahead of launching the service in Jan 2024.

- CAS2 is not a public service. All users must be signed in via HMPPS Auth
- The CAS1 and 3 frontends are not publically accessible, all users have to be
  on a trusted network and coming from a trusted IP range[1]
- CAS2 has a user group from the Nacro organisation who are unable to provide a
  static IP range in order to allow their access

[1]
<https://github.com/ministryofjustice/hmpps-temporary-accommodation-ui/blob/cbcc5c223416b1311f6f66774f2538cdc2f78d6d/helm_deploy/hmpps-temporary-accommodation-ui/values.yaml#L63>

## Decision

The frontend will be publicly accessible, rather than being behind a firewall.

## Consequences

- The service will be available publicly on the internet
- Without a firewall the defence in depth will be decreased, placing all of the
resonsibility for authenticating access with HMPPS Auth
- We will use the 2FA feature of HMPPS Auth to mandate all users use 2FA when
  accessing CAS2

# Context

<!-- Is there a Trello ticket you can link to? -->
<!-- Do you need to add any environment variables? -->
<!-- Is an ADR required? An ADR should be added if this PR introduces a change to the architecture. -->

# Changes in this PR

## Screenshots of UI changes

### Before

### After

# Release checklist

As part of our continuous deployment strategy we must ensure that this work is
ready to be released at any point. Before merging to `main` we must first
confirm:

## Pre merge checklist

- [ ] Are any changes required to the e2e tests?
- [ ] If you've added a new route, have you added a new
  `auditEvent`? (see `server/routes/apply.ts` for examples)
- [ ] Are there environment variables or other infrastructure configuration which needs to be included in this release?
- [ ] Are there any data migrations required. Automatic or manual?
- [ ] Does this rely on changes being deployed to the CAS API?

## Post merge checklist

Once we've merged it will be auto-deployed to the dev environment.

[Find the build-and-deploy job in CircleCI](https://app.circleci.com/pipelines/github/ministryofjustice/hmpps-community-accommodation-tier-2-ui).

Should a release fail at any step, you as the author should now lead the work to
fix it as soon as possible.

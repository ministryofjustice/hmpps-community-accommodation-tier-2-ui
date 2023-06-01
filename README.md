# Community Accommodation Service Tier-2 UI
[![repo standards badge](https://img.shields.io/badge/dynamic/json?color=blue&style=flat&logo=github&label=MoJ%20Compliant&query=%24.result&url=https%3A%2F%2Foperations-engineering-reports.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fhmpps-community-accommodation-tier-2-ui)](https://operations-engineering-reports.cloud-platform.service.justice.gov.uk/public-github-repositories.html#hmpps-community-accommodation-tier-2-ui "Link to report")
[![CircleCI](https://circleci.com/gh/ministryofjustice/hmpps-community-accommodation-tier-2-ui/tree/main.svg?style=svg)](https://circleci.com/gh/ministryofjustice/hmpps-community-accommodation-tier-2-ui)

The frontend for Tier 2 of the Community Accommodation Service (CAS-2).

## Prerequisites

* Docker
* NodeJs

## Setup

When running the application for the first time, run the following command:

```bash
script/setup
```

This will create .env files and install dependencies.

## Running the application

To run the application there are two options.

### 1. Using AP Tools

In order to spin up a full stack of a working API and other [dependant
services](./docker-compose.yml) we recommend using the [AP
Tools](https://github.com/ministryofjustice/hmpps-approved-premises-tools).

NB. The approach AP Tools takes solves a critical limitation for working in
development. Due to how the frontend and API authenticate requests they both
require access to _the same_ instance of hmpps-auth. This project is the focus
of our development tooling across all CAS services and is most likely to receive
future updates.

After following the set up the common commands are:

```bash
ap-tools server start --local-ui --local-api
```
(remove the `local-ui` or `local-api` flags as needed)

The service should then be available at <http://localhost:3000>

To stop run

```bash
ap-tools server stop
```

[Log in credentials are documented within AP
tools](https://github.com/ministryofjustice/hmpps-approved-premises-tools#start-server).

### 2. Manually

TBD


## Run linter

`npm run lint`

## Run unit tests

`npm run test`

## Running integration tests

Tun tests in headless mode with:

`npm run test:integration`
 
Or run tests with the cypress UI:

`npm run test:integration:ui`


## Manage infrastructure & view logs

This application is hosted on the MoJ Cloud Platform. For further details head
over to [our infrastructure
documentation](https://dsdmoj.atlassian.net/wiki/spaces/AP/pages/4325244964/Manage+infrastructure).

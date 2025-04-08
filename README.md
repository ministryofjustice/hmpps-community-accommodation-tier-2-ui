# Community Accommodation Service Tier-2 UI

[![Ministry of Justice Repository Compliance Badge](https://github-community.service.justice.gov.uk/repository-standards/api/hmpps-community-accommodation-tier-2-ui/badge)](https://github-community.service.justice.gov.uk/repository-standards/hmpps-community-accommodation-tier-2-ui)
[![CircleCI](https://circleci.com/gh/ministryofjustice/hmpps-community-accommodation-tier-2-ui/tree/main.svg?style=svg)](https://circleci.com/gh/ministryofjustice/hmpps-community-accommodation-tier-2-ui)

The frontend for Tier 2 of the Community Accommodation Service (CAS-2).

## Prerequisites

* Docker
* NodeJs

## Setup

When running the application for the first time, run the [generate-dotenv-files.sh](script/generate-dotenv-files.sh) script by executing this command from root in a Terminal:
```
./script/generate-dotenv-files.sh
```

Running the above script will generate two `.env` files required by the application:
* [.env](.env) - this is blank initially but is required for the application to deploy as we use `dotenv` as an `npm` lib in this repo. This blank file will also enable you to override properties set in the `.env.cas2-ui` file in `AP tools` where we deploy the application (see the `Running the application` section below for more details on this)
* [e2e.env](e2e.env) - this is used to load properties for the `Playwright` e2e suite (see the `E2E tests` section below for more details on this)

## Running the application

### Using AP Tools

In order to spin up a full local stack with the API (integrating with dependent services) use [AP Tools](https://github.com/ministryofjustice/hmpps-approved-premises-tools).

NB. This project is the focus of our development tooling across all CAS services and is likely to receive future updates.

After following the setup the common commands are:

* When running the API as a docker container and deploying everything (inc. this UI):
```
 ap-tools server start --cas2 --local-ui
```

* When running the API locally and deploying everything (inc. this UI):
```
 ap-tools server start --cas2 --local-ui --local-api
```

The service should then be available at <http://localhost:3000>

The same credentials used to login to the dev instance of the CAS2 UI should be used. For more information, see the [Dev & Test Users documentation](https://dsdmoj.atlassian.net/wiki/spaces/AP/pages/5624791477/Dev+Test+Users)

For a quick glance at the user logins see the [e2e.env](e2e.env) file (see the `E2E tests` section below for more details on this file)

* To stop the deployment:
```
ap-tools server stop
```

## Run linter

`npm run lint`

## Run unit tests

`npm run test`

## Running integration tests

Tun tests in headless mode with:

`npm run test:integration`

Or run tests with the cypress UI:

`npm run test:integration:ui`

## Running e2e tests

The [generate-dotenv-files.sh](script/generate-dotenv-files.sh) script run in the `Setup` section earlier generated a [e2e.env](e2e.env) by:
* copying from the [e2e.env.template](e2e.env.template) file
* swapping out the parameterized values in the template for real `Kubenetes` secrets for you. For more information, see the [Dev & Test Users documentation](https://dsdmoj.atlassian.net/wiki/spaces/AP/pages/5624791477/Dev+Test+Users)
* this [e2e.env](e2e.env) loads all of the property values required by the `Playwright` e2e suite

### Installation steps
* Install Playwright:

```bash
npm install
npx playwright install
```

### Running against UI/API hosted in your local dev environment (ap-tools)

First start the ap-tools using

```
ap-tools server stop --clear-databases
ap-tools server start --cas2 --local-ui --local-api
```

When using the Playwright UI for the first time you will need to [filter by
projects](https://github.com/ministryofjustice/hmpps-community-accommodation-tier-2-ui/pull/482/files#diff-f679bf1e58e8dddfc6cff0fa37c8e755c8d2cfc9e6b5dc5520a5800beba59a92R19) by enabling them in the top right.

Test against local environments with and without UI:

```
npm run test:e2e:local
npm run test:e2e:local:ui
```

## Enable maintenance mode

Set the environment variable `IN_MAINTENANCE_MODE` to true in the helm values of
the intended environment and all traffic will be redirected to a static page.

Users with the `CAS2_ADMIN` role are an exception to this for testing purposes.

## Manage infrastructure & view logs

This application is hosted on the MoJ Cloud Platform. For further details head
over to [our infrastructure
documentation](https://dsdmoj.atlassian.net/wiki/spaces/AP/pages/4325244964/Manage+infrastructure).

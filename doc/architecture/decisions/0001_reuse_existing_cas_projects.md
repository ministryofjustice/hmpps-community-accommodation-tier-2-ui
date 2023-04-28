# 1. Reuse work from CAS-1 and CAS-3

Date: 2023-05-10

## Status

Accepted

## Context

Community Accommodation Service-2 (aka CAS-2) is part of a broader programme of work, currently consisting of CAS-1 and CAS-3, which share a similar business domain and core concepts, such as applying for accommodation. 

## Decision

We will copy decisions, configuration, tools and design patterns in the first instance from these projects, so that we stay aligned with them and don't create unneccessary work.

* we will reuse the Approved Premises API as our backend

* we will follow the existing frontend repos as much as possible - but in a pragmatic way.
    * only bringing code in when we need it so that we can understand why it's there. (following principle of You Ain't Gonna Need It)

* If our users require different design patterns or functionality, we will discuss with team and make sure changes are documented

* we will use the existing `ap-tools` scripts so that we can run CAS dependencies in the same way as CAS1 and CAS2

* we will follow the existing CAS linting, github and deployment configurations

* we will emulate the testing process as much as possible

## Consequences

The projects will stay aligned as much as possible. We will be able to share knowledge across teams. We'll be able to spin prototypes up faster and more reliably.
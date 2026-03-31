---
title: "ADR-0007: Self-Hosted Docs Deployment Model"
description: "Records the decision to self-host the public and internal documentation sites using separately deployable static artifacts, with the internal site protected at the infrastructure boundary."
slug: "/decisions/adr/adr-0007-self-hosted-docs-deployment-model"
canonicalId: "adr-0007-self-hosted-docs-deployment-model"
audiences:
  - architects
  - engineers
  - maintainers
domain: platform
phase: architecture
docType: adr
visibility: internal
status: canonical
owner: thomas-carter
publish: true
versioned: true
reviewCadence: per-release
lastReviewed: 2026-03-31
tags:
  - adr
  - deployment
  - hosting
  - docs
  - infrastructure
sidebar_position: 7
---

# Status

Accepted

# Decision Summary

The documentation system will use a **self-hosted deployment model** built around **two separately deployable static site artifacts**:

- a **public documentation site**
- an **internal documentation site**

Both sites will be generated from the same repository, but they will be deployed as distinct static outputs with distinct hosting and access expectations.

The **public site** will be exposed openly.

The **internal site** will be protected at the **infrastructure boundary** through hosting, proxy, networking, and authentication controls rather than through the static site generator itself.

This decision exists to satisfy the project’s requirements for:

- self-hosting
- same-repo ownership of docs and product code
- clear public/internal separation
- long-term control over hosting and operations
- future flexibility to move to SaaS or other deployment targets later without changing the canonical documentation model

# Context

The documentation system has several non-negotiable characteristics:

- it must support both public and internal documentation
- it must live in the same repository as the broader project
- it must be self-hosted initially
- it must support release-versioned docs
- it must support selective publication
- it must keep the internal docs genuinely internal
- it must work with static-site generation and deterministic build artifacts

The system is also intentionally designed around two Docusaurus sites fed from one canonical root corpus. That architectural decision implies that hosting and deployment must preserve the boundary between:

- public reader access
- internal contributor/maintainer access

Because the documentation sites are static outputs, they do not themselves provide deep runtime authorization logic. A static site can be protected, but the protection belongs to the deployment architecture surrounding the built site, not to the documentation content engine alone.

This means the deployment model must be explicit about where the internal boundary is enforced and how public and internal artifacts are handled.

The deployment model also needs to remain simple enough for greenfield execution while leaving room for later evolution.

# Problem Statement

How should the documentation system be deployed so that it can:

- remain self-hosted initially
- keep public and internal documentation separate
- protect internal docs safely
- preserve the static-site deployment advantages of Docusaurus
- support versioned releases and deterministic build artifacts
- remain flexible enough to evolve later without rewriting the entire docs architecture

# Decision

The project will adopt the following deployment model:

1. The documentation system will be deployed through **two separate static site artifacts**:
   - one public
   - one internal

2. Both artifacts will be built from the same repository and from the same canonical documentation system, but they will be deployed to distinct destinations or routes with distinct access characteristics.

3. The **public docs artifact** will be deployed to public hosting and will require no internal authorization boundary.

4. The **internal docs artifact** will be deployed behind an infrastructure-level access boundary. That boundary may include:
   - reverse proxy controls
   - SSO or identity-provider integration
   - access-restricted hostnames
   - network-level restrictions
   - environment-specific hosting rules

5. The static site generator is not the authoritative enforcer of internal access. The hosting and infrastructure layer is.

6. Build, sync, versioning, and deployment preparation must treat public and internal artifacts as separate outputs, even though they originate from the same repo and canonical docs system.

7. The deployment model should remain **self-hosted-first**, while preserving the option to adopt SaaS or other managed hosting later without changing the canonical documentation structure.

# Scope

This decision applies to:

- the hosting model for the public and internal documentation sites
- the relationship between generated build artifacts and deployment targets
- the boundary between content classification and access enforcement
- CI/CD expectations for docs artifacts
- the initial operational posture of the docs system

This decision does **not** directly define:

- the exact reverse-proxy product or exact proxy config syntax
- the final identity-provider integration details
- the detailed release runbook steps
- the full deployment stack for the broader product
- the search backend implementation
- the full environment-variable strategy across every service

Those are addressed in companion architecture notes, implementation docs, and runbooks.

# Options Considered

## Option A — Self-host two separate static site deployments, one public and one internal

Under this option:

- both documentation sites are built into static artifacts
- public and internal sites are deployed separately
- the internal site is protected by the infrastructure boundary
- the same repo and canonical docs system feed both outputs

### Advantages

- strong fit with the two-site docs architecture
- clear public/internal separation
- good self-hosting control
- clear operational ownership
- compatible with static-site deployment simplicity
- supports deterministic artifact handling
- future portability remains possible

### Disadvantages

- two deployments must be built and managed
- the internal auth/proxy layer must be configured correctly
- CI/CD becomes more involved than a single-site public-only model
- operators must understand both artifact paths

## Option B — One self-hosted mixed docs deployment with path-based or route-based protection

Under this option:

- public and internal content exist within one deployed site
- path-based protection and routing differentiate access

### Advantages

- fewer deployed site artifacts
- simpler surface count at first glance
- potentially simpler shared hosting footprint

### Disadvantages

- weaker boundary clarity
- greater risk of path/config mistakes exposing internal content
- harder to reason about public/internal separation operationally
- weaker alignment with the chosen two-site docs architecture

## Option C — Host everything publicly and keep internal docs only in the repo

Under this option:

- only public docs are deployed
- internal docs live only as repo files

### Advantages

- simplest public hosting model
- less deployment work
- no internal hosting/auth surface

### Disadvantages

- fails the requirement for an internal rendered documentation site
- weakens the usability of internal docs
- pushes internal readers back to raw repo navigation instead of a real docs surface
- poor fit for runbooks, internal search, and internal reader experience

## Option D — Start with SaaS-hosted docs and defer self-hosting

Under this option:

- a hosted docs platform or managed deployment provider becomes the primary deployment path from the beginning

### Advantages

- potentially faster initial operational bring-up
- lower self-hosting burden at first

### Disadvantages

- conflicts with the self-hosting-first requirement
- can entangle the docs system with provider-specific assumptions too early
- may complicate the internal access boundary depending on provider capabilities
- weak fit for a system meant to remain repo-native and infrastructure-aware

# Decision Drivers

The decision was driven primarily by the following criteria:

1. Self-hosting control
2. Clean public/internal separation
3. Compatibility with static-site generation
4. Same-repo ownership and deployability
5. Low source-of-truth ambiguity
6. Support for internal access control at the correct layer
7. Future portability to other hosting models if needed

# Rationale

Option A was chosen because it best aligns with the already accepted architectural decisions of the documentation system.

The system already distinguishes:

- one canonical root corpus
- two rendered documentation sites
- a hard public/internal publication boundary

A deployment model that fails to preserve those distinctions would undermine the clarity created elsewhere in the architecture.

Self-hosting two static artifacts keeps the hosting model conceptually aligned with the content model:

- public content becomes a public artifact
- internal content becomes an internal artifact

This model also places access control where it properly belongs for a static site:

- at the hosting and infrastructure boundary

That is important because it prevents a dangerous false belief that the content generator itself is sufficient protection for internal docs.

At the same time, the decision does not lock the project into a permanent hosting vendor or a single infrastructure shape. It keeps the self-hosted-first requirement while preserving the ability to later move to other platforms if desired.

# Consequences

## Positive Consequences

- public and internal deployments are operationally distinct
- internal docs can be protected without weakening the source-of-truth model
- the static-site model remains simple and reliable
- deployment artifacts are easy to reason about
- future portability remains possible
- the internal site can be hosted behind stronger controls without affecting the public site
- CI/CD can treat public and internal outputs as explicit first-class deliverables

## Negative Consequences

- there are now two deployment surfaces to manage
- internal auth/proxy misconfiguration remains a real risk
- operational docs for deployment become more important
- build and release flows are more complex than a public-only docs system

## Neutral / Operational Consequences

- deployment prep tooling should stage two artifacts
- internal docs hosting will require infrastructure-specific integration
- environment separation becomes important
- maintainers must understand both the content model and the deployment boundary model
- search or analytics may need different treatment on public vs internal surfaces later

# Implementation Notes

This decision implies a deployment pipeline shaped roughly like:

1. validate canonical docs
2. generate derived content
3. sync canonical docs into public and internal site-local trees
4. build:
   - `apps/docs-public`
   - `apps/docs-internal`
5. package or stage two static artifacts
6. deploy public artifact to public hosting
7. deploy internal artifact to protected hosting

This also implies a repository structure that may include deployment support such as:

- `tools/docs/src/deploy/prepare-static-sites.ts`
- `infra/docs-stack/`
- reverse-proxy configuration
- packaging workflows for public and internal build outputs

Expected build outputs are conceptually:

- public static artifact
- internal static artifact

not one mixed deployment bundle pretending to contain both roles cleanly.

# Migration or Adoption Plan

This project is greenfield enough that the adoption path is primarily an implementation plan.

## Immediate adoption steps

- scaffold public and internal Docusaurus apps
- add deployment-preparation tooling that stages separate artifacts
- define infrastructure scaffolding for public and internal hosting
- document the internal auth boundary as infrastructure-owned
- add deployment-oriented reference and runbook docs

## Early enforcement steps

- ensure CI builds both site artifacts separately
- ensure the internal site is not treated as public-safe by default
- document clearly that internal auth is not enforced by Docusaurus alone
- keep public and internal deployment outputs structurally separate

## Later hardening steps

- integrate real identity-provider or proxy auth for the internal site
- add environment-aware deployment automation
- add backup, rollback, and release verification runbooks
- refine self-hosted operations for search, caching, and observability if needed

# Risks

This decision introduces or leaves open several risks:

- internal hosting protections could be misconfigured
- maintainers may mistakenly believe content metadata alone is sufficient protection
- deployment scripts could accidentally mix or misroute public and internal artifacts
- two-site deployment operations create more moving parts than a public-only model
- future SaaS migration, if desired, may require careful mapping of the existing boundary model

These risks are acceptable because the alternative models either fail the self-hosting requirement or weaken the public/internal boundary too much.

# Rejected Alternatives

## One mixed deployment with path protection

Rejected because it weakens the clarity of the public/internal boundary and is a poorer fit for the accepted two-site architecture.

## Public-only hosting

Rejected because it fails the requirement for an internal rendered docs surface.

## SaaS-first deployment

Rejected because it conflicts with the initial self-hosting requirement and risks prematurely binding the system to a provider-specific model.

# Follow-Up Work

- [ ] Create deployment-preparation tooling for separate public and internal artifacts
- [ ] Add infrastructure scaffolding for public/internal hosting
- [ ] Document the internal auth boundary clearly
- [ ] Create deployment and rollback runbooks
- [ ] Ensure CI builds and packages both site artifacts
- [ ] Add environment-aware deployment guidance
- [ ] Define how release-versioned docs are included in deployed artifacts

# Compliance / Enforcement

This decision should be enforced through:

- separate public and internal build targets
- deployment tooling that stages distinct artifacts
- infrastructure docs that treat internal access as hosting-layer responsibility
- code review and ops review rejecting mixed or ambiguous deployment models
- contributor docs clarifying that publication classification and deployment protection are related but not identical concerns

# Exceptions

None at this time.

A future managed-hosting or SaaS deployment could still be compatible with this ADR if it preserves:

- separate public/internal outputs or equivalent hard boundary behavior
- the same canonical documentation model
- infrastructure-level protection of internal docs

# Supersession Policy

This ADR remains authoritative until superseded by a later ADR.

It should be revisited if:

- the project moves away from self-hosting as the primary requirement
- the docs platform changes in a way that materially changes deployment assumptions
- the internal/public site model is replaced with a different surface architecture
- a future hosting platform can preserve the same boundary model more effectively with a different deployment shape

Any such change should be recorded in a superseding ADR rather than by rewriting this one in place.

# Related Documents

- `docs/reference/docs-tooling-overview.md`
- `docs/reference/publication-rules-reference.md`
- `docs/reference/versioning-policy-reference.md`
- `docs/implementation/self-hosted-deployment-plan.md`
- `docs/implementation/internal-docs-auth-integration-plan.md`
- `docs/runbooks/deploy-doc-sites-runbook.md`
- `docs/runbooks/recover-from-broken-docs-release-runbook.md`
- `docs/decisions/adr/adr-0001-two-doc-sites-one-canonical-corpus.md`
- `docs/decisions/adr/adr-0004-public-internal-publication-boundary.md`

# Notes for Future Readers

This ADR intentionally separates two questions that are often confused:

1. **Is this content eligible for public or internal publication?**
2. **How is the internal artifact actually protected in deployment?**

The first is a content-governance and sync problem.
The second is an infrastructure problem.

This ADR exists partly to keep those concerns from collapsing into each other.

# Suggested Commit Message

```text
docs(adr): add ADR-0007 for self-hosted docs deployment model
```
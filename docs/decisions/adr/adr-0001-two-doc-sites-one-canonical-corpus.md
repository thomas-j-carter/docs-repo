---
title: "ADR-0001: Two Docs Sites, One Canonical Corpus"
description: "Records the decision to maintain one canonical root documentation corpus and publish it through two separate Docusaurus sites for public and internal audiences."
slug: "/decisions/adr/adr-0001-two-doc-sites-one-canonical-corpus"
canonicalId: "adr-0001-two-doc-sites-one-canonical-corpus"
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
  - architecture
  - docs
  - source-of-truth
  - publication
sidebar_position: 1
---

# Status

Accepted

# Decision Summary

The project will maintain **one canonical authored documentation corpus** at the repository root under `docs/`, and will publish that corpus through **two separate Docusaurus sites**:

- `apps/docs-public/`
- `apps/docs-internal/`

The root `docs/` tree is the only authoritative authoring surface for documentation content. The site-local `docs/` and `blog/` trees inside the Docusaurus applications are generated synchronization targets and must not be treated as canonical source material.

This decision exists to preserve a single source of truth while still supporting a hard public/internal publication boundary.

# Context

The project needs a documentation system that serves multiple purposes simultaneously:

- a public-facing documentation experience for future users and selected public technical readers
- an internal-facing documentation experience for engineers, architects, and maintainers
- a canonical docs corpus inside the repo containing planning artifacts, references, ADRs, tutorials, runbooks, implementation notes, and captain’s-log entries
- selective publication of captain’s-log content
- release-versioned documentation snapshots
- strong search and navigability
- self-hosted deployment, with the internal docs protected by infrastructure-level auth

The project also needs to avoid a common failure mode in documentation systems: **source-of-truth drift**.

Without a clear rule, several bad patterns become likely:

- authors begin editing public and internal site-local docs separately
- public and internal variants of the same material drift apart without clear intent
- generated docs become hand-maintained
- release-versioned docs are mistaken for live authoring surfaces
- contributors cannot tell which copy of a document is authoritative

Because the documentation system is expected to be both broad and long-lived, the system needs a clear architectural rule for authorship, publication, and rendered site structure before the corpus grows.

# Problem Statement

How should the project structure its documentation so that it can:

- keep one trustworthy authored source of truth
- support both public and internal publication
- avoid duplicated manual maintenance
- preserve clean separation between public-safe and internal-only content
- remain compatible with static-site deployment and versioned docs
- scale to a large, multi-audience documentation corpus without becoming confusing or fragile

# Decision

The project will adopt the following architectural model:

1. **One canonical authored documentation corpus** will live at the repository root in `docs/`.

2. **Two separate Docusaurus sites** will exist in the same monorepo:
   - `apps/docs-public/`
   - `apps/docs-internal/`

3. The public and internal sites will be treated as **presentation layers**, not canonical authoring layers.

4. The site-local content trees inside the Docusaurus apps, such as:
   - `apps/docs-public/docs/`
   - `apps/docs-public/blog/`
   - `apps/docs-internal/docs/`
   - `apps/docs-internal/blog/`
   
   will be **generated sync outputs** derived from the canonical root `docs/` corpus.

5. Public and internal publication will be controlled by explicit metadata and sync rules, not by manual copying or manual dual-authoring.

6. Generated documentation content and versioned site artifacts are not canonical source material and must not be manually maintained as such.

# Scope

This decision applies to:

- the project documentation system
- the repository structure for docs authorship
- the public/internal documentation split
- the relationship between canonical docs and Docusaurus site-local content
- validation and sync tooling expectations
- contributor expectations about where docs should be authored

This decision does **not** directly define:

- the detailed metadata contract
- the full publication rules
- the full versioning policy
- the detailed deployment auth implementation
- the visual design of the sites
- the exact search backend implementation

Those concerns are addressed in companion ADRs, references, and implementation docs.

# Options Considered

## Option A — One canonical root corpus, two separate Docusaurus sites

Under this option:

- all authored docs live once in root `docs/`
- public and internal sites are separate Docusaurus applications
- site-local content trees are generated sync outputs
- publication boundaries are enforced through metadata, sync logic, and deployment boundaries

### Advantages

- preserves one authoritative authored source of truth
- supports a clean public/internal separation
- reduces accidental source-of-truth drift
- fits naturally with static-site deployment
- keeps public and internal navigation models separately optimizable
- allows the internal site to be operationally richer without polluting the public site
- makes the deployment boundary for internal auth clearer

### Disadvantages

- requires sync tooling
- introduces two site applications to maintain
- makes local development and CI slightly more complex
- requires discipline so contributors do not edit generated site-local trees directly

## Option B — One canonical root corpus, one mixed Docusaurus site with internal/public routing separation

Under this option:

- all docs still originate from one root corpus
- only one site application exists
- public and internal content are distinguished by routing and protection inside the same site structure

### Advantages

- fewer site applications to maintain
- possibly simpler shared theme setup
- fewer build artifacts

### Disadvantages

- weaker conceptual separation between public and internal surfaces
- greater risk of accidentally exposing internal routes or content
- public and internal navigation concerns become intermingled
- deployment/auth boundary becomes less obvious
- harder to keep a curated public site experience distinct from the richer internal working site
- large multi-surface documentation may become awkward inside one site

## Option C — Separate manually maintained public and internal docs trees

Under this option:

- public docs are authored directly in a public site tree
- internal docs are authored directly in an internal site tree
- overlap is handled manually by the contributor

### Advantages

- superficially simple mental model at first glance
- no sync tooling required
- public and internal sites can diverge freely

### Disadvantages

- very high source-of-truth drift risk
- duplicated effort
- unclear authority when the same topic exists in multiple places
- maintenance burden grows quickly
- high probability of stale mirrored content
- extremely poor fit for a disciplined documentation system intended to scale

## Option D — Use only one site and make everything public-safe

Under this option:

- the docs corpus is forced into one public-facing shape
- internal-only operational or architectural detail is minimized or excluded

### Advantages

- simplest publication model
- no internal site deployment needed
- minimal auth or hosting complexity

### Disadvantages

- fails the requirement for private/internal docs
- removes a large amount of valuable internal engineering and operational knowledge from the rendered system
- pressures authors to sanitize content rather than document truthfully
- weak fit for a serious engineering and governance documentation environment

# Decision Drivers

The decision was driven primarily by the following criteria:

1. Single authoritative source of truth
2. Clear public/internal publication boundary
3. Low long-term drift risk
4. Compatibility with static-site deployment
5. Support for selective publication
6. Support for release-versioned docs
7. Contributor clarity about where to author content
8. Ability to curate the public experience separately from the internal working experience

# Rationale

Option A was chosen because it best satisfies the project’s combined need for:

- **strong source-of-truth discipline**
- **clear public/internal separation**
- **same-repo deployment**
- **versioning support**
- **long-term maintainability**

The strongest argument for this decision is that it separates **authorship** from **presentation**.

The root `docs/` corpus remains the place where truth is authored and reviewed. The Docusaurus sites remain the places where truth is presented to different audiences.

This avoids two common traps:

1. treating rendered site trees as if they were source-of-truth authoring surfaces
2. trying to collapse public and internal docs into one giant mixed site with blurry boundaries

The project’s requirements make those traps especially costly because the documentation system is expected to include not just public docs, but also:

- internal runbooks
- internal architecture notes
- pre-code artifacts
- generated inventories
- internal captain’s-log entries
- release snapshots

A single mixed site would make the public/internal boundary harder to reason about and easier to get wrong. Separate manually maintained trees would make source-of-truth drift almost inevitable.

Option A introduces some tooling complexity, but that is an acceptable trade because the alternative complexity would emerge later as entropy, confusion, and duplication.

# Consequences

## Positive Consequences

- one clear canonical authored documentation corpus exists
- contributors have a definitive answer to “where do I write docs?”
- public/internal separation becomes structurally clearer
- sync tooling can enforce publication rules centrally
- public and internal sites can evolve independently in navigation and presentation
- the internal site can function as a richer working knowledge surface
- public curation becomes easier and safer
- release versioning remains compatible with a single authoring source

## Negative Consequences

- the project must build and maintain sync tooling
- there are now two site applications instead of one
- local development and CI workflows become more involved
- contributors may initially be confused about why site-local trees should not be hand-edited
- debugging site generation issues may involve both canonical content and sync logic

## Neutral / Operational Consequences

- `apps/docs-public/docs/` and `apps/docs-internal/docs/` become disposable generated artifacts
- tags, authors, category metadata, and generated indexes may need to be materialized into each site-local tree
- deployment pipelines will produce distinct public and internal site artifacts
- internal auth remains an infrastructure concern rather than a Docusaurus concern

# Implementation Notes

This decision implies the following repository structure at a high level:

```text
repo/
├── docs/                    # canonical authored corpus
├── apps/
│   ├── docs-public/         # public Docusaurus site
│   └── docs-internal/       # internal Docusaurus site
├── packages/
│   ├── docs-config/         # shared metadata contract and rules
│   └── docs-theme/          # shared theme elements
└── tools/
    └── docs/                # validation, generation, sync, deploy-prep
````

The decision also implies the following operational rules:

* authors write in root `docs/`
* validators inspect root `docs/`
* generators produce tool-owned outputs from approved inputs
* sync scripts route canonical docs into public/internal site-local trees
* Docusaurus builds from those site-local trees
* maintainers do not treat site-local trees as canonical source material

The following artifacts are directly implied by this ADR:

* `tools/docs/src/sync/build-public-docs.ts`
* `tools/docs/src/sync/build-internal-docs.ts`
* `packages/docs-config/src/*`
* `apps/docs-public/docusaurus.config.ts`
* `apps/docs-internal/docusaurus.config.ts`

# Migration or Adoption Plan

This project is effectively greenfield for the documentation system, so the adoption plan is primarily an implementation sequence rather than a migration from a mature prior state.

## Immediate adoption steps

* create the canonical root `docs/` tree
* create documentation templates
* define the shared metadata and taxonomy contract
* scaffold `apps/docs-public/`
* scaffold `apps/docs-internal/`
* implement validation tooling
* implement sync tooling
* establish the rule that site-local trees are generated and disposable
* document this rule in contributor and implementation docs

## Early enforcement steps

* validate canonical docs before sync or build
* fail CI if generated/synced content drifts from expected output
* document clearly that authors must not edit `apps/docs-public/docs/**` or `apps/docs-internal/docs/**` manually

## Later hardening steps

* integrate release-version workflows
* add deployment preparation flows
* add stricter public/internal boundary validation
* add search and deployment refinements

# Risks

This decision introduces or leaves open several risks:

* contributors may still edit site-local trees out of habit
* sync logic may incorrectly route content if metadata or tooling is wrong
* internal/public boundary mistakes could still happen if metadata is misclassified
* two sites increase maintenance surface area
* versioning workflows may become more complex because each site maintains its own version artifacts
* public and internal site theming may drift unless shared intentionally

These risks are real, but they are considered preferable to the long-term drift and confusion risk of dual manual authoring or a mixed-boundary site.

# Rejected Alternatives

## Single mixed public/internal site

Rejected because it weakens separation between public and internal concerns and makes the public/internal boundary less explicit at both the information architecture and deployment levels.

## Separate manually authored public and internal trees

Rejected because it creates duplicated content, unclear authority, and near-certain drift over time.

## Public-only documentation model

Rejected because it fails the requirement for internal documentation and would force the project to either omit valuable material or maintain it outside the rendered documentation system.

# Follow-Up Work

* [ ] Create the root `docs/` canonical corpus structure
* [ ] Create templates for core document types
* [ ] Define shared metadata and taxonomy contracts in `packages/docs-config/`
* [ ] Implement validation tooling in `tools/docs/src/validate/`
* [ ] Implement public and internal sync tooling in `tools/docs/src/sync/`
* [ ] Scaffold `apps/docs-public/`
* [ ] Scaffold `apps/docs-internal/`
* [ ] Add contributor docs explaining canonical authorship vs generated site-local trees
* [ ] Add CI checks for validation and sync determinism
* [ ] Add deployment preparation flows for separate public and internal outputs

# Compliance / Enforcement

This decision should be enforced through:

* contributor documentation that explicitly states the root `docs/` tree is canonical
* validation and sync tooling that operate only from root `docs/`
* CI checks that regenerate and compare synced outputs
* code review standards rejecting manual edits to generated site-local docs trees
* deployment workflows that build from generated site-local outputs rather than ad hoc copies
* clear docs conventions and references linked from templates and onboarding material

In short, this ADR becomes real only if the tooling and contributor workflow both reinforce it.

# Exceptions

None at this time.

The project may later introduce narrow exceptions for special generated content or special mirrored public-safe materials, but no exception should create a second manually maintained authored source of truth.

# Supersession Policy

This ADR remains authoritative until superseded by a later ADR.

It should be revisited if one or more of the following becomes true:

* the documentation system no longer needs a meaningful public/internal split
* the deployment/auth model changes so dramatically that separate site surfaces are no longer the best fit
* the site generator or content system changes in a way that invalidates the current authorship/presentation split
* the project adopts a fundamentally different publishing architecture

A future change of this magnitude should be recorded in a superseding ADR rather than by rewriting this one in place.

# Related Documents

* `docs/reference/docs-tooling-overview.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/implementation/docs-directory-structure-reference.md`
* `docs/implementation/docs-validation-and-sync-workflow.md`
* `docs/audience/architects/public-vs-internal-docs-architecture.md`

# Notes for Future Readers

This ADR intentionally chooses some up-front tooling complexity in exchange for lower long-term entropy.

If you revisit this decision later, do not compare the chosen model only to the immediate simplicity of a smaller alternative. Compare it to the likely long-term operating state of a large documentation corpus with:

* multiple audiences
* selective publication
* release snapshots
* internal operational material
* public-facing documentation expectations

The key question is not “could one site or two manual trees work for a month?”
The key question is “which model remains legible and trustworthy when the corpus becomes large and the project depends on it?”

# Suggested Commit Message

```text
docs(adr): add ADR-0001 for two docs sites and one canonical corpus
```

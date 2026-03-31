---
title: "Document Taxonomy Reference"
description: "Authoritative reference for the documentation taxonomy, including audience, domain, phase, document type, visibility, status, and review cadence."
slug: "/reference/document-taxonomy-reference"
canonicalId: "reference-document-taxonomy-reference"
audiences:
  - architects
  - engineers
  - maintainers
domain: platform
phase: architecture
docType: reference
visibility: internal
status: canonical
owner: thomas-carter
publish: true
versioned: true
reviewCadence: per-release
lastReviewed: 2026-03-31
tags:
  - reference
  - taxonomy
  - docs
  - metadata
sidebar_position: 2
---

# Purpose

This document defines the canonical taxonomy used by the documentation system.

Its purpose is to make the classification model for documentation explicit, stable, and enforceable. Every canonical document in the repository is expected to declare taxonomy metadata that identifies:

- who the document is for
- what subject area it belongs to
- what lifecycle phase it primarily serves
- what kind of document it is
- whether it is public or internal
- what authority or maturity state it is in
- how often it should be reviewed

This taxonomy exists so that the documentation corpus can remain understandable and navigable even as it grows across multiple audiences, domains, phases, and publication surfaces.

# Scope

This document covers the taxonomy fields used to classify canonical documentation:

- `audiences`
- `domain`
- `phase`
- `docType`
- `visibility`
- `status`
- `reviewCadence`

It defines:

- allowed values
- the meaning of each value
- when to use each value
- when not to use each value
- how the taxonomy should be applied in practice

It does **not** define:

- the full front matter schema beyond taxonomy-related fields
- slug rules
- canonical ID rules
- publication process details
- versioning eligibility details beyond what taxonomy implies
- Docusaurus site configuration

Those concerns are covered in other reference and implementation documents.

# Status and Authority

This document is the canonical reference for the documentation taxonomy.

It is normative for:

- authoring new documents
- updating existing documents
- validation rules
- sync routing behavior
- documentation review and governance
- future extensions to the taxonomy system

If tooling and this document disagree, the system should be treated as out of alignment and corrected. Tooling should enforce this taxonomy, and this document should explain the intended meaning behind that enforcement.

# Audience

This document is primarily for:

- **architects**, who need to understand the classification model behind the documentation system
- **engineers**, who author documents and implement validation, sync, and generation logic
- **maintainers**, who need to reason about publication boundaries, review cadences, and lifecycle management

It may also be useful to advanced contributors who need to understand how documents are expected to be classified.

# Definitions

## Taxonomy

The controlled vocabulary used to classify documents so they can be validated, organized, filtered, surfaced, and maintained consistently.

## Controlled Vocabulary

A restricted set of approved values for a field. Controlled vocabularies prevent uncontrolled sprawl and ambiguous classification.

## Primary Classification

The set of metadata values intentionally declared on a document to identify its audience, subject area, lifecycle context, and document type.

## Audience

The reader group or groups the document is primarily written for.

## Domain

The project subject area, bounded context, or functional area to which a document most strongly belongs.

## Phase

The lifecycle phase or work stage in which the document is primarily useful.

## Document Type

The structural class of the document, such as reference, tutorial, runbook, or ADR.

## Visibility

The publication boundary of the document: whether it may be published publicly or is limited to internal use.

## Status

The authority or maturity state of the document.

## Review Cadence

The intended frequency with which the document should be revisited for accuracy and relevance.

# Subject Overview

The documentation system supports multiple ways of understanding a document:

- by reader
- by subject area
- by lifecycle phase
- by document form
- by publication boundary
- by authority level

Without a defined taxonomy, a large documentation corpus becomes difficult to search, difficult to navigate, and difficult to govern consistently. People begin inventing their own categories, names, and meanings. Over time, the system fragments into overlapping structures that look similar but mean different things.

The taxonomy solves that problem by enforcing a small set of stable, controlled classification fields.

The taxonomy is intentionally multi-dimensional, but it is not intended to create multiple competing primary navigations in the filesystem. The filesystem remains simple and human-usable, while the taxonomy gives the system richer ways to classify and surface content through metadata, validation, indexes, and search.

# Canonical Taxonomy Fields

## `audiences`

This field identifies the primary reader groups for a document.

Type:
- array of allowed values

At least one audience is required for all authored canonical documents.

A document may target more than one audience where that is genuinely appropriate.

### Allowed values

- `users`
- `architects`
- `engineers`
- `maintainers`

### Usage guidance

Use `audiences` to describe **who the document is written for**, not merely who might happen to read it.

For example:

- a tutorial teaching contributors how to write canonical docs likely targets `engineers`
- a deployment runbook likely targets `maintainers`
- an architectural explanation of the docs system likely targets `architects`, and possibly also `engineers`
- a guide to using the public docs portal likely targets `users`

Do not add audiences merely to maximize discoverability. Over-tagging makes the taxonomy less meaningful.

## `domain`

This field identifies the project domain or functional area the document most strongly belongs to.

Type:
- single allowed value

Only one domain should be used per document unless the taxonomy later evolves to allow multi-domain documents explicitly. The intent here is to force a primary home in conceptual terms, even when a document touches multiple areas.

### Allowed values

- `identity-access`
- `membership`
- `governance`
- `legislative`
- `records-registry`
- `publication`
- `notifications`
- `search`
- `analytics`
- `platform`
- `cross-cutting`

### Usage guidance

Use the most specific accurate domain available.

Examples:

- a document about protecting the internal docs portal belongs to `identity-access` if the primary concern is auth integration, or `platform` if the primary concern is deployment/system structure
- a document about docs search belongs to `search`
- a document about the documentation system as a repo/platform concern belongs to `platform`
- a document spanning many areas equally may use `cross-cutting`

Do not use `cross-cutting` lazily when a more specific value is correct.

## `phase`

This field identifies the lifecycle phase in which the document is primarily situated or most useful.

Type:
- single allowed value

### Allowed values

- `ideation`
- `discovery`
- `planning`
- `architecture`
- `implementation`
- `testing`
- `deployment`
- `operations`
- `retrospective`

### Usage guidance

Use `phase` to express the document’s primary lifecycle context.

Examples:

- an ADR is usually `architecture`
- a local setup tutorial is usually `implementation`
- a deployment runbook is usually `operations`
- a release-deploy guide may be `deployment` or `operations` depending on its focus
- a postmortem-style journal entry may be `retrospective`

Do not confuse `phase` with current project status. A document can be actively used today while still being an `architecture` document.

## `docType`

This field identifies the document’s structural and behavioral class.

Type:
- single allowed value

### Allowed values

- `reference`
- `tutorial`
- `guide`
- `runbook`
- `adr`
- `architecture-note`
- `captain-log`
- `checklist`
- `glossary`
- `changelog`
- `specification`

### Usage guidance

Use `docType` based on the document’s purpose and structure, not just its topic.

Examples:

- a stable explanation of rules or definitions is `reference`
- a step-by-step instructional document is `tutorial`
- an operator-focused procedural recovery or execution document is `runbook`
- an architecture decision record is `adr`
- a design explanation with boundaries, flows, and trade-offs is `architecture-note`
- a chronological engineering narrative is `captain-log`

The `docType` field has strong downstream implications because some document types have required sections, different review expectations, and different versioning policies.

## `visibility`

This field identifies whether the document is eligible for public publication.

Type:
- single allowed value

### Allowed values

- `public`
- `internal`

### Usage guidance

Use `public` only when the document is safe and appropriate for publication outside the internal contributor/maintainer audience.

Use `internal` when the document includes or depends on:

- operational details
- deployment specifics
- internal URLs or topology
- auth boundaries
- sensitive implementation details
- internal-only decision context
- private runbooks or debugging material

A document’s actual content must match its declared visibility. Visibility is not merely a routing hint; it is a publication contract.

## `status`

This field indicates the maturity or authority state of the document.

Type:
- single allowed value

### Allowed values

- `draft`
- `active`
- `canonical`
- `deprecated`
- `archived`
- `superseded`

### Usage guidance

Use:

- `draft` for incomplete or not-yet-authoritative work
- `active` for currently used, currently relevant content that is not necessarily the final canonical statement
- `canonical` for the current authoritative document on a subject
- `deprecated` for content still present but no longer recommended for primary use
- `archived` for historical material kept for record purposes
- `superseded` for documents explicitly replaced by a newer document

This field is particularly important for readers trying to assess whether a document should be trusted as current guidance.

## `reviewCadence`

This field indicates how often the document should be revisited.

Type:
- single allowed value

### Allowed values

- `none`
- `weekly`
- `monthly`
- `per-release`
- `quarterly`

### Usage guidance

Use:

- `none` for content that does not require recurring review, such as many captain’s-log entries
- `weekly` for rapidly changing operational or temporary documents
- `monthly` for actively changing operational docs and runbooks
- `per-release` for canonical product or system references tied to release behavior
- `quarterly` for slower-changing foundational docs that still require regular review

This field helps maintain long-term documentation quality without pretending that all docs need the same maintenance rhythm.

# Allowed Values / Variants

## Audience values

### `users`

Use for content intended for end readers or consumers of the documentation portal who are not expected to contribute to the repo or operate the system internally.

Typical examples:
- portal navigation guides
- public getting-started material
- explanation of how to use release-versioned docs

Do not use for contributor-only or operator-only material.

### `architects`

Use for content intended to explain structure, design, boundaries, trade-offs, and long-term reasoning.

Typical examples:
- architecture overviews
- design boundaries
- versioning and publication models
- search strategy explanations

Do not use merely because the content is technical. Many technical docs are more properly for engineers or maintainers.

### `engineers`

Use for content intended for contributors implementing, modifying, or debugging the system.

Typical examples:
- local setup docs
- authoring workflow docs
- validation and sync internals
- generator integration docs

Do not use for operator-only procedures unless engineers are truly the primary audience.

### `maintainers`

Use for content intended for people operating, releasing, reviewing, or maintaining the documentation system.

Typical examples:
- runbooks
- release procedures
- deployment procedures
- review cadence governance
- rollback procedures

Do not use for general readers or contributor onboarding unless maintainers are the true primary target.

## Domain values

### `identity-access`

Use when the document primarily concerns authentication, access boundaries, identity flows, or permission-related concerns.

### `membership`

Use when the document primarily concerns membership features or processes in the broader platform domain.

### `governance`

Use when the document primarily concerns governance mechanics, governance data, or governance processes.

### `legislative`

Use when the document primarily concerns legislative workflows or legislative domain concepts.

### `records-registry`

Use when the document primarily concerns records, registers, archival structures, or registry behavior.

### `publication`

Use when the document primarily concerns publishing behavior, publication surfaces, or publication workflows.

### `notifications`

Use when the document primarily concerns notification delivery, notification architecture, or related user communication systems.

### `search`

Use when the document primarily concerns search indexing, search UX, search architecture, or search operations.

### `analytics`

Use when the document primarily concerns analytics, telemetry, metrics, or usage tracking.

### `platform`

Use when the document primarily concerns repository-level, tooling-level, infrastructure-level, or cross-docs-system concerns.

### `cross-cutting`

Use when the document genuinely spans multiple domains and no single more-specific domain is the clear primary home.

This value should be used sparingly.

## Phase values

### `ideation`

Use for early concept formation, problem framing, and exploration of initial ideas.

### `discovery`

Use for investigation, clarification, and research phases that shape later planning or design.

### `planning`

Use for structured scoping, sequencing, roadmap, and implementation planning.

### `architecture`

Use for design-level documents defining structure, boundaries, trade-offs, and system decisions.

### `implementation`

Use for contributor-facing work that helps build or change the system.

### `testing`

Use for validation, QA, test strategy, verification workflows, or testing-related docs.

### `deployment`

Use for release packaging, artifact delivery, or moving the system into a deployed state.

### `operations`

Use for steady-state running, monitoring, maintenance, incident response, and routine operational procedures.

### `retrospective`

Use for lessons learned, postmortems, and backward-looking reflection documents.

## Document type values

### `reference`

Stable explanatory or normative material defining rules, meanings, and authoritative facts.

### `tutorial`

Step-by-step instructional material leading a reader through a real outcome.

### `guide`

Instructional or advisory material that is less strict or procedural than a tutorial.

### `runbook`

Operational procedure material intended for execution under real conditions.

### `adr`

Architecture decision record capturing a significant architectural decision and its rationale.

### `architecture-note`

Detailed design explanation covering components, boundaries, flows, risks, and trade-offs.

### `captain-log`

Chronological journal-style engineering log entry combining narrative, tutorial, and engineering report elements.

### `checklist`

Short action-oriented verification or completion list.

### `glossary`

Definition-oriented material for project-specific terms.

### `changelog`

A record of changes over time, either authored or generated depending on project rules.

### `specification`

A normative technical or product specification document.

## Visibility values

### `public`

Eligible for publication on the public documentation site.

Use only when both metadata and content are genuinely public-safe.

### `internal`

Restricted to internal publication and internal use.

Use for the default case when in doubt, then explicitly promote to public only after confirming safety and suitability.

## Status values

### `draft`

Incomplete and not yet authoritative.

### `active`

In current use and relevant, but not necessarily the final source of truth on the subject.

### `canonical`

The current authoritative document for the subject.

### `deprecated`

Still present, but no longer recommended for normal use.

### `archived`

Retained for historical or recordkeeping reasons.

### `superseded`

Replaced by a newer document that should now be consulted instead.

## Review cadence values

### `none`

No recurring review expectation.

### `weekly`

Frequent review for highly volatile content.

### `monthly`

Routine review for operationally active documents.

### `per-release`

Review tied to release cycles.

### `quarterly`

Periodic review for slower-changing but important content.

# Structure / Data Model / Layout

The taxonomy appears in document front matter as structured metadata.

A typical authored document includes taxonomy fields like:

```yaml
audiences:
  - engineers
  - maintainers
domain: platform
phase: operations
docType: runbook
visibility: internal
status: active
reviewCadence: monthly
````

The taxonomy is used by:

* validation tooling
* sync routing logic
* generated indexes
* search metadata
* documentation governance
* maintainership review

The taxonomy is **not** intended to replace clear filesystem structure. It complements the filesystem by providing richer classification semantics than folder paths alone can express.

# Application Rules

## Rule 1 — Every canonical authored document must declare taxonomy metadata

Every authored document in the canonical corpus must explicitly declare the applicable taxonomy fields.

This requirement exists so the documentation system can remain machine-reasonable and human-governable.

## Rule 2 — Classification should be intentional, not maximalist

Choose the smallest accurate set of classifications.

Do not add extra audiences, generalized domains, or vague statuses merely to make a document feel more broadly applicable.

## Rule 3 — The taxonomy must match the actual content

If a document is labeled `public`, its content must truly be public-safe.

If a document is labeled `runbook`, it should actually function as an executable procedure.

If a document is labeled `canonical`, it should truly be maintained as the authoritative statement.

Taxonomy is not cosmetic.

## Rule 4 — Path placement and taxonomy should reinforce each other

Where the filesystem structure implies a classification, the metadata should agree.

Examples:

* a document under `docs/runbooks/` should normally have `docType: runbook`
* a document under `docs/journal/public/` should normally have `docType: captain-log` and `visibility: public`
* a document under `docs/decisions/adr/` should normally have `docType: adr`

## Rule 5 — Taxonomy should support governance as well as navigation

Taxonomy is not only for search or filtering. It also exists so the system can answer questions like:

* which docs need review this release
* which docs are authoritative
* which docs are safe to publish
* which docs belong to operational maintenance
* which docs are historical rather than active

# Examples

## Example 1 — Architect-facing reference doc

```yaml
audiences:
  - architects
  - engineers
domain: platform
phase: architecture
docType: reference
visibility: internal
status: canonical
reviewCadence: per-release
```

This is correct for a reference document explaining the documentation system’s structure or rules.

## Example 2 — Internal runbook

```yaml
audiences:
  - maintainers
  - engineers
domain: platform
phase: operations
docType: runbook
visibility: internal
status: active
reviewCadence: monthly
```

This is correct for a deployment or recovery procedure.

## Example 3 — Public tutorial

```yaml
audiences:
  - users
domain: platform
phase: operations
docType: tutorial
visibility: public
status: canonical
reviewCadence: per-release
```

This is correct for a tutorial teaching readers how to use the public docs portal.

## Example 4 — Internal captain’s-log entry

```yaml
audiences:
  - engineers
  - maintainers
domain: platform
phase: implementation
docType: captain-log
visibility: internal
status: active
reviewCadence: none
```

This is correct because a journal entry is typically historical, internal by default, and not part of recurring review cycles.

# Non-Examples / Invalid Cases

## Invalid Example 1 — Over-broad audience tagging

```yaml
audiences:
  - users
  - architects
  - engineers
  - maintainers
```

This is invalid in spirit unless the document truly serves all four groups directly and intentionally. Most documents should not target every audience.

## Invalid Example 2 — Public operational secret-bearing document

```yaml
docType: runbook
visibility: public
```

This may be invalid depending on the content. Most operational runbooks contain internal details and should not be public by default.

## Invalid Example 3 — Captain’s-log marked canonical

```yaml
docType: captain-log
status: canonical
```

This is generally incorrect. A captain’s-log entry is a historical record, not the enduring canonical source of truth for the subject. It may be useful, important, or insightful, but it should not usually replace the corresponding reference, ADR, or architecture note.

## Invalid Example 4 — Arbitrary domain value

```yaml
domain: documentation
```

This is invalid because `documentation` is not an approved domain value in the controlled vocabulary.

# Constraints

The taxonomy is shaped by several constraints:

* the documentation system must remain understandable to humans
* the taxonomy must remain enforceable by tooling
* the number of approved values must remain small enough to be meaningful
* the taxonomy must support both public and internal publication flows
* the taxonomy must support long-term governance and review
* the taxonomy must not become so granular that contributors cannot classify documents confidently

These constraints mean the taxonomy should grow slowly and intentionally.

# Operational Implications

In practice, this taxonomy means:

* contributors must classify documents deliberately
* validators can reject invalid or inconsistent metadata
* search and index pages can surface docs more intelligently
* maintainers can reason about review obligations and publication boundaries
* public/internal routing can remain explicit
* release-versioned content can be curated more effectively
* documentation governance becomes more systematic rather than ad hoc

# Common Mistakes

Common mistakes include:

* treating `audiences` as a popularity tag instead of a real readership classification
* using `cross-cutting` when a more specific `domain` is correct
* confusing `phase` with current project status
* picking `docType` based on topic rather than structure and intent
* labeling content `public` before actually checking the content for publication safety
* using `canonical` for documents that are still provisional or exploratory
* leaving `reviewCadence` at an arbitrary default instead of choosing a meaningful value

# Validation and Enforcement

The taxonomy is expected to be enforced through:

* front matter validation
* enum validation against approved controlled vocabularies
* path-placement validation
* publication-boundary validation
* document-class structural validation
* review and code review discipline

Tooling should fail clearly when taxonomy values are missing, invalid, or inconsistent with path placement or document type.

# Exceptions

There are no standing broad exceptions to the taxonomy rules.

Any temporary or transitional exception should be:

* narrow
* explicitly documented
* time-bounded if possible
* removed once the transition is complete

No exception should silently invent new taxonomy values or bypass publication boundaries.

# Change Management

Changes to the taxonomy must be treated as architectural changes to the documentation system.

The normal change process should be:

1. identify why the existing vocabulary is insufficient
2. assess whether the need is real and recurring rather than one-off
3. update or add an ADR if the change is significant
4. update this document
5. update `packages/docs-config/`
6. update validators, generators, and sync tooling as needed
7. review affected documents for reclassification

Taxonomy changes should be rare and deliberate.

# Related Documents

* `docs/reference/docs-tooling-overview.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/implementation/docs-authoring-workflow.md`
* `docs/decisions/adr/adr-0002-audience-first-information-architecture.md`

# Revision Notes

* Initial version established the canonical taxonomy for the documentation system.
* Future revisions should be made cautiously because taxonomy changes affect validation, sync behavior, and contributor workflows.

# Suggested Commit Message

```text
docs(reference): add document taxonomy reference
```
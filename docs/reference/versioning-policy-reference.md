---
title: "Versioning Policy Reference"
description: "Authoritative reference for documentation versioning policy, including what is versioned, what is not versioned, when release snapshots are created, and how versioned documentation should be governed."
slug: "/reference/versioning-policy-reference"
canonicalId: "reference-versioning-policy-reference"
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
  - versioning
  - docs
  - release
sidebar_position: 5
---

# Purpose

This document defines the canonical policy for documentation versioning in the repository.

Its purpose is to make explicit:

- what kinds of documentation should be preserved as release-versioned snapshots
- what kinds of documentation should remain living or chronological rather than versioned
- when a documentation version should be cut
- what “current,” “latest release,” and historical versions mean
- how versioning interacts with the canonical root `docs/` corpus
- what responsibilities maintainers and tooling have in the versioning workflow

This policy exists because versioning is powerful but expensive. If applied indiscriminately, it creates unnecessary maintenance overhead, duplicated content, and reader confusion. If applied too narrowly, it fails to preserve the exact historical record needed to understand released system behavior.

# Scope

This document covers versioning policy for the documentation system.

It defines:

- the meaning of versioned documentation
- eligible and ineligible content classes
- release-snapshot timing
- how current docs relate to versioned docs
- what should remain unversioned
- governance and enforcement expectations
- how documentation versioning should relate to release behavior

It does **not** define:

- the exact CLI commands or step-by-step release procedure
- the full deployment workflow
- the full metadata contract
- the Docusaurus configuration details for version routing
- the authoring style for specific document classes

Those concerns belong in implementation docs, runbooks, and tooling references.

# Status and Authority

This document is the canonical reference for documentation versioning policy.

It is normative for:

- document authors deciding whether content should be versioned
- maintainers cutting release documentation snapshots
- tooling that validates versioning eligibility
- sync and build behavior related to versioned documentation
- future decisions about expanding or reducing the scope of versioning

If an accepted ADR defines a higher-level versioning rule, that ADR takes precedence and this document must be updated accordingly.

# Audience

This document is primarily for:

- **architects**, who need to understand the long-term historical model of the documentation system
- **engineers**, who author and classify documents and may implement versioning-related tooling
- **maintainers**, who operate release, version-cut, and documentation governance workflows

It is also useful to contributors who need to understand why some documents are frozen by release while others remain living or chronological.

# Definitions

## Versioned Documentation

Documentation preserved as a named release snapshot so readers can access the documentation state associated with a specific release.

## Current Documentation

The actively maintained, forward-moving documentation state representing ongoing work and the next or current working state of the project.

## Release Snapshot

A preserved version of eligible documentation material associated with a specific release identifier.

## Latest Release Docs

The versioned documentation set representing the most recent release intended for stable reference.

## Historical Docs

Older preserved documentation versions retained for accuracy, auditability, comparison, and operational clarity.

## Living Documentation

Documentation that is actively updated in place and not duplicated into every release snapshot.

## Chronological Documentation

Documentation whose historical value comes from time order rather than release freezing, such as captain’s-log entries.

## Versioning Eligibility

Whether a document class and individual document are appropriate to preserve in release snapshots.

# Subject Overview

The documentation system is built around one canonical root corpus and two rendered site surfaces, but not all documentation should be preserved the same way.

Some documentation is tightly coupled to release behavior and should be frozen so readers can understand the exact state of the system at a given release.

Other documentation is either:

- operational and best kept current,
- historical by nature,
- exploratory,
- or too volatile to justify release-by-release duplication.

This policy therefore adopts **selective versioning**.

Selective versioning means:

- version only what benefits from exact release preservation
- keep current working docs in the canonical corpus
- preserve narrative history through chronological records, not version duplication
- avoid multiplying documents into release snapshots when doing so would not improve reader understanding or system governance

This approach balances historical accuracy with maintainability.

# Canonical Rules / Contracts / Interfaces

## Rule 1 — Versioning is selective, not universal

The project does **not** version every document.

Versioning should be used only for documentation that materially benefits from being preserved exactly with a release.

This rule exists to prevent runaway duplication and documentation sprawl.

## Rule 2 — A document must be both policy-eligible and explicitly marked versioned

A document should only participate in versioned release snapshots when:

- its document class is eligible for versioning by policy
- and its front matter explicitly declares `versioned: true`

This keeps versioning intentional and machine-checkable.

## Rule 3 — Captain’s-log entries are not versioned

Captain’s-log entries are chronological historical records.

They should remain historical by date and route, not be duplicated into every release snapshot.

Their history already exists in narrative chronology and repository history. Release-version duplication adds little value and creates noise.

## Rule 4 — Runbooks are unversioned by default

Runbooks generally represent operational practice and should usually remain current rather than release-frozen.

A runbook may later become versioned only if there is a strong and explicit reason to preserve release-specific operational behavior, but the default policy is unversioned.

## Rule 5 — Canonical reference material tied to release behavior should be versioned

When a document describes stable behavior, interfaces, contracts, or user-facing behavior that meaningfully differs by release, versioning is appropriate.

This applies especially to reference material and release-relevant guides.

## Rule 6 — Versioning should follow release boundaries, not arbitrary authoring milestones

A new documentation version should be cut when there is a meaningful release boundary, not merely because a document changed.

Versioning should reflect release understanding, not everyday edit churn.

## Rule 7 — The root canonical corpus remains current working source, not a version archive

The root `docs/` tree remains the active source of truth for ongoing documentation work.

Versioned site-local artifacts are derived release snapshots, not the primary authoring surface.

This distinction is essential for keeping authorship and historical preservation separate.

## Rule 8 — Versioning should preserve reader trust

If a reader opens versioned documentation for release `X`, the content should reflect the documentation intended for release `X`, not a later drifted state.

Versioning exists to preserve this trust.

# Versioning Eligibility by Document Type

## `reference`

Default policy:
- versioned when the content describes stable behavior, rules, interfaces, or definitions that readers may need to compare across releases

Examples typically versioned:
- API behavior references
- user-facing behavior references
- authoritative system references tied to release state
- major canonical docs-system references if they are meant to reflect the released system behavior

Examples often not versioned:
- highly internal, constantly evolving process references that are better maintained as living docs unless tied to released behavior

## `tutorial`

Default policy:
- often versioned when tied to released functionality or released contributor workflows
- may remain unversioned if purely internal and operationally current

Examples typically versioned:
- public user tutorials for using the released documentation portal
- contributor tutorials tied to released repository behavior

Examples often unversioned:
- temporary internal setup tutorials during tooling bootstrapping

## `guide`

Default policy:
- versioned when guide content is meaningfully release-specific
- otherwise evaluated case by case

## `runbook`

Default policy:
- not versioned

Reason:
- runbooks should usually reflect the current correct operational practice, not accumulate release-by-release duplicates

Exception:
- allowed only with explicit justification and policy update or narrow approved exception

## `adr`

Default policy:
- versioned

Reason:
- ADRs are stable historical records of accepted decisions and can appropriately be preserved in versioned snapshots where those decisions shape the released system state

Important nuance:
- versioning an ADR does not mean the ADR itself changes every release; it means the release snapshot includes the authoritative ADR set applicable at that point in time

## `architecture-note`

Default policy:
- versioned when the note describes the architecture of the released system or an accepted target architecture tied to the release
- not versioned if purely exploratory or temporary

## `captain-log`

Default policy:
- never versioned

Reason:
- chronological journal history is already the preservation model

## `checklist`

Default policy:
- usually not versioned unless explicitly tied to release-specific acceptance or release-specific compliance criteria

## `glossary`

Default policy:
- usually versioned when it describes terms relevant to released behavior or released system understanding

## `changelog`

Default policy:
- inherently release-related
- whether authored or generated, changelog material should be preserved as part of release understanding

## `specification`

Default policy:
- versioned when the specification defines released behavior, released interfaces, or released expectations

# Versioning Eligibility by Content Category

## Usually versioned

The following categories are usually good candidates for versioning:

- stable user-facing docs
- public tutorials tied to released behavior
- canonical reference docs
- architectural overviews tied to released system structure
- glossary material used by released readers
- accepted ADRs relevant to the released system
- generated API or schema references tied to released artifacts
- changelog or release-summary material

## Usually not versioned

The following categories are usually poor candidates for versioning:

- captain’s-log entries
- active runbooks
- temporary working notes
- exploratory ideation material
- rough pre-code drafts not intended as release artifacts
- internal-only process notes that should remain current
- operational troubleshooting notes that change frequently and are not part of the released reader experience

# Versioning States and Meanings

## Current / Working Docs

These are the actively maintained docs in root `docs/`.

They represent:
- the next state of the system
- the current working understanding
- the source material from which future snapshots may be cut

## Latest Release Docs

These are the most recent stable versioned docs intended for readers who want the released-state documentation rather than in-progress working-state documentation.

## Historical Release Docs

These are older version snapshots preserved for:

- comparison
- support
- auditability
- understanding of past released behavior
- maintenance of older deployed versions where relevant

# Structure / Data Model / Layout

The versioning policy is driven by both metadata and workflow.

Relevant front matter field:

```yaml
versioned: true | false
````

Examples:

A versioned reference doc:

```yaml
docType: reference
status: canonical
versioned: true
```

An unversioned runbook:

```yaml
docType: runbook
status: active
versioned: false
```

An unversioned captain’s-log entry:

```yaml
docType: captain-log
status: active
versioned: false
```

A versioned ADR:

```yaml
docType: adr
status: canonical
versioned: true
```

This policy assumes:

* root `docs/` remains the canonical current corpus
* site-local versioning artifacts are created in the rendered site applications
* versioning snapshots are created from the synchronized eligible content of the site, not by manually forking the canonical corpus

# Release Snapshot Timing

A documentation version should generally be cut when:

* a meaningful release is being finalized
* the docs for that release have been validated and synchronized
* the release-specific behavior and explanations are ready to preserve
* maintainers are prepared to freeze the release view

A documentation version should generally **not** be cut merely because:

* a single document changed
* a small internal note changed
* a journal entry was added
* a temporary workflow doc was updated
* a partial draft exists

The version boundary should track meaningful release boundaries.

# What Versioning Should Preserve

Versioning should preserve:

* reader-facing truth for the release
* authoritative guidance tied to the release
* historical comparability
* stable routes for historical releases where applicable
* the documentation set needed to understand the release as it existed

Versioning should not be used to preserve every intermediate authoring state. That is what Git history and chronological journal records are for.

# Examples

## Example 1 — Correctly versioned reference

A user-facing reference doc describing released search behavior is marked:

```yaml
docType: reference
visibility: public
status: canonical
versioned: true
```

This is correct because:

* the doc is stable and reader-facing
* the behavior may differ across releases
* preserving exact release truth is useful

## Example 2 — Correctly unversioned captain’s-log entry

A journal entry documenting the first sync pipeline pass is marked:

```yaml
docType: captain-log
versioned: false
```

This is correct because:

* the historical model for the document is chronology, not release duplication

## Example 3 — Correctly unversioned runbook

A deployment runbook is marked:

```yaml
docType: runbook
versioned: false
```

This is correct because:

* the runbook should track current operational truth rather than be copied into every release snapshot

## Example 4 — Correctly versioned ADR

An ADR defining the two-site documentation architecture is marked:

```yaml
docType: adr
status: canonical
versioned: true
```

This is correct because:

* it is part of the stable architectural record shaping the released system

# Non-Examples / Invalid Cases

## Invalid Example 1 — Captain’s-log marked versioned

```yaml
docType: captain-log
versioned: true
```

Why invalid:

* captain’s-log history is preserved chronologically, not by release snapshotting

## Invalid Example 2 — Temporary draft marked versioned

```yaml
status: draft
versioned: true
```

Why likely invalid:

* a draft should not generally enter a release snapshot unless it is intentionally part of release-facing documentation and truly ready for preservation

## Invalid Example 3 — Runbook versioned by habit

```yaml
docType: runbook
versioned: true
```

Why usually invalid:

* runbooks are current operational procedures and should not be duplicated into release snapshots by default

## Invalid Example 4 — Assuming versioned docs replace current docs

A contributor treats versioned docs as the ongoing authoring surface.

Why invalid:

* root `docs/` remains the canonical current source
* versioned docs are preserved outputs, not normal authoring targets

# Constraints

The versioning policy is shaped by the following constraints:

* the documentation corpus must remain maintainable over time
* release history must be trustworthy
* not all documentation has equal historical value
* static-site versioning introduces real operational and contributor complexity
* the root canonical corpus must remain usable as the active source of truth
* historical preservation must not create a second manual authoring universe
* readers need clarity between current working docs and stable released docs

These constraints make selective versioning the most practical and disciplined model.

# Operational Implications

In practice, this policy means:

* contributors must think deliberately before marking a document `versioned: true`
* maintainers must validate version eligibility during release preparation
* release cuts should include documentation review, not only code review
* current docs can continue to evolve after a version is cut
* historical release docs remain available without freezing the whole active corpus
* journal content remains simpler because it is preserved chronologically
* runbooks remain more useful because they stay current by default

# Common Mistakes

Common mistakes include:

* assuming all important docs should be versioned
* treating journal content as release-frozen content
* versioning runbooks without a real need
* forgetting that `versioned: true` should reflect policy, not personal preference
* assuming Git history alone is enough for reader-facing release documentation
* cutting a version before docs are validated and synchronized
* confusing “current working docs” with “latest stable release docs”

# Validation and Enforcement

The versioning policy should be enforced through both tooling and review.

Tooling should enforce at least:

* presence of explicit `versioned` metadata
* rejection of disallowed combinations such as `docType: captain-log` with `versioned: true`
* rejection or warning for known-bad combinations such as runbooks marked versioned
* release workflows that only version eligible content
* site build processes that treat versioned snapshots as derived artifacts rather than authoring surfaces

Human review should verify:

* whether a document truly benefits from release preservation
* whether a document marked versioned is actually stable and release-relevant
* whether unversioned content is being correctly left current
* whether a release snapshot represents coherent release truth

# Exceptions

The main standing exceptions are limited.

Examples:

* a runbook may be versioned only if there is a clearly justified release-specific operational need and the exception is documented
* an exploratory architecture note may remain unversioned even if architecture notes are often versioned, if it is not part of release truth
* a temporary release-support checklist may be versioned if it functions as a formal release artifact and that use is documented

Any exception should be:

* explicit
* narrow
* reviewable
* justified by real release needs

# Change Management

Changes to versioning policy affect:

* metadata expectations
* release workflow
* historical preservation strategy
* site behavior
* maintainer responsibilities
* contributor authoring discipline

The normal change path should be:

1. identify the versioning problem or new need
2. determine whether the change is architectural
3. update or add an ADR if the change is significant
4. update this reference
5. update templates and metadata guidance if needed
6. update validation and release tooling
7. review affected documents for compliance

Versioning policy should change cautiously, because frequent policy swings damage historical consistency.

# Related Documents

* `docs/reference/docs-tooling-overview.md`
* `docs/reference/document-taxonomy-reference.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/implementation/docs-release-workflow.md`
* `docs/implementation/generated-content-pipeline-overview.md`
* `docs/decisions/adr/adr-0003-selective-versioning-policy.md`
* `docs/runbooks/add-new-release-version-runbook.md`

# Revision Notes

* Initial version established the selective versioning policy for the documentation system.
* Future revisions should be coordinated with release workflows, validators, and site versioning behavior.

# Suggested Commit Message

```text
docs(reference): add versioning policy reference
```
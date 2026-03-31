---
title: "Front Matter Contract Reference"
description: "Authoritative reference for the front matter contract used by canonical documentation, including required fields, field meanings, content-class differences, and enforcement expectations."
slug: "/reference/frontmatter-contract-reference"
canonicalId: "reference-frontmatter-contract-reference"
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
  - metadata
  - frontmatter
  - docs
sidebar_position: 3
---

# Purpose

This document defines the canonical front matter contract for authored documentation in the repository.

Its purpose is to make the metadata requirements for documents explicit, stable, and enforceable so that:

- contributors know what every document must declare
- validation tooling can enforce consistent document structure
- sync tooling can route documents correctly
- publication boundaries remain explicit
- versioning rules can be applied predictably
- search, indexing, and navigation can rely on trustworthy metadata
- documentation governance remains systematic rather than ad hoc

The front matter contract is one of the core mechanisms that turns the documentation corpus into a manageable system rather than a collection of loosely formatted files.

# Scope

This document covers the metadata contract for canonical authored documents in the root `docs/` corpus.

It defines:

- required front matter fields
- recommended optional fields
- field meanings
- field-level constraints
- document-class-specific requirements
- differences between canonical docs, captain’s-log entries, and generated docs
- enforcement expectations

It does **not** define:

- full prose structure rules for each document type
- the complete taxonomy rationale
- detailed publication policy
- the versioning workflow itself
- Docusaurus theme or UI configuration
- deployment-layer authentication behavior

Those subjects are addressed in companion reference, implementation, architecture, and runbook documents.

# Status and Authority

This document is the canonical reference for the documentation front matter contract.

It is normative for:

- all authored canonical docs in `docs/`
- validation tooling
- sync tooling
- generator output metadata requirements
- contributor expectations during authoring and review

If templates, validation code, or contributor habits disagree with this document, the system is out of alignment and should be corrected.

Where an accepted ADR defines a higher-level rule that affects front matter behavior, the ADR takes precedence and this document must be updated to reflect it.

# Audience

This document is primarily for:

- **engineers**, who author documents or implement docs tooling
- **architects**, who need to understand the contract that supports the documentation system design
- **maintainers**, who rely on metadata to govern publication, review, versioning, and release workflows

It is also useful for advanced contributors who need to understand exactly how canonical documents are expected to declare themselves.

# Definitions

## Front Matter

A YAML metadata block at the top of a Markdown or MDX file used to declare structured fields about the document.

## Canonical Document

A human-authored document in the root `docs/` tree that serves as the source of truth for documentation content.

## Journal Entry

A `captain-log` document that records chronological work, decisions, commands, mistakes, and outcomes in narrative form.

## Generated Document

A document produced by tooling rather than authored directly as primary source content.

## Required Field

A metadata field that must be present and valid for the document class.

## Optional Field

A metadata field that is allowed but not required.

## Controlled Field

A metadata field whose value must come from an approved controlled vocabulary rather than arbitrary free text.

## Canonical ID

A stable identifier assigned to a document so the document can be tracked across renames, path changes, and version snapshots.

## Slug

The route-oriented identifier used to define the document’s URL path in the rendered site.

# Subject Overview

The front matter contract exists because the documentation system has to do more than render Markdown.

It must also:

- classify documents by audience, domain, phase, and document type
- separate public and internal publication
- distinguish canonical and non-canonical content
- decide what is eligible for versioning
- route content into public and internal site-local trees
- generate indexes and support search
- preserve long-term governance and review signals

None of that can be done reliably if metadata is inconsistent, implicit, or optional in practice.

The contract is therefore intentionally explicit and relatively strict.

However, the contract is not identical for every file. Different document classes have slightly different needs:

- canonical docs need stable identity and classification
- journal entries need chronology and authorship
- generated docs need provenance

This document defines the common base contract first, then the specialized requirements for each content class.

# Canonical Rules / Contracts / Interfaces

## Rule 1 — Every canonical authored document must declare explicit front matter

All authored canonical docs in the root `docs/` corpus must include explicit front matter.

This is required even when a static site generator could infer a value from the filename, title, or path.

The reason is simple: inference is convenient for a small content site, but a documentation system for a complex project needs explicit, reviewable declarations.

## Rule 2 — Metadata must be semantically true, not merely syntactically valid

A field is not correct merely because it parses.

Examples:

- `visibility: public` is invalid in practice if the content contains internal-only material
- `status: canonical` is invalid in practice if the document is only a rough draft
- `docType: tutorial` is invalid in practice if the document is actually a reference
- `phase: operations` is invalid in practice if the document is clearly about architecture

The contract governs meaning, not just shape.

## Rule 3 — Required fields must be present for the document class

Different document classes require different fields.

Examples:

- all canonical docs require identity and classification fields
- captain’s-log entries require chronology and authorship fields
- generated docs require provenance fields

A missing required field is a validation error.

## Rule 4 — Controlled fields must use approved values

Fields such as `domain`, `phase`, `docType`, `visibility`, `status`, and `reviewCadence` must use approved values from the documentation taxonomy.

Arbitrary new values must not be introduced informally.

## Rule 5 — The front matter contract is shared across tooling, not redefined per script

Validation, generation, sync, and site-preparation tooling must all rely on the same contract definitions.

This is why the contract belongs in shared configuration code rather than being hardcoded inconsistently in multiple scripts.

## Rule 6 — Public-facing content requires stronger metadata discipline

Public documents should be held to a higher metadata standard than internal-only documents.

At minimum, public docs should always include:

- clear `title`
- meaningful `description`
- valid `slug`
- accurate `visibility`
- correct classification
- high-confidence authoring quality

This is because public docs affect not only routing and governance but also reader trust, discoverability, and release clarity.

# Base Front Matter Contract

The base contract applies to all canonical authored docs unless a more specific document-class rule adds requirements.

## Required base fields

### `title`

Type:
- string

Required:
- yes

Purpose:
- the human-readable title of the document

Requirements:
- must be explicit
- must be meaningful
- should be concise but clear
- should accurately describe the document

Bad examples:
- `Notes`
- `Stuff`
- `Plan`

Good examples:
- `Front Matter Contract Reference`
- `Rebuild Documentation Sites Runbook`
- `Captain’s Log: First Validation Pass`

### `description`

Type:
- string

Required:
- yes

Purpose:
- a concise summary of what the document is and why it matters

Requirements:
- must be meaningful, not filler
- should help a reader and search system understand the document’s purpose
- should be specific enough to distinguish the document from nearby topics

Bad example:
- `A document about docs.`

Better example:
- `Authoritative reference for the front matter contract used by canonical documentation, including required fields, field meanings, and enforcement expectations.`

### `slug`

Type:
- string

Required:
- yes

Purpose:
- defines the intended route path of the document in rendered sites

Requirements:
- must be stable
- must be route-safe
- must be unique within the relevant rendered site context
- should reflect the document’s role and location

Guidance:
- use explicit slugs rather than relying entirely on inferred routes
- avoid accidental collisions with site routes such as `/blog`, `/docs`, `/versions`, or other reserved top-level pages

### `canonicalId`

Type:
- string

Required:
- yes

Purpose:
- stable, globally unique identity for the document across path changes, renames, and versions

Requirements:
- must be unique across the canonical corpus
- should be stable once introduced
- should not be repurposed for another document

Examples:
- `reference-frontmatter-contract-reference`
- `adr-0001-two-doc-sites-one-canonical-corpus`
- `runbook-rebuild-doc-sites`

This field is central to long-term content tracking and should not be treated casually.

### `audiences`

Type:
- array of controlled values

Required:
- yes

Purpose:
- identifies the primary reader groups for the document

Requirements:
- must contain at least one valid audience
- must use only approved values
- should not be inflated beyond the real intended readership

See the taxonomy reference for allowed values and meaning.

### `domain`

Type:
- single controlled value

Required:
- yes

Purpose:
- identifies the primary subject-area home of the document

Requirements:
- must use an approved value
- must represent the primary domain, not every domain touched by the document

### `phase`

Type:
- single controlled value

Required:
- yes

Purpose:
- identifies the lifecycle phase where the document is primarily situated or useful

Requirements:
- must use an approved value
- should reflect the primary lifecycle context of the document

### `docType`

Type:
- single controlled value

Required:
- yes

Purpose:
- identifies the structural class of the document

Requirements:
- must use an approved value
- must match the actual document form and intent
- may trigger additional structural and behavioral validation

### `visibility`

Type:
- single controlled value

Required:
- yes

Purpose:
- defines the publication boundary of the document

Requirements:
- must be either `public` or `internal`
- must match the content’s actual publication safety
- must align with routing expectations in sync tooling

### `status`

Type:
- single controlled value

Required:
- yes

Purpose:
- indicates the authority or maturity of the document

Requirements:
- must use an approved value
- should accurately reflect the document’s real standing

### `owner`

Type:
- string

Required:
- yes

Purpose:
- identifies the responsible human or logical owner of the document

Requirements:
- should identify the primary responsible party
- should remain meaningful over time
- may be a person or later a team/role if the project evolves that way

In the current system, the expected value is typically:

- `thomas-carter`

Generated docs may later use a tooling-oriented owner such as `docs-automation`.

### `publish`

Type:
- boolean

Required:
- yes

Purpose:
- determines whether the document is intended to be published into rendered outputs

Requirements:
- must be explicit
- should usually be `true` for normal canonical docs
- may be `false` for temporary, in-progress, or intentionally unpublished content

Important:
- `publish: true` does not override `visibility`
- a `public` document with `publish: false` is still not rendered
- an `internal` document with `publish: true` is still internal-only

### `versioned`

Type:
- boolean

Required:
- yes

Purpose:
- indicates whether the document is eligible to participate in release-versioned documentation snapshots

Requirements:
- must be explicit
- must align with the document type and versioning policy
- must not be `true` for document classes that should remain unversioned, such as captain’s-log entries

### `reviewCadence`

Type:
- single controlled value

Required:
- yes

Purpose:
- indicates how often the document should be revisited

Requirements:
- must use an approved value
- should match the document’s volatility and governance importance

### `lastReviewed`

Type:
- ISO date string

Required:
- yes

Purpose:
- records when the document was last affirmatively reviewed

Requirements:
- should be a valid date
- should be updated when the document receives a meaningful review
- should not be faked merely to silence governance checks

### `tags`

Type:
- array of strings from the approved tag registry

Required:
- yes in practice for authored canonical docs

Purpose:
- supports discovery, grouping, and filtering

Requirements:
- should use approved tags
- should be relevant and restrained
- should not become a substitute for real classification fields

The exact tag-enforcement mechanism may evolve, but this document assumes disciplined tag usage as part of the standard.

# Recommended Optional Fields

The following fields are recommended where appropriate even if they are not universally mandatory.

## `sidebar_position`

Useful for:
- docs intended for ordered sidebar placement

Purpose:
- influences sidebar ordering in Docusaurus docs sections

Use when:
- a stable human order is desired

Do not rely on it as the only ordering mechanism if category metadata or generated indexes are doing the actual navigation work.

## `keywords`

Useful for:
- public docs
- search-sensitive reference docs
- major landing docs

Purpose:
- provides supplemental discoverability cues

## `image`

Useful for:
- public pages
- social-sharing-sensitive docs
- high-value public tutorials or guides

Purpose:
- provides an associated social or metadata image where the rendered site supports it

## `sidebar_label`

Useful for:
- long-titled docs that need a shorter navigation label

Purpose:
- provides a more compact sidebar name without sacrificing a descriptive full title

## `toc_max_heading_level`

Useful for:
- long documents where table-of-contents depth should be controlled

Purpose:
- keeps rendered page TOCs readable

These optional fields should support clarity, not create metadata clutter.

# Document-Class-Specific Contracts

## Canonical authored docs

This class includes:

- reference docs
- tutorials
- guides
- runbooks
- ADRs
- architecture notes
- checklists
- glossaries
- specifications
- most implementation docs

Required base fields:
- all base required fields listed above

Recommended optional fields:
- `sidebar_position`
- `keywords`
- `sidebar_label`
- `toc_max_heading_level`

Typical characteristics:
- stable identity
- explicit classification
- publication and versioning metadata
- governance metadata

## Captain’s-log entries

This class includes:

- internal journal entries
- public journal entries

Required base fields:
- all base required fields

Additional required fields:

### `authors`

Type:
- array of author identifiers

Required:
- yes

Purpose:
- identifies the author(s) of the journal entry

Requirements:
- should reference valid known authors
- should be explicit even when the filename or Git history might imply authorship

Current expected typical value:
- `thomas-carter`

### `date`

Type:
- ISO date string

Required:
- yes

Purpose:
- records the journal entry date for chronology and rendered blog behavior

Requirements:
- must be explicit
- should match the actual session or publication date
- should align with filename date prefixes where those are used

Expected constraints for captain’s-log entries:
- `docType` must be `captain-log`
- `versioned` must be `false`
- `reviewCadence` is usually `none`
- `visibility` must align with whether the entry belongs in public or internal journal flows

## Generated docs

Generated docs are tool-produced rather than handwritten as canonical source content, but they still require metadata.

Required base fields:
- most of the base fields, adapted to generated ownership

Additional required fields:

### `generatedFrom`

Type:
- string

Required:
- yes

Purpose:
- describes the source input from which the document was produced

Examples:
- a path to an OpenAPI source file
- a schema directory
- a changelog source inventory
- a generator input location

### `generatedAt`

Type:
- ISO datetime string or deterministic timestamp strategy

Required:
- yes

Purpose:
- records when the generation occurred or what deterministic generation marker was used

Expected generated-doc conventions:
- `owner` is typically tooling-oriented, such as `docs-automation`
- `publish` is usually `true` if the generated output is intended for rendered sites
- `versioned` depends on the content class and release policy
- the document should make its generated nature clear

# Allowed Values / Variants

The following fields are controlled and must use approved values.

## Controlled taxonomy fields

These fields must use approved controlled values from the taxonomy:

- `audiences`
- `domain`
- `phase`
- `docType`
- `visibility`
- `status`
- `reviewCadence`

Their allowed values and usage meanings are defined in:

- `docs/reference/document-taxonomy-reference.md`

## Boolean behavioral fields

### `publish`

Allowed values:
- `true`
- `false`

Meaning:
- whether the document should be materialized into rendered outputs

### `versioned`

Allowed values:
- `true`
- `false`

Meaning:
- whether the document is eligible for release-version preservation

## Strings with structured expectations

### `slug`

Must:
- be a string
- be route-appropriate
- be stable
- avoid collisions

### `canonicalId`

Must:
- be a string
- be globally unique in the canonical corpus
- be stable once established

### `owner`

Must:
- be meaningful to governance and accountability

### `description`

Must:
- be informative
- not be placeholder filler

# Structure / Data Model / Layout

A typical canonical reference doc front matter block looks like:

```yaml
---
title: "Front Matter Contract Reference"
description: "Authoritative reference for the front matter contract used by canonical documentation, including required fields, field meanings, and enforcement expectations."
slug: "/reference/frontmatter-contract-reference"
canonicalId: "reference-frontmatter-contract-reference"
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
  - metadata
  - frontmatter
sidebar_position: 3
---
````

A typical captain’s-log entry adds chronology and authorship:

```yaml
---
title: "Captain’s Log: First Validation Pass"
description: "Recorded the first serious validation pass over the canonical docs corpus and tightened metadata enforcement."
slug: "/journal/2026-04-01-first-validation-pass"
canonicalId: "captains-log-2026-04-01-first-validation-pass"
audiences:
  - engineers
  - maintainers
domain: platform
phase: implementation
docType: captain-log
visibility: internal
status: active
owner: thomas-carter
publish: true
versioned: false
reviewCadence: none
lastReviewed: 2026-04-01
tags:
  - captains-log
  - validation
authors:
  - thomas-carter
date: 2026-04-01
---
```

A typical generated doc adds provenance:

```yaml
---
title: "OpenAPI Source Inventory"
description: "Inventory of OpenAPI source files used by the documentation generation pipeline."
slug: "/generated/openapi/source-inventory"
canonicalId: "generated-openapi-source-inventory"
audiences:
  - engineers
  - maintainers
domain: platform
phase: implementation
docType: reference
visibility: internal
status: active
owner: docs-automation
publish: true
versioned: true
reviewCadence: per-release
lastReviewed: 2026-03-31
tags:
  - generated
  - openapi
generatedFrom: "openapi/"
generatedAt: "2026-03-31T00:00:00Z"
---
```

# Field-by-Field Guidance

## Identity fields

These fields answer: “What is this document?”

* `title`
* `slug`
* `canonicalId`

They should be stable, meaningful, and intentionally chosen.

## Classification fields

These fields answer: “What kind of document is this, who is it for, and where does it belong conceptually?”

* `audiences`
* `domain`
* `phase`
* `docType`

They support navigation, validation, governance, and routing.

## Publication fields

These fields answer: “Should this document be rendered, and where?”

* `visibility`
* `publish`

They are central to the public/internal split and must be semantically correct.

## Authority and governance fields

These fields answer: “How authoritative is this document, and how is it maintained?”

* `status`
* `owner`
* `reviewCadence`
* `lastReviewed`
* `versioned`

They support long-term governance and release discipline.

## Discovery fields

These fields answer: “How will readers and systems find or understand this document?”

* `description`
* `tags`
* `keywords`
* `sidebar_label`

These should support clarity and discoverability without becoming noise.

## Chronology and provenance fields

These fields answer: “Who authored or generated this, and when?”

For journal entries:

* `authors`
* `date`

For generated docs:

* `generatedFrom`
* `generatedAt`

# Examples

## Example 1 — Valid reference document

```yaml id="39cp7h"
title: "Publication Rules Reference"
description: "Defines the public/internal publication rules and how they are enforced."
slug: "/reference/publication-rules-reference"
canonicalId: "reference-publication-rules-reference"
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
  - publication
```

Why it is valid:

* stable identity is present
* classification is complete
* publication boundary is explicit
* governance fields are present
* the description is meaningful

## Example 2 — Valid public tutorial

```yaml id="pnv1el"
title: "Navigate the Documentation Portal"
description: "Tutorial for readers learning how to use audience navigation, search, and release-versioned docs."
slug: "/tutorials/navigate-the-documentation-portal"
canonicalId: "tutorial-navigate-the-documentation-portal"
audiences:
  - users
domain: platform
phase: operations
docType: tutorial
visibility: public
status: canonical
owner: thomas-carter
publish: true
versioned: true
reviewCadence: per-release
lastReviewed: 2026-03-31
tags:
  - tutorial
  - users
```

Why it is valid:

* public publication is explicit and plausible
* the document class fits the intended content
* governance fields are present
* the document is version-eligible

## Example 3 — Valid internal journal entry

```yaml id="zz17da"
title: "Captain’s Log: First Sync Pipeline Pass"
description: "Recorded the first full pass at routing canonical docs into public and internal site-local trees."
slug: "/journal/2026-04-02-first-sync-pipeline-pass"
canonicalId: "captains-log-2026-04-02-first-sync-pipeline-pass"
audiences:
  - engineers
  - maintainers
domain: platform
phase: implementation
docType: captain-log
visibility: internal
status: active
owner: thomas-carter
publish: true
versioned: false
reviewCadence: none
lastReviewed: 2026-04-02
tags:
  - captains-log
  - sync
authors:
  - thomas-carter
date: 2026-04-02
```

Why it is valid:

* includes required journal fields
* correctly keeps `versioned: false`
* classification and chronology are coherent

# Non-Examples / Invalid Cases

## Invalid Example 1 — Missing canonical identity

```yaml id="8sjg0j"
title: "Some Reference"
description: "A reference document."
audiences:
  - engineers
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
```

Why it is invalid:

* missing `slug`
* missing `canonicalId`

Without explicit identity fields, reliable routing and stable tracking are weakened.

## Invalid Example 2 — Journal entry missing chronology fields

```yaml id="vyrt67"
title: "Captain’s Log: Build Attempt"
description: "Tried a build."
slug: "/journal/build-attempt"
canonicalId: "captains-log-build-attempt"
audiences:
  - engineers
domain: platform
phase: implementation
docType: captain-log
visibility: internal
status: active
owner: thomas-carter
publish: true
versioned: false
reviewCadence: none
lastReviewed: 2026-03-31
tags:
  - captains-log
```

Why it is invalid:

* missing `authors`
* missing `date`

A journal entry without explicit chronology and authorship is incomplete.

## Invalid Example 3 — Semantic mismatch in publication

```yaml id="3rb3n7"
title: "Internal Auth Boundary Reference"
description: "Explains the internal docs auth boundary."
slug: "/reference/internal-auth-boundary-reference"
canonicalId: "reference-internal-auth-boundary-reference"
audiences:
  - architects
  - maintainers
domain: identity-access
phase: deployment
docType: reference
visibility: public
status: canonical
owner: thomas-carter
publish: true
versioned: true
reviewCadence: per-release
lastReviewed: 2026-03-31
tags:
  - reference
  - auth
```

Why it is invalid:

* the metadata may parse
* but the declared `visibility: public` is likely semantically incorrect if the content explains internal auth boundaries in operational detail

## Invalid Example 4 — Captain’s-log marked versioned

```yaml id="x25hbh"
docType: captain-log
versioned: true
```

Why it is invalid:

* journal entries are historical narrative records and should not be treated as release-versioned canonical reference content

# Constraints

The front matter contract is shaped by several constraints:

* the system must support two rendered sites from one canonical corpus
* metadata must be machine-validatable
* publication boundaries must be explicit
* release-versioning must be selective
* routing and indexing must be deterministic
* generated content must remain distinguishable from authored source content
* the contract must remain usable by human authors, not only by tooling

These constraints require the contract to be explicit but not excessively bloated.

# Operational Implications

In practice, this contract means:

* contributors must fill in metadata deliberately, not casually
* templates are essential and should be used
* validation should run before sync or build
* maintainers can trust metadata enough to support release/version workflows
* sync tooling can separate public and internal docs with less ambiguity
* document ownership and review cadence become visible rather than implicit
* metadata changes can be treated as meaningful content changes rather than mere formatting

# Common Mistakes

Common mistakes include:

* omitting `canonicalId` because the filename feels sufficient
* writing a vague `description` that provides no real summary value
* using too many audiences
* setting `visibility: public` before confirming publication safety
* setting `status: canonical` on documents that are still exploratory
* forgetting `authors` and `date` on captain’s-log entries
* forgetting provenance fields on generated docs
* changing `canonicalId` casually during renames
* treating `publish` and `visibility` as interchangeable when they serve different roles

# Validation and Enforcement

The front matter contract should be enforced through:

* YAML parsing validation
* required-field validation by document class
* enum validation for controlled fields
* uniqueness checks for `canonicalId`
* uniqueness checks for effective `slug`
* path-placement checks
* publication-boundary checks
* versioning-eligibility checks
* document-structure checks for specific document types
* generated-provenance checks for generated docs

Tooling should fail fast and clearly when this contract is violated.

Human review should also verify:

* metadata truthfulness
* classification quality
* description clarity
* publication safety
* stable identity discipline

# Exceptions

There are no broad standing exceptions to the front matter contract.

Any exception should be:

* explicitly documented
* operationally justified
* narrow in scope
* removed when the transitional need ends

The system should not silently tolerate missing or ambiguous metadata in order to be “flexible.”

# Change Management

Changes to the front matter contract must be managed carefully because they affect:

* templates
* canonical docs
* validation logic
* sync behavior
* generation behavior
* CI rules
* contributor workflow

The normal change path should be:

1. determine whether the change is architectural or merely additive
2. update or create an ADR if the change is significant
3. update this document
4. update templates
5. update `packages/docs-config/`
6. update validators and related tooling
7. review affected existing documents for compliance

The contract should evolve slowly and deliberately.

# Related Documents

* `docs/reference/docs-tooling-overview.md`
* `docs/reference/document-taxonomy-reference.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/implementation/docs-authoring-workflow.md`
* `docs/implementation/docs-validation-and-sync-workflow.md`
* `docs/decisions/adr/adr-0005-generated-docs-are-tool-owned.md`
* `docs/decisions/adr/adr-0006-canonical-id-and-slug-policy.md`

# Revision Notes

* Initial version established the canonical front matter contract for the documentation system.
* Future revisions should be coordinated with templates, validation tooling, and contributor workflow documentation.

# Suggested Commit Message

```text
docs(reference): add front matter contract reference
```
---
title: "Publication Rules Reference"
description: "Authoritative reference for how documentation is classified for public or internal publication, how publication eligibility is enforced, and how selective publishing should be handled across the documentation system."
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
  - docs
  - governance
sidebar_position: 4
---

# Purpose

This document defines the canonical publication rules for the documentation system.

Its purpose is to make explicit:

- which documentation may be published publicly
- which documentation must remain internal
- how the `visibility` and `publish` fields should be interpreted together
- how selective publication should be handled
- how publication safety should be evaluated
- how tooling and review processes should enforce publication boundaries

The publication rules exist to ensure that the documentation system can safely serve multiple audiences without collapsing the distinction between public-facing guidance and internal operational knowledge.

# Scope

This document covers the publication model for the canonical documentation corpus and its rendered outputs.

It defines:

- the meaning of publication eligibility
- the difference between `visibility` and `publish`
- what belongs in the public site
- what belongs only in the internal site
- how public/internal routing decisions should be made
- how selective publication should work for captain’s-log entries and other content classes
- what should never be publicly exposed by default

It does **not** define:

- the full metadata schema
- the entire taxonomy model
- the details of versioning policy
- deployment-specific auth or reverse proxy configuration
- the content style guide
- the visual IA of the public or internal sites

Those concerns are covered elsewhere.

# Status and Authority

This document is the canonical reference for documentation publication policy.

It is normative for:

- document authors
- reviewers
- validation and sync tooling
- public/internal content routing behavior
- maintainers responsible for release and deployment
- future policy changes affecting exposure of documentation content

If this document and tool behavior diverge, the system should be treated as out of alignment and corrected.

Accepted ADRs that define publication boundaries take precedence over this document. This reference should explain and operationalize those higher-level decisions.

# Audience

This document is primarily for:

- **architects**, who need to understand the publication boundary as part of the documentation system architecture
- **engineers**, who author documents and implement sync and validation rules
- **maintainers**, who govern release/versioning and operate the public and internal site surfaces

It is also useful for any contributor unsure whether a document should be public or internal.

# Definitions

## Publication

The act of materializing documentation into a rendered site surface where it is accessible to its intended audience.

## Public Publication

Publication into the public documentation site, intended for readers outside the internal contributor or operator boundary.

## Internal Publication

Publication into the internal documentation site, intended only for internal readers and protected by the infrastructure access boundary.

## Publication Eligibility

Whether a document is allowed to appear in a rendered site at all, and if so, in which rendered site or sites.

## Selective Publication

The deliberate choice to publish only certain eligible documents publicly while keeping other documents internal.

## Visibility

A metadata field that describes the allowed publication boundary of a document:
- `public`
- `internal`

## Publish

A metadata field that describes whether a document should currently be rendered into site outputs at all:
- `true`
- `false`

## Public-Safe Content

Content that can be published publicly without exposing internal operational detail, infrastructure detail, security-sensitive information, or internal-only decision context.

## Internal-Only Content

Content that should remain behind the internal publication boundary because it exposes information, workflows, risks, or operational detail not appropriate for public publication.

# Subject Overview

The documentation system supports two rendered surfaces:

- a **public documentation site**
- an **internal documentation site**

Those two sites are not separate authoring systems. They are filtered, synchronized, and routed views over one canonical root `docs/` corpus.

That architecture only works safely if publication rules are explicit and enforced.

The publication model is intentionally built around two separate questions:

1. **Is this content allowed to be public or must it remain internal?**  
   This is governed by `visibility`.

2. **Should this content currently be published at all?**  
   This is governed by `publish`.

These two questions must remain distinct.

A document can be:

- public-eligible but not currently published
- internal-only and published internally
- internal-only and not currently published
- public-eligible and published publicly
- public-eligible and also available internally, depending on sync rules and site policy

The system should never blur these distinctions.

# Canonical Rules / Contracts / Interfaces

## Rule 1 — `visibility` and `publish` are not interchangeable

`visibility` answers:

- where the document is allowed to be published

`publish` answers:

- whether the document should be published right now

These fields must not be treated as synonyms.

Examples:

- `visibility: public` and `publish: false` means the document is eligible for public publication but is not currently rendered
- `visibility: internal` and `publish: true` means the document is rendered, but only into the internal site
- `visibility: internal` and `publish: false` means the document is currently unpublished entirely

## Rule 2 — Public eligibility must be conservative

A document should only be marked `visibility: public` when its actual content is genuinely appropriate for public publication.

When there is meaningful doubt, the default should be:

- `visibility: internal`

Promotion from internal to public should be deliberate, not casual.

## Rule 3 — Public publication requires both public eligibility and active publish intent

A document should only appear on the public site when both of the following are true:

- `visibility: public`
- `publish: true`

If either condition is not satisfied, it must not appear on the public site.

## Rule 4 — Internal publication requires active publish intent and internal eligibility

A document should appear on the internal site when:

- `publish: true`
- and the document is eligible for internal rendering under the site policy

In this system, internal publication typically includes:
- all `visibility: internal` published docs
- all `visibility: public` published docs that are also useful to internal readers

This allows the internal site to function as a superset view where appropriate, while the public site remains restricted to public-safe content.

## Rule 5 — Public publication must never rely on manual copying

Public exposure must be governed by metadata and sync rules, not by manual copying of files into public site directories.

The public site must be built from canonical content through deterministic filtering and routing.

This prevents accidental or inconsistent publication.

## Rule 6 — Sensitive content must never be “soft-public”

There is no such thing as “basically public but with some internal parts.”

If a document contains internal-only material, it is internal.

If a document needs a public counterpart, that public counterpart should be:
- separately authored
- sanitized
- intentionally scoped

Do not publish mixed-sensitivity documents and hope readers ignore the sensitive portions.

## Rule 7 — Selective publication is the standard for captain’s-log content

Captain’s-log entries should default to internal unless there is a clear reason to publish them publicly.

A public journal entry should be:

- safe
- intentional
- useful to external readers
- written without exposing internal operational details or sensitive context

The public journal is not a mirror of the internal engineering diary.

## Rule 8 — Publication safety is a content truth issue, not just a metadata issue

A document can be syntactically valid and still violate publication policy.

For example:
- a document marked `public` may still be unsafe if it contains internal topology details
- a public tutorial may still be unsafe if it includes internal URLs
- a public architecture note may still be unsafe if it exposes security-sensitive operational boundaries

Review and validation must therefore consider both metadata and actual content.

# Publication Model

## Public site publication model

The public site should contain only content that is explicitly intended for public readers.

Typical categories include:

- user-facing guides
- public tutorials
- high-level architecture overviews safe for public readers
- selected public reference docs
- selected public glossary material
- selected public journal entries
- release-visible public documentation

The public site should **not** be treated as a passive spillover destination from the canonical corpus.

## Internal site publication model

The internal site should contain operationally useful internal documentation.

Typical categories include:

- engineer-facing docs
- maintainer docs
- internal architecture notes
- implementation notes
- runbooks
- ADRs
- pre-code artifacts
- internal reference docs
- internal journal entries
- public-eligible docs that are also useful internally

The internal site is a working documentation environment, not merely a mirror of the public site with a login screen.

# Allowed Publication States

The publication model can be described with the following combinations.

## State 1 — Public and published

```yaml
visibility: public
publish: true
````

Meaning:

* the document may appear on the public site
* the document may also appear on the internal site if internal sync policy includes public docs

Typical examples:

* public tutorials
* public user-facing guidance
* selected public journal entries
* public reference docs

## State 2 — Public-eligible but currently unpublished

```yaml
visibility: public
publish: false
```

Meaning:

* the document is safe and intended to be public eventually or conditionally
* it should not currently render into the public site

Typical examples:

* a public-facing draft not yet ready to expose
* staged content awaiting release timing
* content temporarily withdrawn from publication

## State 3 — Internal and published

```yaml
visibility: internal
publish: true
```

Meaning:

* the document is rendered into the internal site
* it must not appear on the public site

Typical examples:

* runbooks
* internal architecture notes
* internal implementation docs
* ADRs
* internal journal entries

## State 4 — Internal and unpublished

```yaml
visibility: internal
publish: false
```

Meaning:

* the document is not currently rendered into either site
* it remains canonical source content in the repo but is intentionally not published

Typical examples:

* incomplete internal drafts
* working notes not yet ready for publication
* transitional documents awaiting consolidation

# Publication Guidance by Document Type

## Reference documents

Reference docs may be public or internal depending on subject matter.

Public examples:

* navigation reference for users
* public docs usage reference
* safe high-level architecture or glossary references

Internal examples:

* front matter contract reference
* publication rules reference
* internal auth boundary reference
* generated-doc ownership reference

Do not assume “reference” means safe for public publication.

## Tutorials

Tutorials may be public or internal depending on audience and content.

Public examples:

* how to use the docs portal
* how to read versioned docs
* how to follow public project progress

Internal examples:

* how to add a generated docs source
* how to fix validation failures
* how to cut release docs versions

Tutorials often look easy to publish, but they can become unsafe quickly if they include internal commands, internal routes, or internal workflows.

## Runbooks

Runbooks should be treated as internal by default.

Public runbooks are unusual and should require explicit justification.

Most runbooks involve operational detail, recovery procedures, deployment behavior, or internal topology, all of which are internal concerns.

## ADRs

ADRs should be treated as internal by default unless the project explicitly decides to publish a subset of architectural decisions publicly.

Even when an ADR seems conceptually safe, it often contains decision context, rejected alternatives, or trade-offs that are internal rather than public-facing.

## Architecture notes

Architecture notes may be public or internal depending on depth and subject.

High-level public-safe notes can be public.

Deep implementation-boundary notes, auth-boundary notes, operational notes, or notes exposing internal topology should be internal.

## Captain’s-log entries

Captain’s-log entries should default to internal.

Public captain’s-log entries should be selected intentionally and usually rewritten or authored with public readership in mind.

A public journal entry should generally:

* focus on learnings, milestones, or safe architectural rationale
* avoid sensitive operational details
* avoid internal hostnames, credentials, security details, or internal-only references

## Specifications

Specifications may be public or internal depending on their role.

Public specs may describe externally meaningful behavior.

Internal specs may include internal workflow details, internal implementation constraints, or sensitive boundary details.

# Public-Safe Content Criteria

A document is a candidate for public publication only when all of the following are true:

* it does not expose internal infrastructure details that should remain private
* it does not expose secrets, secret-handling details, or internal auth/ops behavior that should remain restricted
* it does not expose internal-only URLs, hostnames, environments, or service topology
* it does not expose sensitive operational recovery or incident-response procedures
* it does not expose private decision context that should remain internal
* it is useful and coherent for an external reader
* it does not depend on internal-only companion documents for safe interpretation

A document that fails any of those tests should remain internal.

# Internal-Only Content Criteria

A document should remain internal when it includes or depends on:

* deployment internals
* reverse proxy or auth boundary specifics
* internal hostnames or routing details
* operational runbooks
* incident response or recovery procedures
* debugging traces
* internal-only implementation detail
* private architectural debate or decision context
* pre-code exploratory work not intended for external audiences
* internal-only indexes, inventories, or build details

This list is not exhaustive. Use judgment conservatively.

# Selective Publication Rules

## Selective publication is preferred over automatic mirroring

Not all public-eligible content should automatically become public.

Sometimes content is public-safe in principle but not yet ready, not yet useful externally, or not well-shaped for public readers.

The system should support selective publication through:

* `publish: false`
* deliberate review
* targeted public promotion
* separate public-friendly rewrites where needed

## Public and internal twins may both exist

In some cases, the right solution is not one document with compromised sensitivity, but two related documents:

* a public-safe summary
* an internal detailed companion

This is especially useful for:

* architecture notes
* deployment-related docs
* journal entries
* implementation summaries

When doing this, make the relationship explicit in `Related Documents`.

## Public journal publication should be editorial, not automatic

The public journal should represent curated, safe, valuable progress visibility.

It should not function as a raw mirror of internal engineering work.

# Structure / Data Model / Layout

The publication rules are primarily driven by these front matter fields:

```yaml
visibility: public | internal
publish: true | false
```

A public-safe authored document might look like:

```yaml
visibility: public
publish: true
```

An internal-only runbook might look like:

```yaml
visibility: internal
publish: true
```

A staged public doc not yet ready for release might look like:

```yaml
visibility: public
publish: false
```

A non-published working draft might look like:

```yaml
visibility: internal
publish: false
```

Sync tooling should interpret these fields deterministically and route content accordingly.

# Examples

## Example 1 — Correct public tutorial

```yaml
title: "Navigate the Documentation Portal"
visibility: public
publish: true
docType: tutorial
```

Why this is correct:

* the content is intended for public readers
* the document is actively meant to render
* the type fits the use case

## Example 2 — Correct internal runbook

```yaml
title: "Rebuild Documentation Sites Runbook"
visibility: internal
publish: true
docType: runbook
```

Why this is correct:

* the procedure is operational
* it belongs internally
* it should be published for internal readers

## Example 3 — Correct staged public doc

```yaml
title: "How to Read Release-Versioned Docs"
visibility: public
publish: false
docType: guide
```

Why this is correct:

* the content is public-safe in principle
* it is intentionally withheld from publication until ready

## Example 4 — Correct internal journal entry

```yaml
title: "Captain’s Log: First Local Build Attempt"
visibility: internal
publish: true
docType: captain-log
```

Why this is correct:

* the journal is primarily an internal engineering trace
* it is useful internally
* it is not automatically public

# Non-Examples / Invalid Cases

## Invalid Example 1 — Public-marked internal auth doc

```yaml
title: "Internal Docs Auth Boundary Reference"
visibility: public
publish: true
```

Why this is invalid:

* the subject strongly suggests internal-only security and deployment detail
* public eligibility is likely false in substance

## Invalid Example 2 — Internal content manually copied to public output

A contributor edits a file directly in:

* `apps/docs-public/docs/`

to force something onto the public site.

Why this is invalid:

* public publication must come from canonical source content and sync rules
* site-local trees are generated, not authoritative

## Invalid Example 3 — Public journal as raw internal diary dump

A journal entry includes:

* internal hostnames
* failed internal auth details
* internal deployment troubleshooting
* operator-only context

but is marked:

```yaml
visibility: public
publish: true
```

Why this is invalid:

* the content is not actually safe for public publication, regardless of metadata intent

## Invalid Example 4 — Assuming `publish: true` means public

```yaml
visibility: internal
publish: true
```

Interpreted as:

* “this will show publicly”

Why this is invalid:

* `publish: true` only means “eligible to render in allowed outputs”
* `visibility` still controls the exposure boundary

# Constraints

The publication rules are shaped by several constraints:

* the docs system must support both public and internal readers
* the internal site is a static site and must rely on infrastructure for access control
* the same canonical corpus feeds both site surfaces
* contributors need simple, explicit publication metadata
* accidental public exposure must be treated as a serious failure
* not every useful internal document is valuable or safe for public audiences
* public readers should see curated, coherent material rather than internal raw process traces

These constraints justify a conservative and explicit publication model.

# Operational Implications

In practice, these rules mean:

* authors must think deliberately about publication safety
* public promotion should be a conscious editorial and architectural decision
* reviewers must check not only metadata but actual content safety
* sync tooling must filter deterministically
* maintainers must treat public/internal exposure as a governance concern, not merely a site-generation detail
* internal docs can serve as the broader working knowledge base
* the public site should remain intentionally shaped and trustworthy

# Common Mistakes

Common mistakes include:

* treating `visibility` and `publish` as interchangeable
* marking a document public because the topic sounds abstract, even though the content is operationally sensitive
* assuming journal entries are public by default
* copying public-safe snippets from internal docs without writing a proper public counterpart
* exposing internal links, routes, or hostnames in otherwise public-facing documents
* forgetting that internal readers may still need public documents surfaced internally
* using `publish: false` as a substitute for honest `status` or cleanup discipline

# Validation and Enforcement

Publication rules should be enforced through both tooling and review.

Automatically enforced where practical:

* `visibility` must be a valid controlled value
* `publish` must be explicit
* sync must never place `visibility: internal` content into the public site
* path-placement rules should reinforce correct publication intent where relevant
* public docs should fail if they reference clearly internal-only routes or assets where validation can detect that

Human review must also enforce:

* whether public content is actually public-safe
* whether internal operational detail has leaked into ostensibly public docs
* whether a public journal entry is genuinely useful to public readers
* whether a public/internal split should be represented as one sanitized doc or paired documents

Publication safety is too important to rely on metadata alone.

# Exceptions

There are no broad standing exceptions to the publication model.

Any exception must be:

* narrow
* explicitly documented
* intentionally reviewed
* justified by a concrete use case

Examples of possible narrow exceptions:

* temporarily unpublished public-safe drafts
* mirrored public-safe docs appearing on the internal site
* explicitly approved public architectural material derived from otherwise internal subject areas

No exception should silently weaken the public/internal boundary.

# Change Management

Changes to publication rules must be treated carefully because they affect:

* what the public site may expose
* what the internal site must contain
* validation logic
* sync routing
* contributor expectations
* release governance
* deployment risk posture

The normal change process should be:

1. identify the publication problem or ambiguity
2. determine whether the change is architectural or procedural
3. update or add an ADR if the change is significant
4. update this reference
5. update front matter templates or contributor docs if needed
6. update validators and sync rules
7. re-review affected documents for correct publication state

Publication changes should be deliberate and rare.

# Related Documents

* `docs/reference/docs-tooling-overview.md`
* `docs/reference/document-taxonomy-reference.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/implementation/docs-authoring-workflow.md`
* `docs/implementation/docs-validation-and-sync-workflow.md`
* `docs/decisions/adr/adr-0004-public-internal-publication-boundary.md`
* `docs/decisions/adr/adr-0005-generated-docs-are-tool-owned.md`

# Revision Notes

* Initial version established the canonical publication policy for the documentation system.
* Future revisions should be coordinated with validation rules, sync behavior, and contributor guidance.

# Suggested Commit Message

```text
docs(reference): add publication rules reference
```
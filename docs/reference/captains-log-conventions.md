---
title: "Captain’s Log Conventions"
description: "Authoritative reference for how captain’s-log entries should be written, structured, classified, reviewed, and selectively published within the documentation system."
slug: "/reference/captains-log-conventions"
canonicalId: "reference-captains-log-conventions"
audiences:
  - engineers
  - maintainers
  - architects
domain: platform
phase: implementation
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
  - captains-log
  - docs
  - conventions
sidebar_position: 7
---

# Purpose

This document defines the canonical conventions for captain’s-log entries in the documentation system.

Its purpose is to make explicit:

- what a captain’s-log entry is
- why captain’s-log entries exist
- how they differ from references, tutorials, ADRs, architecture notes, and runbooks
- what structure and metadata they require
- how they should balance narrative, instruction, and engineering traceability
- how they should be reviewed and maintained
- how internal and public journal publication should differ

The captain’s log exists because a complex project is not fully documented by static reference material alone. A serious engineering effort also needs a durable record of how work actually happened: what was attempted, what changed, what failed, what was learned, and what should happen next.

# Scope

This document covers conventions for `captain-log` documents in the canonical corpus.

It defines:

- the purpose and role of captain’s-log entries
- required structural characteristics
- writing expectations
- metadata expectations specific to journal entries
- filename conventions
- publication conventions for internal and public logs
- relationship to other documentation types
- review and quality expectations

It does **not** define:

- the entire front matter contract for all document classes
- the generic template for all document types
- the publication rules for non-journal content
- the release-versioning mechanics for site builds
- the detailed prose style guide for every documentation genre

Those concerns are covered in companion reference and implementation documents.

# Status and Authority

This document is the canonical reference for captain’s-log writing and governance conventions.

It is normative for:

- authors writing new journal entries
- reviewers evaluating journal quality
- engineers implementing validation rules for journal entries
- maintainers deciding what journal content is appropriate for public publication
- future changes to the role of chronological documentation in the project

If templates, examples, or contributor habits diverge from this document, they should be corrected.

Accepted ADRs that affect publication boundaries, source-of-truth rules, or versioning policy take precedence over this document and should be reflected here.

# Audience

This document is primarily for:

- **engineers**, who will most often author captain’s-log entries
- **maintainers**, who need the log as a durable operational and project memory
- **architects**, who may rely on the log to understand how design decisions emerged and how implementation realities shaped the architecture

It may also help advanced contributors understand why the documentation system includes a journal in addition to more static document types.

# Definitions

## Captain’s Log

A chronological engineering record that combines elements of a diary, tutorial, and engineering report.

## Journal Entry

A single captain’s-log document representing one meaningful work session, milestone, or bounded piece of progress.

## Internal Journal

The set of captain’s-log entries intended for internal readers and published only in the internal documentation surface.

## Public Journal

The selectively published subset of captain’s-log entries that are safe and useful for external readers.

## Engineering Trace

A record of what was actually done, including commands, files changed, mistakes made, and outcomes observed.

## Reproducibility

The quality of a captain’s-log entry that enables another reader to understand, retrace, or partially reproduce the work performed.

## Session Boundary

The practical boundary of a single journal entry, usually defined by one coherent work objective or milestone rather than an arbitrary time duration.

# Subject Overview

A captain’s-log entry is not merely a status update and not merely a tutorial.

It is a hybrid document type intended to preserve the actual trail of work. Done well, it gives future readers access to something that formal references and polished tutorials usually omit:

- the order in which work happened
- the assumptions that proved wrong
- the commands that were actually run
- the files that were actually touched
- the mistakes and dead ends that shaped the result
- the reasoning that connected one step to the next
- the next move that logically followed

The captain’s log is valuable because real engineering work is not a clean linear path. If the only retained docs are polished final forms, then the project loses a large part of its learning history. The captain’s log preserves that history without pretending it is the same thing as canonical reference truth.

For that reason, captain’s-log entries must be:

- chronological
- concrete
- candid
- bounded
- reproducible enough to be useful
- connected to the rest of the docs graph

# Canonical Rules / Contracts / Interfaces

## Rule 1 — A captain’s-log entry is a historical record, not the canonical final statement of a subject

A captain’s-log entry preserves what happened during a session or milestone.

It may contain valuable reasoning, working conclusions, and lessons learned, but it should not normally be treated as the enduring canonical reference for a subject. That role belongs more often to:

- reference docs
- ADRs
- architecture notes
- specifications
- maintained implementation docs

A captain’s-log entry should often point toward those more stable documents when they exist or are created later.

## Rule 2 — A captain’s-log entry must be bounded by one coherent work objective

A journal entry should represent one meaningful session, problem, milestone, or bounded unit of work.

It should not try to cover:

- an entire week of unrelated work
- multiple major initiatives at once
- every minor event that happened in a long period
- a grab bag of unrelated notes

A strong entry has a clear center:
- one goal
- one problem area
- one milestone
- one bounded progression of work

## Rule 3 — A captain’s-log entry must record both action and interpretation

A useful journal entry contains both:

- what was done
- what it meant

It is not enough to list commands and file changes with no reasoning.
It is also not enough to narrate ideas without preserving the actual work performed.

A captain’s-log entry should preserve:
- the engineering trace
- the reasoning trace

## Rule 4 — Failures and mistakes must be recorded honestly

Captain’s-log entries must include meaningful failures, wrong turns, surprises, and corrections when they occurred.

Do not sanitize the log into a fake success narrative.

The project benefits from preserving:
- failed assumptions
- misleading tool behavior
- broken builds
- design mistakes
- confusion encountered
- partial fixes
- unresolved issues

This is one of the main reasons the captain’s log exists.

## Rule 5 — The captain’s log should be reproducible enough to be actionable

A journal entry does not need to be a perfectly polished tutorial, but it should usually contain enough detail that a future reader can understand how the work happened and retrace the important steps.

That generally means including:
- commands run
- files created or changed
- starting state
- ending state
- verification steps
- next step

## Rule 6 — Internal is the default publication mode for captain’s-log entries

Captain’s-log entries should default to:

- `visibility: internal`
- `publish: true` or `publish: false` depending on readiness

Public journal entries should be selectively chosen and intentionally written or revised for public readership.

The internal journal is the primary home of raw engineering process memory.

## Rule 7 — Captain’s-log entries are not versioned

Captain’s-log entries are historical by chronology, not by release freezing.

They must use:

- `docType: captain-log`
- `versioned: false`

Their historical preservation model is:
- journal chronology
- Git history
- explicit dates
- links to related docs and milestones

## Rule 8 — A captain’s-log entry should connect outward to more stable documents when appropriate

If a session produced or relied on:

- an ADR
- a reference doc
- a runbook
- an architecture note
- a tutorial
- an implementation doc

the journal entry should reference those materials clearly.

This prevents the journal from becoming an isolated narrative silo.

# Required Structural Characteristics

Every captain’s-log entry should follow the approved template and include, at minimum, these core sections:

- Objective
- Context
- Starting State
- Assumptions
- Inputs and References
- Commands Run
- Files Created or Changed
- Work Performed
- Mistakes, Failures, and Surprises
- Fixes Applied
- Final State
- Verification
- Artifacts Produced
- Lessons Learned
- Open Questions
- Risks and Follow-Up Concerns
- Next Step
- Suggested Commit Message

These sections exist because they preserve the essential dimensions of a real engineering session:

- goal
- context
- action
- failure
- correction
- outcome
- learning
- continuity

Not every section must be equally long, but none of the required sections should be omitted without a strong reason.

# Metadata Requirements Specific to Captain’s-Log Entries

Captain’s-log entries use the general front matter contract plus additional journal-specific expectations.

## Required fields

A captain’s-log entry must include:

- `title`
- `description`
- `slug`
- `canonicalId`
- `audiences`
- `domain`
- `phase`
- `docType`
- `visibility`
- `status`
- `owner`
- `publish`
- `versioned`
- `reviewCadence`
- `lastReviewed`
- `tags`
- `authors`
- `date`

## Expected journal-specific values

### `docType`

Must be:

```yaml
docType: captain-log
````

### `versioned`

Must be:

```yaml id="m73rth"
versioned: false
```

### `reviewCadence`

Usually:

```yaml id="er4q6b"
reviewCadence: none
```

because the historical value of the document does not depend on recurring review in the same way as a reference doc.

### `status`

Usually one of:

* `active`
* `archived`

A captain’s-log entry is generally not the right place for `canonical`.

### `authors`

Must explicitly declare the author or authors of the entry.

Example:

```yaml id="jffeya"
authors:
  - thomas-carter
```

### `date`

Must explicitly declare the entry date.

Example:

```yaml id="andk5l"
date: 2026-03-31
```

### `visibility`

Usually:

* `internal`

Public use is selective and should be deliberate.

# Filename Conventions

Captain’s-log filenames should use a date-prefixed, kebab-case structure:

```text
YYYY-MM-DD-short-slug.mdx
```

Examples:

* `2026-03-31-docs-system-bootstrap.mdx`
* `2026-04-01-first-validation-pass.mdx`
* `2026-04-02-first-sync-pipeline-pass.mdx`

This convention exists because it:

* preserves natural chronology
* makes the file list readable in the repo
* aligns filename ordering with time ordering
* reduces ambiguity in historical sequences

Do not use vague filenames like:

* `notes.mdx`
* `journal-entry.mdx`
* `today.mdx`

# Writing Style Expectations

A captain’s-log entry should read like a disciplined hybrid of:

* diary/journal
* tutorial
* engineering report

That means it should be:

## Concrete

Prefer:

* exact commands
* real paths
* real files
* actual outcomes
* named assumptions
* named failures

Avoid vague abstractions when concrete detail is available.

## Chronological enough to follow

The reader should be able to understand how the work unfolded, not just what conclusions were reached afterward.

## Candid

Document:

* mistakes
* confusion
* false starts
* partial failures
* unexpected behavior

without embarrassment or defensiveness.

## Structured

Even though the content is chronological, it should still be well-sectioned and easy to skim.

## Useful to future readers

Write for:

* future-you
* a new contributor
* a maintainer debugging the same system later
* an architect trying to understand how reality shaped design

## Not performative

Do not write the captain’s log as personal branding copy or polished marketing prose. It is a working memory artifact first.

# What a Captain’s-Log Entry Should Include

A strong captain’s-log entry usually includes:

* the specific objective
* why the work mattered at that moment
* the actual starting conditions
* the assumptions made before or during execution
* the concrete commands used
* the files or directories touched
* the reasoning behind the changes
* the main failures or surprises
* the fixes applied
* the actual ending state
* how success or failure was verified
* what was learned
* what remains unresolved
* the next logical move

This structure helps the entry function as both history and operational memory.

# What a Captain’s-Log Entry Should Not Become

A captain’s-log entry should not become:

## A vague status update

Bad:

* “Worked on docs today. Made progress.”

This says almost nothing.

## A pure stream-of-consciousness diary

Bad:

* purely emotional narration with no engineering trace

The captain’s log is not private journaling; it is project memory.

## A duplicate of a formal reference document

Bad:

* a journal entry that tries to replace the stable reference instead of recording the path to it

If stable truth has been established, create or update the reference doc and link to it.

## An unbounded dumping ground

Bad:

* one entry containing unrelated work on templates, deployment, search, content style, and release tooling all at once with no coherent session boundary

Split such work into multiple entries where needed.

## A sanitized false narrative

Bad:

* hiding failures so the work appears smoother than it was

That destroys much of the value of the log.

# Internal vs Public Captain’s-Log Conventions

## Internal captain’s-log entries

Internal entries are the default and should preserve honest engineering memory.

They may include:

* real implementation detail
* internal file paths
* internal deployment notes
* incomplete ideas
* raw debugging trace
* operational context
* implementation caveats
* candid failure analysis

They should still be structured and useful, but they do not need to be optimized for public readability.

## Public captain’s-log entries

Public entries should be:

* intentionally selected
* safe for external readers
* useful beyond internal context
* written or revised with public continuity in mind

They should generally avoid:

* internal hostnames
* internal-only routes
* internal auth details
* sensitive deployment specifics
* raw private operational detail
* internal-only decision context that would confuse or overexpose the project

A public entry may be:

* a public-safe rewrite of an internal entry
* a separately authored public summary of a milestone
* a curated public-facing explanation of what was learned

The public journal is curated, not mirrored.

# Relationship to Other Document Types

## Captain’s log vs reference

A reference defines enduring truth.
A captain’s-log entry records how work happened.

If a journal session establishes a stable rule, create or update the reference doc and link to it.

## Captain’s log vs ADR

An ADR records a durable decision and rationale.
A captain’s-log entry records the session in which work, analysis, or implementation contributed to that decision.

A journal entry may lead to an ADR, but it should not replace one.

## Captain’s log vs tutorial

A tutorial teaches a reader to achieve a specific outcome cleanly.
A captain’s-log entry preserves how the outcome was actually reached, including the messy parts.

A polished tutorial may later be derived from one or more journal entries.

## Captain’s log vs runbook

A runbook tells an operator what to do now.
A captain’s-log entry records what happened during an earlier piece of work.

If a repeatable operational procedure emerges from journaled work, write a runbook.

## Captain’s log vs architecture note

An architecture note explains a design clearly and systematically.
A captain’s-log entry may record the path by which the design emerged or was tested.

# Structure / Data Model / Layout

A typical captain’s-log entry should look like this, at a high level:

```text
front matter
Objective
Context
Starting State
Assumptions
Inputs and References
Commands Run
Files Created or Changed
Work Performed
Mistakes, Failures, and Surprises
Fixes Applied
Final State
Verification
Artifacts Produced
Lessons Learned
Open Questions
Risks and Follow-Up Concerns
Next Step
Suggested Commit Message
Appendix (optional)
```

This is a deliberately disciplined structure. It makes the journal entry scannable while preserving the depth needed for serious engineering memory.

# Examples

## Example 1 — Good session-bounded entry

Title:

* `Captain’s Log: First Validation Pass`

Characteristics:

* one clear objective
* exact commands run
* specific validators added or changed
* real failure cases recorded
* next step identified as sync integration

Why this works:

* the entry has a coherent center and useful continuity

## Example 2 — Good milestone entry

Title:

* `Captain’s Log: First Public and Internal Sync Pipeline Pass`

Characteristics:

* focused on one milestone
* records input assumptions, files changed, and sync behavior
* notes failures and fixes
* links to the relevant ADR and implementation doc

Why this works:

* it captures both the engineering trace and the surrounding documentation context

## Example 3 — Good public journal entry

Title:

* `Captain’s Log: How We Structured the Documentation System`

Characteristics:

* safe for public readers
* explains the milestone and its reasoning
* omits internal-only operational detail
* remains useful as a public progress narrative

Why this works:

* it is curated rather than raw

# Non-Examples / Invalid Cases

## Invalid Example 1 — Journal entry with no commands, files, or concrete trace

The entry says:

* “I worked on the docs system and made progress.”

Why invalid:

* it preserves almost no actionable historical memory

## Invalid Example 2 — Journal entry used as the only home of a stable rule

The entry contains a settled, durable rule about publication behavior, but no corresponding reference or ADR is created.

Why weak:

* the stable truth is trapped inside chronology instead of being elevated into a canonical document class

## Invalid Example 3 — One enormous entry containing many unrelated initiatives

The entry mixes:

* template design
* deployment auth
* search strategy
* content style guide
* release workflow
* unrelated debugging

Why invalid in practice:

* the entry loses coherence
* future readers cannot easily reuse it

## Invalid Example 4 — Public journal entry exposing internal detail

The entry includes:

* internal deployment endpoints
* internal-only topology notes
* security-sensitive auth implementation specifics

Why invalid:

* the entry is not actually public-safe, regardless of its declared metadata

# Constraints

Captain’s-log conventions are shaped by the following constraints:

* the project needs honest process memory, not just polished final docs
* the journal must remain useful to future readers, not only the original author
* the journal must coexist with more formal document types without replacing them
* internal/public publication boundaries must remain explicit
* journal entries should preserve chronology rather than release-freezing
* the authoring burden must remain reasonable enough that the journal is sustainable
* readers need enough structure to skim long entries efficiently

These constraints justify the captain’s-log format as structured but candid.

# Operational Implications

In practice, these conventions mean:

* contributors should write an entry for meaningful milestones or bounded sessions
* authors should create references, ADRs, runbooks, or tutorials when stable knowledge emerges
* maintainers can use the journal as historical project memory
* public publication of journal entries requires review and curation
* validation can enforce section presence and metadata correctness
* the documentation system preserves not only outcomes but also the path to those outcomes

# Common Mistakes

Common mistakes include:

* treating the journal as a vague progress log
* omitting commands, file paths, or verification
* hiding failures or confusion
* writing entries that are too broad in scope
* using the journal instead of writing the corresponding stable reference or ADR
* marking journal entries as versioned
* publishing internal engineering trace publicly without proper curation
* forgetting to link the entry to the documents it produced or depended on

# Validation and Enforcement

Captain’s-log conventions should be enforced through both tooling and review.

Tooling should validate at least:

* `docType: captain-log`
* required journal metadata such as `authors` and `date`
* `versioned: false`
* filename date-prefix convention
* presence of required journal sections
* valid path placement under `docs/journal/public/` or `docs/journal/internal/`
* public/internal visibility consistency with path placement

Human review should validate:

* whether the entry is coherent and bounded
* whether the engineering trace is concrete enough to be useful
* whether failures and fixes are documented honestly
* whether a public entry is truly public-safe
* whether stable knowledge from the session should also be elevated into another document type

# Exceptions

There are limited cases where a captain’s-log entry may differ slightly from the ideal pattern.

Examples:

* a very small but important milestone may have shorter sections
* an entry may omit a section only if it is genuinely not applicable and the omission does not reduce usefulness
* a public rewrite may summarize some internal details rather than repeating the full raw trace

These exceptions should remain narrow.

There should be no exception to:

* explicit chronology
* honest reporting
* stable metadata
* non-versioning
* clear publication boundaries

# Change Management

Changes to captain’s-log conventions affect:

* templates
* contributor expectations
* validation rules
* publication review practices
* the relationship between journal entries and more formal docs

The normal change path should be:

1. identify the convention problem or gap
2. determine whether the issue is editorial, procedural, or architectural
3. update or add an ADR if the change is structural
4. update this reference
5. update the captain’s-log template
6. update validators if enforcement behavior changes
7. review examples and contributor guidance for consistency

# Related Documents

* `docs/templates/captains-log.mdx`
* `docs/reference/docs-tooling-overview.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/implementation/docs-authoring-workflow.md`
* `docs/decisions/adr/adr-0004-public-internal-publication-boundary.md`
* `docs/decisions/adr/adr-0005-generated-docs-are-tool-owned.md`

# Revision Notes

* Initial version established the canonical conventions for captain’s-log entries.
* Future revisions should be coordinated with templates, publication rules, and journal validation behavior.

# Suggested Commit Message

```text
docs(reference): add captain's log conventions
```
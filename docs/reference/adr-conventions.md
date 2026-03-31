---
title: "ADR Conventions"
description: "Authoritative reference for how architecture decision records should be written, structured, reviewed, maintained, and related to the rest of the documentation system."
slug: "/reference/adr-conventions"
canonicalId: "reference-adr-conventions"
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
  - adr
  - architecture
  - conventions
sidebar_position: 8
---

# Purpose

This document defines the canonical conventions for architecture decision records in the documentation system.

Its purpose is to make explicit:

- what an ADR is and is not
- when an ADR should be written
- how ADRs should be structured
- how ADRs relate to architecture notes, reference docs, tutorials, runbooks, and captain’s-log entries
- how ADRs should be numbered, named, reviewed, superseded, and maintained
- how ADRs should function as durable project memory rather than informal notes

The documentation system includes ADRs because significant architectural decisions should not exist only in chat history, implicit code structure, or scattered working notes. A serious system needs durable records of what was decided, why it was decided, what alternatives were considered, and what consequences follow from the decision.

# Scope

This document covers conventions for documents with:

```yaml
docType: adr
````

It defines:

* the role and purpose of ADRs
* criteria for when to write one
* required structure and expectations
* naming and numbering conventions
* status conventions
* relationships to other document types
* supersession and maintenance rules
* review and governance expectations

It does **not** define:

* the general front matter contract for every document type
* the full taxonomy model
* the detailed implementation of every decision
* the full prose style guide for all technical docs
* deployment, versioning, or publication policy except as ADR behavior depends on them

Those concerns are covered in companion reference, architecture, implementation, and runbook documents.

# Status and Authority

This document is the canonical reference for ADR writing and governance conventions.

It is normative for:

* authors creating new ADRs
* reviewers evaluating whether a decision has been properly captured
* maintainers governing the long-term architectural memory of the project
* engineers linking implementation work back to architectural decisions
* future changes to the ADR process itself

Accepted ADRs have higher authority than ordinary reference or implementation docs on the architectural questions they explicitly decide. This reference governs how ADRs are written and maintained, not whether their individual decisions are correct.

# Audience

This document is primarily for:

* **architects**, who need ADRs to preserve durable architectural reasoning
* **engineers**, who implement decisions and need to understand what has been decided
* **maintainers**, who need to know which decisions remain authoritative and which have been superseded

It is also useful for contributors deciding whether a problem deserves an ADR or a lighter-weight document type.

# Definitions

## ADR

An Architecture Decision Record: a durable document capturing a significant architectural decision, its context, alternatives, rationale, consequences, and related follow-up work.

## Architectural Decision

A decision that materially affects system structure, boundaries, responsibilities, operating model, governance model, deployment model, data flow, or long-term maintainability.

## Accepted ADR

An ADR whose decision is currently authoritative and should be treated as the governing architectural rule for its scope.

## Proposed ADR

An ADR that records an unresolved or pending decision for review.

## Superseded ADR

An ADR that was once accepted but has been replaced by a later ADR.

## Deprecated ADR

An ADR retained for historical context but no longer recommended as active guidance, usually because the decision is no longer central or has been partially replaced.

## Superseding ADR

A later ADR that replaces or materially updates the architectural rule defined in an earlier ADR.

## Decision Driver

A criterion that materially shaped the final choice, such as simplicity, security, maintainability, or release discipline.

# Subject Overview

An ADR is not a brainstorm, not a meeting note, and not a general architecture essay.

An ADR exists to answer a specific question:

**What architectural decision was made, under what conditions, and why?**

The role of an ADR is to preserve durable architectural intent.

Without ADRs, teams often fall into one or more of these failure modes:

* major decisions are made but not recorded
* later contributors cannot tell whether a behavior is intentional or accidental
* the same architectural question is repeatedly reopened because prior reasoning is lost
* implementation details are mistaken for decisions
* project memory becomes dependent on individuals rather than documents

ADRs solve that by recording the minimum durable decision memory necessary to make the architecture explainable and governable over time.

An ADR should therefore be:

* specific
* durable
* scoped
* decisive
* honest about trade-offs
* connected to follow-up implementation and companion docs

# Canonical Rules / Contracts / Interfaces

## Rule 1 — Write an ADR only for a genuinely architectural decision

Not every choice deserves an ADR.

An ADR should be written when the decision materially affects one or more of the following:

* system boundaries
* responsibility splits
* long-term maintainability
* deployment model
* public/internal separation
* data ownership
* versioning model
* generated vs authored content boundaries
* security or access boundaries
* contributor workflow at an architectural level
* fundamental tooling shape

Do **not** write an ADR for minor implementation details, temporary experiments, or small stylistic preferences unless they truly rise to architectural significance.

## Rule 2 — An ADR must answer a specific decision question

A valid ADR should be able to answer, clearly:

* What question was being decided?
* What was chosen?
* Why was it chosen?
* What alternatives were rejected?
* What consequences follow?

If an ADR cannot answer those questions, it is probably not yet ready or it is the wrong document type.

## Rule 3 — An ADR records a decision, not just discussion

The document may describe uncertainty in its context and alternatives, but the core of an ADR is a decision.

A purely exploratory document without a chosen path is usually better represented as:

* an architecture note
* a discovery document
* a planning note
* a captain’s-log entry

A proposed ADR may still be unresolved, but it must still frame the decision clearly and move toward resolution.

## Rule 4 — ADRs should be stable and durable once accepted

Once an ADR is accepted, it should not be casually rewritten to match current preference.

Minor clarifications may be added, but material changes to the decision should normally be handled by:

* a new ADR
* or a clearly identified superseding ADR

This preserves historical honesty.

## Rule 5 — ADRs must name rejected alternatives and trade-offs

A decision record without alternatives and consequences is too weak.

A useful ADR should preserve:

* what was considered
* why it was not chosen
* what was optimized for
* what costs were accepted

This is necessary so future contributors can distinguish a deliberate choice from an accidental omission.

## Rule 6 — ADRs must connect to implementation and companion docs

An ADR should not stand alone.

Where relevant, it should connect to:

* architecture notes
* implementation docs
* reference docs
* runbooks
* tutorials
* captain’s-log entries

The ADR records the decision. Other documents explain, realize, teach, or operate that decision.

## Rule 7 — ADR status must be explicit and meaningful

Every ADR should clearly state whether it is:

* Proposed
* Accepted
* Superseded
* Rejected
* Deprecated

This is essential so readers know whether the document is active architectural authority or historical context.

## Rule 8 — ADRs are versioned architectural history

ADRs should generally participate in release-versioned documentation because they form part of the durable architectural record of the system.

An ADR’s value is historical as well as current. Versioning helps preserve which accepted architectural rules shaped the system at a given release boundary.

# When to Write an ADR

Write an ADR when the project is deciding something like:

* whether there should be one docs site or two
* where canonical authored docs should live
* whether generated outputs are tool-owned
* how release versioning should work
* whether public/internal docs should be split at deployment
* which major framework or platform model the docs system should use
* how search should be handled at a structural level
* how auth boundaries should be positioned
* whether audience or domain should be the primary information architecture axis

Do **not** usually write an ADR for:

* a single CSS choice
* a one-line config tweak
* minor naming preferences
* short-lived experiments
* content copy edits
* routine implementation decisions within an already settled architecture

A good heuristic:

If future contributors will need to know **why this architectural rule exists**, it may deserve an ADR.

# When Not to Write an ADR

An ADR is the wrong tool when the material is better expressed as:

## A reference doc

Use a reference doc when the goal is to define stable rules or concepts, not record the decision process that created them.

## An architecture note

Use an architecture note when the goal is to explain a design in depth, including components, boundaries, flows, and risks, even if no single new decision is being made.

## A captain’s-log entry

Use a captain’s-log entry when the goal is to preserve the chronological engineering path, not to declare a durable architectural rule.

## A runbook

Use a runbook when the goal is operational execution, not architectural decision memory.

## A tutorial

Use a tutorial when the goal is instructional guidance toward an outcome, not decision rationale.

# Required ADR Structure

A valid ADR should use the approved ADR template and include, at minimum, these core sections:

* Status
* Decision Summary
* Context
* Problem Statement
* Decision
* Scope
* Options Considered
* Decision Drivers
* Rationale
* Consequences
* Implementation Notes
* Migration or Adoption Plan
* Risks
* Rejected Alternatives
* Follow-Up Work
* Compliance / Enforcement
* Exceptions
* Supersession Policy
* Related Documents
* Notes for Future Readers
* Suggested Commit Message

These sections exist because a good ADR must preserve:

* the decision question
* the chosen path
* the reasoning
* the trade-offs
* the operational consequences
* the path to adoption
* the relationship to future changes

# Naming and Numbering Conventions

ADR filenames should follow this structure:

```text
adr-XXXX-short-slug.md
```

Examples:

* `adr-0001-two-doc-sites-one-canonical-corpus.md`
* `adr-0002-audience-first-information-architecture.md`
* `adr-0003-selective-versioning-policy.md`

## Numbering rules

* Use zero-padded sequential numbers.
* Once assigned, an ADR number should never be reused.
* Rejected or superseded ADRs keep their number.
* Gaps should generally be avoided, but historical integrity matters more than perfect neatness.

## Title rules

Titles should be:

* explicit
* outcome-oriented
* durable
* not vague

Bad:

* `Docs Structure`
* `Versioning`
* `Some Decisions`

Good:

* `ADR-0003: Selective Versioning Policy`
* `ADR-0004: Public/Internal Publication Boundary`
* `ADR-0007: Self-Hosted Docs Deployment Model`

# Status Conventions

## Proposed

Use when:

* the decision question is real
* the document is ready for review
* the final decision has not yet been accepted

A proposed ADR should still be coherent and decision-oriented.

## Accepted

Use when:

* the decision is now authoritative
* implementation should follow it unless superseded later

This is the normal state for governing ADRs.

## Superseded

Use when:

* a newer ADR has replaced this one

The ADR should clearly link to the superseding ADR.

## Rejected

Use when:

* the ADR documents a serious option that was considered and declined

Use this sparingly and only when preserving the rejection is actually useful.

## Deprecated

Use when:

* the ADR remains historically relevant but is no longer recommended as active guidance, even if there is not a single clean superseding ADR

# Relationship to Other Document Types

## ADR vs architecture note

An ADR records:

* the decision
* the alternatives
* the rationale
* the consequences

An architecture note explains:

* the design in operational or structural depth

Often both are needed.

## ADR vs reference doc

An ADR explains why a rule exists.
A reference doc explains what the current rule is.

The reference is often the reader-facing stable explanation.
The ADR is the architectural memory behind it.

## ADR vs captain’s-log entry

A captain’s-log entry records how work unfolded.
An ADR records the durable decision that emerged or governed that work.

A good journal entry may link to an ADR created during or after the session.

## ADR vs implementation doc

An implementation doc explains how the decision is being realized.
The ADR explains what was chosen and why.

## ADR vs runbook

A runbook tells operators what to do.
An ADR explains why the architecture is the way it is.

# What Good ADRs Contain

A strong ADR usually contains:

* one clearly stated decision question
* a clear final decision
* real constraints and context
* explicit alternatives
* explicit trade-offs
* a rationale linked to decision drivers
* concrete consequences
* a realistic adoption plan
* enforcement or compliance expectations
* links to related docs

A strong ADR should let a future contributor answer:

* why is the system like this?
* what would need to change to replace this?
* what would I break by ignoring it?

# What ADRs Should Not Become

An ADR should not become:

## A vague architecture essay

If the document explains a design but does not actually record a decision, it is probably an architecture note instead.

## A meeting transcript

Do not preserve conversational noise. Preserve the decision, context, and rationale.

## A changelog

An ADR is not a running list of implementation updates.

## A tutorial

An ADR may have implementation notes, but it is not step-by-step teaching material.

## A dumping ground for every trade-off in the project

Each ADR should stay scoped to a specific decision.

# Structure / Data Model / Layout

A typical ADR should have front matter like:

```yaml
title: "ADR-0001: Two Docs Sites, One Canonical Corpus"
description: "Records the decision to maintain one canonical root docs corpus and publish it through two separate Docusaurus sites."
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
  - decision
```

An accepted ADR should also make its in-body status explicit in the `Status` section.

# Examples

## Example 1 — Good ADR subject

Decision:

* one canonical `docs/` corpus vs separate hand-maintained public/internal docs trees

Why good:

* materially architectural
* affects source-of-truth boundaries, sync model, contributor workflow, and deployment shape

## Example 2 — Good ADR consequence pattern

The ADR states:

* two sites increase deployment complexity
* but reduce public/internal boundary ambiguity
* and prevent source-of-truth drift

Why good:

* it records both benefit and carrying cost

## Example 3 — Good ADR relationship pattern

The ADR links to:

* a companion architecture note
* a reference doc implementing the rule
* an implementation doc describing adoption
* a runbook reflecting the operational consequences

Why good:

* it connects decision, explanation, execution, and operation

# Non-Examples / Invalid Cases

## Invalid Example 1 — Minor implementation tweak as ADR

Decision:

* rename a local script from `docs:check` to `docs:doctor`

Why usually invalid:

* too small and insufficiently architectural

## Invalid Example 2 — ADR with no alternatives

The ADR states a decision but never explains what else was considered.

Why weak:

* future readers cannot tell whether the path was chosen deliberately or merely happened first

## Invalid Example 3 — ADR rewritten in place to hide history

An accepted ADR is substantially rewritten to reflect a later different decision without supersession.

Why invalid:

* destroys historical integrity
* makes it impossible to understand what was actually decided when

## Invalid Example 4 — ADR used as a reference doc

The ADR becomes the only place where the current stable rule is explained, with no companion reference doc where a stable reference would be appropriate.

Why weak:

* forces readers to consume decision history to learn current rule behavior
* conflates historical rationale with reader-facing stable guidance

# Constraints

ADR conventions are shaped by these constraints:

* architectural memory must remain durable over time
* contributors must be able to tell active rules from historical ones
* the system must preserve both decisions and their trade-offs
* release history should reflect the architectural record that shaped the system
* ADR authorship should remain disciplined enough to avoid decision-document inflation
* the documentation system must distinguish between stable rules and historical reasoning

These constraints justify ADRs as a distinct, limited document type.

# Operational Implications

In practice, these conventions mean:

* significant architectural changes should be captured intentionally
* contributors should check for existing ADRs before reopening an architectural question
* maintainers should not silently mutate accepted ADRs when the architecture changes
* supersession should be explicit
* implementation docs and reference docs should point back to the ADRs that govern them
* reviewers should reject pseudo-ADRs that are really meeting notes or implementation chatter

# Common Mistakes

Common mistakes include:

* writing an ADR for something too small
* avoiding ADRs for decisions that are clearly architectural
* failing to record alternatives
* failing to record consequences
* hiding later changes by rewriting accepted ADRs instead of superseding them
* using vague titles
* not linking the ADR to implementation or companion docs
* treating the ADR as the only place the current rule is explained

# Validation and Enforcement

ADR conventions should be enforced through both tooling and review.

Tooling can validate:

* `docType: adr`
* correct directory placement under `docs/decisions/adr/`
* required section presence
* `versioned: true`
* presence of stable identity metadata
* naming pattern expectations

Human review should validate:

* whether the subject truly deserves an ADR
* whether the decision question is clear
* whether the decision is actually stated
* whether alternatives and trade-offs are real
* whether the ADR is scoped correctly
* whether supersession is handled honestly

# Exceptions

Exceptions should be rare.

Possible narrow exceptions:

* a rejected ADR preserved because the rejected path is likely to be revisited
* a temporary proposed ADR that captures a real pending architecture decision before final acceptance
* a historically important ADR retained with minimal formatting differences from an earlier project phase

There should be no exception to:

* stable numbering
* explicit status
* honest historical handling
* explicit decision statement

# Change Management

Changes to ADR conventions affect:

* templates
* architectural governance
* contributor workflow
* release documentation history
* validation and review expectations

The normal change path should be:

1. identify the convention gap or problem
2. determine whether the change is editorial or structural
3. add or update an ADR if the ADR process itself is changing architecturally
4. update this reference
5. update the ADR template
6. update validators if needed
7. review existing ADR examples for consistency

# Related Documents

* `docs/templates/adr.md`
* `docs/reference/docs-tooling-overview.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/implementation/docs-authoring-workflow.md`
* `docs/implementation/docs-validation-and-sync-workflow.md`
* `docs/decisions/adr/adr-0001-two-doc-sites-one-canonical-corpus.md`

# Revision Notes

* Initial version established the canonical conventions for architecture decision records.
* Future revisions should be coordinated with templates, validation rules, and architectural governance practices.

# Suggested Commit Message

```text
docs(reference): add ADR conventions
```
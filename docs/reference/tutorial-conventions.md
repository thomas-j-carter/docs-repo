---
title: "Tutorial Conventions"
description: "Authoritative reference for how tutorials should be written, structured, reviewed, maintained, and related to the rest of the documentation system."
slug: "/reference/tutorial-conventions"
canonicalId: "reference-tutorial-conventions"
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
  - tutorial
  - docs
  - conventions
sidebar_position: 9
---

# Purpose

This document defines the canonical conventions for tutorials in the documentation system.

Its purpose is to make explicit:

- what a tutorial is and is not
- when a tutorial should be written
- how tutorials should be structured
- how tutorials differ from references, guides, runbooks, ADRs, architecture notes, and captain’s-log entries
- how tutorials should balance accuracy, clarity, and practicality
- how tutorials should be reviewed and maintained
- how public and internal tutorials should differ where appropriate

The project uses tutorials because readers often need more than definitions or architecture explanations. They need a reliable path from a starting state to a finished outcome. A good tutorial provides that path in a way that is reproducible, trustworthy, and appropriately scoped.

# Scope

This document covers conventions for documents with:

```yaml
docType: tutorial
````

It defines:

* the role and purpose of tutorials
* when to prefer a tutorial over another doc type
* required tutorial structure
* writing expectations
* metadata expectations specific to tutorial use
* publication expectations for public and internal tutorials
* maintenance and revision expectations

It does **not** define:

* the full front matter contract for every document type
* the general taxonomy model
* the complete content style guide for all prose
* operational procedures for deployments or incident response
* architecture decision governance
* the chronological conventions of the captain’s log

Those topics are covered by companion reference and implementation docs.

# Status and Authority

This document is the canonical reference for tutorial writing and governance conventions.

It is normative for:

* authors writing new tutorials
* reviewers evaluating tutorial quality
* engineers implementing tutorial validation or generation behavior
* maintainers governing public and internal instructional content
* future changes to the tutorial model in the documentation system

If templates, examples, or contributor habits diverge from this document, they should be corrected.

Accepted ADRs and higher-level publication or versioning rules take precedence where they materially affect tutorials.

# Audience

This document is primarily for:

* **engineers**, who will author many contributor-facing tutorials
* **maintainers**, who will rely on tutorials for onboarding and repeatable workflows
* **architects**, who need to understand how instructional content fits into the broader documentation system

It is also useful for contributors deciding whether a piece of content should be a tutorial or some other document type.

# Definitions

## Tutorial

A step-by-step instructional document that takes a reader from a known starting state to a concrete end state.

## Outcome

The specific thing the reader will have accomplished by following the tutorial.

## Prerequisite

A required condition, tool, access level, or piece of prior knowledge that must be in place before the tutorial can be completed successfully.

## Verification

The process of checking that the tutorial outcome has actually been achieved.

## Troubleshooting

Guidance for common failure modes a reader may encounter while following the tutorial.

## Reader Path

The ordered sequence of actions the reader follows from start to finish.

## Instructional Drift

The condition in which a tutorial no longer matches the actual current system behavior, commands, paths, or outcomes.

# Subject Overview

A tutorial is the document type to use when the reader needs to **do something** and would benefit from a guided path.

A tutorial is not merely a description of a system. It is not merely a set of conceptual rules. It is not merely an operational recovery procedure. It is not a raw historical account of how the author discovered a solution.

A tutorial exists to help a reader successfully achieve an outcome with a minimum of ambiguity.

That means a good tutorial should be:

* outcome-oriented
* stepwise
* concrete
* reproducible
* scoped
* honest about prerequisites
* honest about likely failure modes
* explicit about verification

A tutorial is strongest when it turns stable, repeatable knowledge into an accessible learning and execution path.

# Canonical Rules / Contracts / Interfaces

## Rule 1 — A tutorial must lead to a concrete outcome

A tutorial must answer:

* What will the reader achieve by the end?
* What real state will be different if they complete it successfully?

If the document cannot name a concrete outcome, it is probably not a tutorial.

Bad:

* “Learn about the docs system.”

Better:

* “Set up the docs workspace locally, validate the canonical docs corpus, sync content, and start both documentation sites.”

## Rule 2 — A tutorial must begin from a clearly stated starting state

A tutorial must tell the reader what it assumes at the beginning.

That usually includes:

* required software
* required access
* required repo state
* required knowledge
* required environment variables or secrets
* relevant prior docs

Without a clear starting state, the tutorial becomes guesswork.

## Rule 3 — A tutorial must be stepwise, not merely descriptive

A tutorial must provide ordered steps the reader can follow.

A concept explanation with no executable progression is not a tutorial.
A general recommendation list is not a tutorial.
A historical narrative is not a tutorial.

A tutorial must provide a path.

## Rule 4 — A tutorial must include verification

A tutorial is incomplete if it never tells the reader how to confirm success.

Verification may include:

* commands that should succeed
* files that should exist
* routes that should load
* outputs that should be visible
* artifacts that should be generated

A tutorial without verification leaves the reader uncertain whether they actually finished correctly.

## Rule 5 — A tutorial must distinguish itself from a runbook

A tutorial is for learning and guided execution.
A runbook is for operational execution under real conditions, often with less hand-holding and more emphasis on exact procedure under pressure.

If the primary need is:

* “teach me how to do this”
  then use a tutorial.

If the primary need is:

* “tell me exactly what to do right now in operations”
  then use a runbook.

## Rule 6 — A tutorial must prefer stable, repeatable paths over fragile improvisation

Tutorials should teach the supported or intended path, not a clever workaround discovered once unless that workaround is the actual current best path and is clearly labeled as such.

A tutorial should not embed unnecessary fragility.

## Rule 7 — Public tutorials must be public-safe and reader-complete

A public tutorial should not depend on internal knowledge, internal routes, internal assets, or internal companion docs for safe completion.

If a public-safe path does not exist without internal context, then the public tutorial is not yet ready.

## Rule 8 — Tutorials should connect outward to references and next steps

A tutorial should not trap the reader at the end of the flow.

It should usually link to:

* prerequisite references
* companion runbooks
* deeper architecture or reference material
* next tutorials or follow-on guides

A tutorial teaches a path; it should also show the reader what comes next.

# When to Write a Tutorial

Write a tutorial when the reader needs guided, step-by-step help to accomplish something like:

* setting up the docs environment locally
* authoring a first canonical document
* publishing a public journal entry
* cutting a release docs version
* adding a generated-doc source
* navigating the documentation portal as a user
* diagnosing and fixing a common docs validation failure

A good heuristic:

If the reader will benefit from an ordered path from start to finish, and the outcome is teachable and repeatable, write a tutorial.

# When Not to Write a Tutorial

A tutorial is the wrong document type when the content is better represented as:

## A reference doc

Use a reference when the goal is to define what something is, what rules apply, or what values are allowed.

## A guide

Use a guide when the goal is advisory orientation or good-practice explanation without a single strict end-to-end path.

## A runbook

Use a runbook when the goal is exact operational execution, especially under real maintenance or failure conditions.

## An ADR

Use an ADR when the goal is to record a significant architectural decision and its rationale.

## An architecture note

Use an architecture note when the goal is to explain structure, boundaries, flows, and trade-offs.

## A captain’s-log entry

Use a captain’s-log entry when the goal is to record the actual historical engineering session, including failed attempts and discovery path.

# Required Tutorial Structure

A valid tutorial should use the approved tutorial template and include, at minimum, these sections:

* Goal
* Audience
* Outcome Summary
* Prerequisites
* Estimated Time
* When to Use This Tutorial
* Inputs and Starting State
* Steps
* Commands and Code
* Expected Results
* Verification
* Troubleshooting
* Common Mistakes
* Variations and Alternatives
* Cleanup or Follow-Up
* Related Documents
* Revision Notes
* Suggested Commit Message

These sections exist because a tutorial must preserve:

* who it is for
* what it achieves
* what it assumes
* how to do it
* how to confirm success
* how to recover when it goes wrong
* where to go next

# Metadata Expectations for Tutorials

Tutorials use the general front matter contract, but some values are especially important.

## Expected metadata characteristics

### `docType`

Must be:

```yaml
docType: tutorial
```

### `description`

Must clearly state:

* who the tutorial is for
* what they will achieve
* why it matters

### `audiences`

Should usually be narrow and intentional.

Examples:

* `users`
* `engineers`
* `maintainers`

Avoid tagging every audience unless the tutorial is genuinely useful to all of them.

### `visibility`

Must match the actual instructional content.

Examples:

* a public navigation tutorial can be `public`
* an internal release tutorial should be `internal`

### `versioned`

Should be based on whether the tutorial describes released, stable behavior.

Examples:

* a public tutorial for using a released docs site is usually versioned
* a temporary internal scaffolding tutorial may be unversioned

### `status`

Usually one of:

* `canonical`
* `active`

A tutorial intended as the primary instructional path should normally be `canonical`.

# Writing Style Expectations

A tutorial should be:

## Direct

Use clear instructional language.

Good:

* “Run `pnpm docs:validate` from the repo root.”
* “Open the public site and confirm the tutorial appears in the sidebar.”

Avoid vague phrasing that leaves the reader unsure what to do.

## Concrete

Include:

* exact commands
* exact paths
* exact filenames
* exact routes
* exact expected outputs where practical

## Sequential

Present steps in the order a reasonable reader should perform them.

Do not force the reader to mentally reconstruct the correct sequence.

## Honest

Be clear about:

* real prerequisites
* likely failure points
* limitations
* whether something is provisional or fully supported

## Focused

A tutorial should teach one coherent outcome. Do not overload it with unrelated side quests.

## Friendly but disciplined

Tutorials should be readable and supportive without becoming chatty or imprecise.

# What a Tutorial Should Include

A strong tutorial usually includes:

* a clearly named outcome
* an explicitly named audience
* an honest prerequisites list
* expected starting conditions
* an ordered set of steps
* command or code examples where needed
* expected outcomes after major steps
* a clear verification path
* troubleshooting guidance for likely failures
* common mistakes to avoid
* links to deeper references and next steps

# What a Tutorial Should Not Become

A tutorial should not become:

## A pure concept overview

If the document mostly explains what something is, it is probably a reference or guide.

## A historical diary

If the document mostly records how the author figured something out, it is probably a captain’s-log entry.

## A runbook in disguise

If the document assumes operational pressure and omits teaching context, it is probably a runbook.

## A giant omnibus guide

If the tutorial tries to teach many unrelated workflows at once, it will become difficult to follow and difficult to maintain.

## A shallow checklist

If the tutorial only says “do these three things” with no context, prerequisites, or verification, it is under-specified.

# Public vs Internal Tutorial Conventions

## Public tutorials

Public tutorials should:

* be safe for public readers
* be understandable without internal context
* avoid internal URLs, internal hostnames, internal commands, or internal-only prerequisites
* prioritize clarity for external readers
* link only to public-safe companion materials as part of the primary instructional path

Examples:

* how to navigate the documentation portal
* how to read release-versioned documentation
* how to follow public project progress through the journal

## Internal tutorials

Internal tutorials may include:

* repo paths
* internal commands
* contributor workflows
* internal site routes
* generator or validator behavior
* release and deployment preparation workflows

Examples:

* write your first canonical doc
* add a generated docs source
* fix a validation failure
* add and version a release docs set

# Relationship to Other Document Types

## Tutorial vs reference

A reference explains rules or definitions.
A tutorial teaches a reader to achieve a concrete outcome.

References answer:

* what is this?
* what are the rules?

Tutorials answer:

* how do I accomplish this?

## Tutorial vs guide

A guide may be broader, more advisory, or less linear.
A tutorial is usually more outcome-specific and more ordered.

## Tutorial vs runbook

A tutorial teaches.
A runbook directs operations.

A tutorial is usually more explanatory.
A runbook is usually more terse and execution-focused.

## Tutorial vs captain’s-log entry

A captain’s-log entry records how the work actually happened, including failed attempts and messy discovery.
A tutorial teaches the cleaned-up path the reader should follow now.

A good tutorial may be derived from one or more captain’s-log entries.

## Tutorial vs architecture note

An architecture note explains why and how a design is structured.
A tutorial explains how to perform a task within that system.

# Structure / Data Model / Layout

A typical tutorial should look like this at a high level:

```text
front matter
Goal
Audience
Outcome Summary
Prerequisites
Estimated Time
When to Use This Tutorial
Inputs and Starting State
Steps
Commands and Code
Expected Results
Verification
Troubleshooting
Common Mistakes
Variations and Alternatives
Cleanup or Follow-Up
Related Documents
Revision Notes
Suggested Commit Message
```

This structure helps tutorials remain both teachable and maintainable.

# Examples

## Example 1 — Good contributor tutorial

Title:

* `Write Your First Canonical Doc`

Why it works:

* one clear outcome
* real starting state
* exact file/template steps
* validation and verification included
* links to the front matter and taxonomy references

## Example 2 — Good maintainer tutorial

Title:

* `Add and Version a Release Docs Set`

Why it works:

* explicit audience
* release-oriented outcome
* clearly distinguished from the more operational runbook
* includes verification and common mistakes

## Example 3 — Good public tutorial

Title:

* `Navigate the Documentation Portal`

Why it works:

* public-safe
* outcome-focused
* helps a reader actually use the site
* does not depend on internal docs to complete the flow

# Non-Examples / Invalid Cases

## Invalid Example 1 — Tutorial with no verification

The tutorial lists steps but never explains how to confirm success.

Why invalid:

* the reader cannot know whether the outcome was achieved

## Invalid Example 2 — Tutorial that is really a reference

The document defines what `canonicalId` means, but has no stepwise path or outcome.

Why invalid:

* that is reference content, not tutorial content

## Invalid Example 3 — Tutorial that is really a runbook

The document assumes the operator already knows the system, gives terse commands only, and is designed for live operational execution under time pressure.

Why invalid:

* that is a runbook, not a tutorial

## Invalid Example 4 — Public tutorial with internal dependencies

The tutorial tells the reader to access internal routes or use internal-only environment variables.

Why invalid:

* the tutorial is not actually complete for a public reader

# Constraints

Tutorial conventions are shaped by these constraints:

* tutorials must remain accurate as the system evolves
* readers need concrete paths, not just general advice
* public and internal publication boundaries differ
* some tutorials are tied to released behavior and others to internal current practice
* tutorials must remain simple enough to follow but rich enough to prevent failure
* instructional content must not silently drift away from actual commands, paths, or system behavior

These constraints justify the relatively explicit tutorial structure.

# Operational Implications

In practice, these conventions mean:

* authors should create tutorials when repeatable outcomes matter
* reviewers should check that tutorials still match the actual system
* maintainers should treat stale tutorials as a serious documentation quality problem
* public tutorials may need more polish and public-context framing than internal tutorials
* tutorials should often be paired with references, runbooks, or architecture notes so the reader can move deeper or broader as needed

# Common Mistakes

Common mistakes include:

* writing a conceptual explanation and calling it a tutorial
* skipping prerequisites
* assuming knowledge the reader does not obviously have
* leaving out verification
* teaching a temporary workaround as if it were the stable supported path
* making a tutorial too broad in scope
* failing to update the tutorial when commands or paths change
* using public visibility for tutorials that depend on internal context

# Validation and Enforcement

Tutorial conventions should be enforced through both tooling and review.

Tooling can validate:

* `docType: tutorial`
* correct path placement where relevant
* required tutorial sections
* explicit metadata such as `description`, `visibility`, and `versioned`
* certain link and asset expectations

Human review should validate:

* whether the tutorial truly teaches a coherent outcome
* whether the steps are in the right order
* whether the prerequisites are honest
* whether the tutorial is actually reproducible
* whether public tutorials are genuinely public-safe
* whether the tutorial has drifted from actual system behavior

# Exceptions

Exceptions should be narrow.

Examples:

* a very short tutorial may have concise sections if the outcome is truly small and obvious
* an internal experimental tutorial may be `active` rather than `canonical`
* a tutorial may omit alternatives if there are genuinely none worth mentioning

There should be no exception to:

* clear outcome
* clear starting state
* stepwise structure
* verification
* truthful publication boundary

# Change Management

Changes to tutorial conventions affect:

* templates
* contributor workflow
* review expectations
* public/internal instructional quality
* validation rules

The normal change path should be:

1. identify the convention problem or gap
2. determine whether the issue is editorial, procedural, or architectural
3. update or add an ADR if the change is structural
4. update this reference
5. update the tutorial template
6. update validators if needed
7. review important tutorials for consistency

# Related Documents

* `docs/templates/tutorial.md`
* `docs/reference/docs-tooling-overview.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/reference/runbook-conventions.md`
* `docs/reference/captains-log-conventions.md`
* `docs/implementation/docs-authoring-workflow.md`

# Revision Notes

* Initial version established the canonical conventions for tutorials in the documentation system.
* Future revisions should be coordinated with templates, validation rules, and contributor guidance.

# Suggested Commit Message

```text
docs(reference): add tutorial conventions
```
---
title: "Runbook Conventions"
description: "Authoritative reference for how runbooks should be written, structured, reviewed, maintained, and used within the documentation system."
slug: "/reference/runbook-conventions"
canonicalId: "reference-runbook-conventions"
audiences:
  - engineers
  - maintainers
  - architects
domain: platform
phase: operations
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
  - runbook
  - docs
  - operations
  - conventions
sidebar_position: 10
---

# Purpose

This document defines the canonical conventions for runbooks in the documentation system.

Its purpose is to make explicit:

- what a runbook is and is not
- when a runbook should be written
- how runbooks should be structured
- how runbooks differ from tutorials, references, ADRs, architecture notes, and captain’s-log entries
- how runbooks should balance precision, safety, and operational usability
- how runbooks should be reviewed and maintained
- how runbooks should connect to the rest of the documentation system

Runbooks exist because some actions should not require interpretation, archaeology, or improvisation at the moment of execution. When a maintainer or engineer needs to perform an operational task, especially a repetitive or risk-bearing one, the system should provide a document that tells them exactly what to do, how to verify success, how to recover if it fails, and when to stop and escalate.

# Scope

This document covers conventions for documents with:

```yaml
docType: runbook
````

It defines:

* the role and purpose of runbooks
* when to create a runbook
* required runbook structure
* writing expectations
* metadata expectations specific to runbooks
* operational quality expectations
* maintenance and review expectations
* relationship to tutorials, references, and implementation docs

It does **not** define:

* the full front matter contract for every document type
* the general taxonomy model
* the full deployment architecture
* the release versioning workflow
* the prose conventions for captain’s-log entries
* the decision-record conventions for ADRs

Those concerns are covered by companion reference, implementation, and runbook documents.

# Status and Authority

This document is the canonical reference for runbook writing and governance conventions.

It is normative for:

* authors writing new runbooks
* reviewers evaluating operational documentation quality
* maintainers relying on runbooks during execution
* engineers implementing validation rules for runbook structure
* future changes to how operational procedures are documented

If templates, examples, or contributor habits diverge from this document, they should be corrected.

Accepted ADRs, publication policy, and versioning policy may constrain runbook behavior and take precedence where applicable. This document explains how runbooks should be authored and maintained within those broader rules.

# Audience

This document is primarily for:

* **maintainers**, who will most often execute runbooks in practice
* **engineers**, who may author runbooks or use them for environment, build, recovery, and release procedures
* **architects**, who need to understand how operational procedures relate to the rest of the documentation system

Runbooks are generally internal-facing documents and should be written for people performing real tasks, often under time pressure or with low tolerance for ambiguity.

# Definitions

## Runbook

An operational procedure document intended to tell a reader exactly how to perform a task, verify success, and recover from common failures.

## Operational Task

A repeatable, consequential action in the system lifecycle, such as building, releasing, deploying, recovering, regenerating, validating, or restoring.

## Verification

The explicit process of confirming that the runbook procedure succeeded.

## Rollback

The process of restoring a prior known-good state or otherwise backing out a failed or harmful operation.

## Escalation

The point at which the operator should stop following the runbook and seek additional human review or intervention rather than continuing to improvise.

## Preconditions

Conditions that must be true before the runbook can be executed safely and meaningfully.

## Failure Mode

A recognizable way in which the procedure can fail, partially fail, or produce unexpected results.

## Blast Radius

The set of systems, files, outputs, or publication surfaces that may be affected by the procedure.

# Subject Overview

A runbook is the document type to use when a person needs to perform an operational action correctly and reliably.

A runbook is not primarily for learning concepts. It is not primarily for preserving historical process memory. It is not primarily for recording architectural rationale. It is not primarily for teaching a beginner from first principles.

A runbook exists to answer:

* What exactly should I do?
* What do I need before I start?
* How do I know it worked?
* What do I do if it fails?
* When should I stop and escalate?

For that reason, a runbook should be:

* precise
* procedural
* explicit
* risk-aware
* verification-oriented
* rollback-aware
* operationally calm
* easy to skim under pressure

A runbook is strongest when it reduces ambiguity at the moment of execution.

# Canonical Rules / Contracts / Interfaces

## Rule 1 — A runbook must support real execution, not just explain a concept

If a document mainly explains how something works, it is probably a reference or architecture note.

A runbook must support doing something.

It should tell the operator:

* what task is being performed
* what prerequisites exist
* what exact actions to take
* what outputs or results to expect
* how to verify success
* how to recover from failure

## Rule 2 — A runbook must be usable under operational pressure

A runbook should be written so that someone executing it can skim and act.

That means it should:

* avoid unnecessary narrative
* front-load prerequisites and safety notes
* use numbered or clearly segmented procedure steps
* avoid burying critical warnings deep in prose
* make rollback and escalation visible

A runbook should not require the reader to reconstruct the procedure from long conceptual discussion.

## Rule 3 — A runbook must include verification

A runbook is incomplete if it tells the operator how to act but not how to confirm the action succeeded.

Verification may include:

* commands that should succeed
* files or artifacts that should exist
* routes that should load
* logs that should show expected conditions
* build outputs that should be present
* release artifacts that should be generated

If the procedure cannot be meaningfully verified, the runbook should explicitly say so and explain what proxy checks are being used instead.

## Rule 4 — A runbook must include rollback or recovery guidance when rollback is meaningful

If a procedure can fail in a way that affects the system or published outputs, the runbook should include rollback or recovery guidance.

That guidance should explain:

* what can be restored
* what cannot be cleanly restored
* what artifacts or prior state are required
* what actions should be taken first
* how to verify the recovery worked

A runbook that changes real state but has no recovery guidance is incomplete.

## Rule 5 — A runbook must distinguish mandatory steps from optional notes

An operator should never have to guess which steps are required and which are merely explanatory.

Use explicit structure for:

* required steps
* optional notes
* warnings
* verification checks
* escalation points

The procedure itself should remain unambiguous.

## Rule 6 — Runbooks are internal by default

Runbooks should normally be:

```yaml
visibility: internal
```

because they usually include operational detail, internal environment behavior, or system recovery information.

A public runbook should be considered exceptional and should require deliberate justification.

## Rule 7 — Runbooks are unversioned by default

Runbooks should generally remain current and should usually be marked:

```yaml id="3od0f5"
versioned: false
```

because operational procedures are normally most useful when they reflect the best current practice.

If a runbook ever requires release-specific preservation, that should be treated as a narrow exception rather than the default model.

## Rule 8 — A runbook should connect to the docs that explain the operated system

A runbook should usually link to:

* the reference doc that defines the subject
* the implementation or architecture doc that explains the relevant mechanism
* the tutorial if a slower, teaching-oriented path exists
* the ADR if the operational constraint comes from a major design decision

The runbook tells the operator what to do. It should also show where to go for deeper understanding when time permits.

# When to Write a Runbook

Write a runbook when a task is:

* operational
* repeatable
* consequential
* failure-sensitive
* worth standardizing

Examples include:

* rebuild both documentation sites
* cut a new release-version docs snapshot
* recover from a broken docs release
* regenerate generated documentation inventories
* rotate internal docs auth secrets
* rebuild the search index
* restore docs from backup
* prepare static deploy artifacts
* recover from a sync or build failure in a deployment path

A good heuristic:

If someone could be harmed by ambiguity while performing the task, or if the task is important enough to standardize, it probably deserves a runbook.

# When Not to Write a Runbook

A runbook is the wrong document type when the material is better represented as:

## A tutorial

Use a tutorial when the reader needs to learn a workflow with more teaching, explanation, and hand-holding.

## A reference doc

Use a reference when the goal is to define rules, meanings, or stable facts.

## An architecture note

Use an architecture note when the goal is to explain structure, boundaries, flows, and trade-offs.

## An ADR

Use an ADR when the goal is to record a significant architectural decision and its rationale.

## A captain’s-log entry

Use a captain’s-log entry when the goal is to preserve what actually happened during a session, including failure and discovery history.

A runbook should not be a disguised diary, architecture essay, or tutorial.

# Required Runbook Structure

A valid runbook should use the approved runbook template and include, at minimum, these sections:

* Purpose
* Scope
* Audience
* Preconditions
* Inputs Needed
* Safety Notes
* Procedure
* Expected Outputs
* Verification
* Rollback / Recovery
* Common Failure Modes
* Escalation Notes
* Operational Constraints
* Artifacts Touched
* Related Documents
* Revision Notes
* Suggested Commit Message

These sections exist because a good runbook must preserve:

* what task is being performed
* who should perform it
* what must already be true
* what actions to take
* how to know it worked
* how to recover
* when to stop and escalate
* what systems or files may be affected

# Metadata Expectations for Runbooks

Runbooks use the general front matter contract, but some values are especially important.

## Expected metadata characteristics

### `docType`

Must be:

```yaml
docType: runbook
```

### `visibility`

Should normally be:

```yaml
visibility: internal
```

because operational procedures are generally internal-only.

### `versioned`

Should normally be:

```yaml id="8n4m0n"
versioned: false
```

because the runbook should represent the current correct procedure rather than accumulate release-frozen copies.

### `status`

Usually:

* `active`

A runbook in current use is generally active rather than canonical in the same sense as a stable reference doc, though in some systems a runbook may be treated as the canonical procedure for its task.

### `reviewCadence`

Should usually be:

* `monthly`
* or another cadence consistent with how frequently the operational procedure may drift

Runbooks are especially vulnerable to instructional drift and should be reviewed deliberately.

### `description`

Must clearly state:

* what task the runbook is for
* when to use it
* what kind of result the operator should expect

# Writing Style Expectations

A runbook should be:

## Precise

Use exact:

* commands
* file paths
* directories
* route names
* artifact names
* environment names
* validation checks

Avoid vague instructions like:

* “Fix the config”
* “Run the usual build”
* “Check the output”

## Procedural

The operator should be able to follow the runbook in order.

Prefer numbered or clearly segmented steps.

## Calm

Write in a tone that helps execution rather than dramatizes it.

Runbooks should reduce stress, not amplify it.

## Minimal but sufficient

A runbook should include what is needed to perform the task safely and correctly.
It should not become bloated with excessive background theory.

## Honest about risk

If the task is dangerous, disruptive, or irreversible, say so clearly and early.

## Skimmable

Critical warnings, prerequisites, rollback steps, and escalation triggers should be easy to find quickly.

# What a Runbook Should Include

A strong runbook usually includes:

* the exact operational task
* the preconditions for safe execution
* required inputs
* safety notes
* a step-by-step procedure
* the expected outputs
* a verification path
* rollback or recovery instructions
* common failure modes
* escalation criteria
* links to references and deeper supporting docs

# What a Runbook Should Not Become

A runbook should not become:

## A long conceptual explanation

That belongs in a reference doc or architecture note.

## A tutorial in disguise

If the primary audience is learning rather than execution, it should probably be a tutorial.

## A historical report

If the document is mainly recording what happened during a past incident or work session, it should probably be a captain’s-log entry or retrospective doc.

## A vague checklist

A bare checklist with no verification, rollback, or failure guidance is too weak for most real operational use.

## A dumping ground for unrelated procedures

A runbook should focus on one operational task or one tightly related family of actions.

# Relationship to Other Document Types

## Runbook vs tutorial

A tutorial teaches a reader how to accomplish something with explanation and learning support.

A runbook directs an operator how to perform a task correctly and safely, often with less explanatory overhead and more emphasis on verification, rollback, and escalation.

## Runbook vs reference

A reference explains what is true or what the rules are.

A runbook explains what to do.

## Runbook vs captain’s-log entry

A captain’s-log entry records how work actually happened, including mistakes and discovery.
A runbook gives the cleaned-up operational path that should be followed now.

A good runbook may be derived from one or more captain’s-log entries.

## Runbook vs ADR

An ADR records why a major design decision was made.
A runbook tells the operator how to execute procedures within that architecture.

## Runbook vs architecture note

An architecture note explains system structure and trade-offs.
A runbook explains operational action.

# Structure / Data Model / Layout

A typical runbook should look like this at a high level:

```text id="g0i2kl"
front matter
Purpose
Scope
Audience
Preconditions
Inputs Needed
Safety Notes
Procedure
Expected Outputs
Verification
Rollback / Recovery
Common Failure Modes
Escalation Notes
Operational Constraints
Artifacts Touched
Related Documents
Revision Notes
Suggested Commit Message
```

This structure is designed to optimize for safe execution, recoverability, and operational clarity.

# Examples

## Example 1 — Good release procedure runbook

Title:

* `Add New Release Version Runbook`

Why it works:

* one clear operational task
* explicit required inputs such as release version
* exact procedure and verification
* rollback and escalation considerations included

## Example 2 — Good recovery runbook

Title:

* `Recover from Broken Docs Release Runbook`

Why it works:

* focused on one failure scenario
* includes rollback or recovery logic
* helps the operator know when to stop improvising and escalate

## Example 3 — Good regeneration runbook

Title:

* `Regenerate OpenAPI and Schema Docs Runbook`

Why it works:

* specific operational task
* exact source inputs and outputs
* verification of generated artifacts
* links to source-of-truth explainers

# Non-Examples / Invalid Cases

## Invalid Example 1 — Runbook with no rollback for a risky operation

The runbook deploys new site artifacts but gives no recovery steps.

Why invalid:

* it is unsafe and incomplete for a consequential operation

## Invalid Example 2 — Runbook that is really a concept document

The document explains how the sync pipeline works but never tells the operator exactly what to do.

Why invalid:

* that is reference or implementation content, not a runbook

## Invalid Example 3 — Runbook with vague instructions

The procedure says:

* “Run the build.”
* “Update the config if needed.”
* “Deploy the new version.”

Why invalid:

* an operator under pressure cannot act reliably on ambiguous instructions

## Invalid Example 4 — Public runbook containing sensitive internal operations

The runbook includes:

* internal hostnames
* secret rotation steps
* internal recovery procedure details

Why invalid:

* the content is operationally sensitive and should remain internal

# Constraints

Runbook conventions are shaped by these constraints:

* runbooks may be used under time pressure
* operational ambiguity can cause real damage
* procedures can drift as the system changes
* rollback is often as important as forward execution
* internal/public publication boundaries matter
* the docs system needs both learning-oriented and execution-oriented content, and those are not the same thing

These constraints justify the relatively strict runbook structure.

# Operational Implications

In practice, these conventions mean:

* maintainers should expect runbooks to be direct and reliable
* authors should review runbooks whenever underlying procedures change
* reviewers should treat stale or under-specified runbooks as serious quality issues
* engineers may derive runbooks from repeated successful procedures and from captain’s-log history
* runbooks should usually remain internal and current rather than versioned snapshots

# Common Mistakes

Common mistakes include:

* writing a tutorial and calling it a runbook
* omitting verification
* omitting rollback for a risky task
* burying critical safety notes inside long prose
* assuming the operator already knows important prerequisites
* including vague or incomplete commands
* failing to update the runbook after procedure changes
* overloading one runbook with unrelated tasks

# Validation and Enforcement

Runbook conventions should be enforced through both tooling and review.

Tooling can validate:

* `docType: runbook`
* correct directory placement under `docs/runbooks/`
* required runbook sections
* normal expectations such as `visibility: internal`
* normal expectations such as `versioned: false`
* presence of meaningful metadata fields

Human review should validate:

* whether the procedure is actually executable
* whether the runbook is specific enough
* whether rollback and escalation are adequate
* whether the runbook matches current operational reality
* whether the runbook should be split or narrowed in scope

# Exceptions

Exceptions should be narrow and explicit.

Possible examples:

* a very low-risk internal checklist-like procedure may have minimal rollback content because rollback is not meaningful
* a runbook may exceptionally be versioned if release-specific operational preservation is truly required and explicitly justified
* a small maintenance procedure may have shorter sections if the task is very constrained and low-risk

There should be no exception to:

* operational clarity
* explicit verification
* honest preconditions
* truthful publication boundary

# Change Management

Changes to runbook conventions affect:

* templates
* operational execution quality
* contributor workflow
* validation rules
* review practices
* maintenance burden

The normal change path should be:

1. identify the convention problem or gap
2. determine whether the issue is editorial, procedural, or architectural
3. update or add an ADR if the change is structural
4. update this reference
5. update the runbook template
6. update validators if needed
7. review important runbooks for consistency

# Related Documents

* `docs/templates/runbook.md`
* `docs/reference/docs-tooling-overview.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/reference/tutorial-conventions.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/implementation/docs-authoring-workflow.md`

# Revision Notes

* Initial version established the canonical conventions for runbooks in the documentation system.
* Future revisions should be coordinated with templates, validation rules, and operational maintenance practices.

# Suggested Commit Message

```text
docs(reference): add runbook conventions
```
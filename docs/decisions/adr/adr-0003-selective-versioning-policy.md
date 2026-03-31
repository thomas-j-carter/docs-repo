---
title: "ADR-0003: Selective Versioning Policy"
description: "Records the decision to version only release-relevant documentation classes and to keep journal, runbook, and other living or chronological materials outside routine release snapshotting."
slug: "/decisions/adr/adr-0003-selective-versioning-policy"
canonicalId: "adr-0003-selective-versioning-policy"
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
  - versioning
  - release
  - docs
sidebar_position: 3
---

# Status

Accepted

# Decision Summary

The project will adopt a **selective documentation versioning policy**.

Only documentation that materially benefits from exact release preservation will be included in versioned release snapshots. Documentation that is primarily:

- chronological,
- operationally current,
- exploratory,
- temporary,
- or better preserved through Git history and journal chronology,

will **not** be versioned by default.

In practical terms:

- canonical reference docs, stable tutorials, accepted ADRs, release-relevant architecture notes, and generated release-facing reference material are generally versioned
- captain’s-log entries are never versioned
- runbooks are unversioned by default
- active working notes and other living internal documents are unversioned unless explicitly justified otherwise

This decision exists to preserve release truth without turning the documentation system into a bloated archive of unnecessary duplicates.

# Context

The documentation system must satisfy two competing needs.

First, it must preserve accurate historical documentation for released system states. Readers need to be able to answer questions like:

- what did the system look like in release `X`?
- what did the public documentation say at that time?
- what API or schema reference existed for that release?
- what architectural decisions governed the released system at that point?

Second, the system must remain maintainable and readable as a working knowledge base. Not every document benefits from being frozen per release. Many documents are more useful when they remain current, such as:

- runbooks
- internal process guidance
- temporary internal tutorials
- live operational notes
- certain implementation documents

A third factor is the presence of a captain’s-log system. The project intentionally preserves chronological engineering history through dated journal entries. If journal entries were also copied into every release snapshot, the result would be a large amount of duplicated low-value historical material.

The project therefore needs a versioning policy that preserves what readers actually need by release while avoiding indiscriminate duplication.

# Problem Statement

How should the documentation system preserve release-accurate historical documentation without:

- versioning everything,
- duplicating low-value historical content,
- creating unnecessary maintenance overhead,
- or confusing readers about the difference between current working docs and release-frozen docs?

# Decision

The project will adopt the following versioning policy:

1. Documentation versioning will be **selective**, not universal.

2. A document participates in release snapshots only when:
   - its document class is policy-eligible for versioning, and
   - its front matter explicitly declares `versioned: true`.

3. The root canonical `docs/` tree remains the active current-working source of truth and is **not** treated as a version archive.

4. Release-versioned documentation is created from synchronized site-local content in the Docusaurus sites, not by manually forking the root canonical corpus.

5. Captain’s-log entries are never versioned.

6. Runbooks are unversioned by default.

7. Stable reference material, accepted ADRs, release-relevant architecture notes, and generated release-facing documentation are generally versioned.

8. Documentation versions should be cut at meaningful release boundaries, not at arbitrary editing milestones.

# Scope

This decision applies to:

- documentation versioning policy
- release snapshot eligibility
- the relationship between current docs and versioned docs
- default versioning behavior by document class
- contributor expectations for the `versioned` field
- maintainer behavior during release documentation cuts

This decision does **not** directly define:

- the exact mechanics of Docusaurus version commands
- the full release runbook
- deployment artifact handling
- public/internal publication rules
- the full metadata schema beyond versioning implications

Those concerns are covered in companion docs.

# Options Considered

## Option A — Selective versioning

Under this option:

- only eligible content classes are versioned
- version participation is explicit through metadata
- living and chronological content remain outside routine release snapshots

### Advantages

- preserves release truth where it matters
- avoids unnecessary duplication
- keeps working docs current and manageable
- aligns naturally with chronological journal history
- reduces noise in historical versions
- lowers long-term maintenance burden compared to versioning everything

### Disadvantages

- requires contributors and maintainers to understand eligibility rules
- some edge cases may require judgment
- versioning is no longer “automatic for everything,” so policy clarity becomes important

## Option B — Version everything

Under this option:

- nearly every document is included in release snapshots
- the entire docs surface is preserved at every release

### Advantages

- simplest rule conceptually
- maximum preservation of documentation state
- fewer edge-case policy decisions

### Disadvantages

- large amounts of low-value duplication
- significant maintenance and storage overhead
- poor fit for captain’s-log content
- poor fit for current operational runbooks
- makes historical versions noisy and harder to browse
- increases the risk that readers confuse transient working material with release-facing truth

## Option C — Version almost nothing

Under this option:

- the current docs remain living docs
- Git history serves as the main historical record
- formal release snapshots are minimized or omitted

### Advantages

- low operational overhead
- simpler authoring model
- avoids version snapshot maintenance

### Disadvantages

- weak support for release-accurate reader experience
- Git history is not an adequate substitute for structured release docs
- harder for users and maintainers to understand what documentation corresponded to a specific release
- weak fit for a serious long-lived system

## Option D — Version only public docs

Under this option:

- the public site gets versioned snapshots
- the internal site remains living-only

### Advantages

- reduces internal snapshot overhead
- preserves public release truth

### Disadvantages

- weak fit for internal release support and maintenance needs
- older internal release behavior may become difficult to reconstruct
- creates inconsistent historical expectations between public and internal readers

# Decision Drivers

The decision was driven primarily by these criteria:

1. Preserve release-accurate documentation where it matters
2. Avoid unnecessary duplication and entropy
3. Keep current working docs usable
4. Respect the distinct role of chronological journal history
5. Minimize long-term operational burden
6. Support both public and internal release understanding
7. Keep contributor rules explicit and enforceable

# Rationale

Selective versioning was chosen because it best fits the project’s documentation model.

The project does not have one homogeneous kind of documentation. It has several:

- stable reader-facing references
- tutorials tied to released behavior
- operational runbooks
- architectural decision records
- architecture notes
- chronological captain’s-log entries
- implementation and planning materials

Treating all of these as if they should be preserved identically would ignore their actual roles.

The journal already preserves chronological truth through dated entries.
Runbooks are usually most useful when they describe the current best operational procedure.
Stable references and release-facing docs, by contrast, are precisely the content readers most need to compare across releases.

Selective versioning therefore captures what should be frozen while allowing the rest of the documentation system to remain current, useful, and maintainable.

This approach also aligns with the architectural rule that the root `docs/` corpus remains the active authoring source, while version snapshots are derived presentation artifacts tied to releases.

# Consequences

## Positive Consequences

- release-relevant docs are preserved accurately
- historical versions remain more focused and usable
- captain’s-log content stays chronological rather than duplicated
- runbooks remain current and operationally useful by default
- contributors have clearer expectations for the `versioned` field
- documentation maintenance burden is lower than under full versioning

## Negative Consequences

- contributors must learn which docs should and should not be versioned
- some document classes require judgment in edge cases
- maintainers must review versioning eligibility during release preparation
- some internal readers may occasionally expect a versioned doc that policy leaves current-only

## Neutral / Operational Consequences

- versioning validation rules become necessary
- release docs cuts need explicit review of eligible docs
- site-local version artifacts become important derived release records
- the project must clearly document the distinction between current docs and latest release docs

# Implementation Notes

This ADR implies the following default behaviors by document class.

## Generally versioned

- `reference`
- `tutorial` when tied to released behavior
- `adr`
- `architecture-note` when release-relevant
- `glossary`
- `changelog`
- `specification`
- generated release-facing reference artifacts such as API/schema material

## Generally unversioned

- `captain-log`
- `runbook`
- temporary working notes
- exploratory drafts
- current-only internal process docs unless explicitly justified otherwise

It also implies:

- validators should reject or flag invalid combinations such as `docType: captain-log` with `versioned: true`
- release workflows should only cut versions from eligible synchronized content
- contributor docs must explain that current canonical docs and versioned release docs serve different purposes

# Migration or Adoption Plan

This project is greenfield enough that adoption is mainly about enforcing the policy early.

## Immediate adoption steps

- define the `versioned` field as required in the front matter contract
- document class-specific default expectations
- update templates and references to reflect selective versioning
- add validation rules for obviously invalid combinations
- ensure release docs workflows are designed around eligible synced content only

## Early enforcement steps

- reject captain’s-log entries marked versioned
- default runbooks to unversioned
- review ADRs and reference docs as version candidates
- document the difference between current working docs and release snapshots

## Later hardening steps

- add stronger eligibility checks where useful
- document any narrow exceptions explicitly
- improve release workflow docs and runbooks around version cuts

# Risks

This decision introduces or leaves open several risks:

- contributors may misunderstand the policy and mark too many docs versioned
- some useful docs may initially be left unversioned by mistake
- release preparation may require careful review in borderline cases
- runbooks that genuinely need release-specific preservation may not fit the default model cleanly without explicit exception handling
- inconsistent versioning decisions could weaken reader trust if not reviewed carefully

These risks are considered manageable and preferable to the much larger burden of versioning everything.

# Rejected Alternatives

## Version everything

Rejected because it produces too much low-value duplication and weakens the usability of versioned doc sets.

## Version almost nothing

Rejected because it fails to preserve structured release truth for readers and maintainers.

## Version only public docs

Rejected because internal readers and maintainers also need release-aware documentation in important areas.

# Follow-Up Work

- [ ] Define versioning expectations in the front matter contract
- [ ] Add versioning validation rules to docs tooling
- [ ] Document eligible and ineligible document classes clearly
- [ ] Ensure templates reflect correct defaults
- [ ] Create release workflow docs aligned with selective versioning
- [ ] Add runbook guidance for cutting a new documentation version
- [ ] Add contributor guidance explaining current docs vs release docs

# Compliance / Enforcement

This decision should be enforced through:

- front matter requirements for `versioned`
- validation rules that reject clearly invalid combinations
- review of release-candidate docs during version cuts
- contributor guidance and templates
- code review discipline for versioning-related metadata changes
- runbooks and release workflows that only version eligible content

# Exceptions

Exceptions are allowed only when they are narrow and explicit.

Examples of acceptable exceptions may include:

- a runbook that must be preserved with a particular release because the operational procedure is release-coupled
- an architecture note that remains unversioned because it is exploratory rather than release-defining
- a temporary formal release checklist treated as versioned because it functions as a release artifact

Exceptions should be documented clearly and not normalized into casual practice.

# Supersession Policy

This ADR remains authoritative until superseded by a later ADR.

It should be revisited if:

- the documentation corpus changes in character significantly
- release history proves either too thin or too noisy under the current policy
- the project adopts a different docs platform or versioning model
- maintainers encounter repeated edge cases that suggest a better policy split

Any such change should be recorded in a new ADR rather than by rewriting this one in place.

# Related Documents

- `docs/reference/versioning-policy-reference.md`
- `docs/reference/frontmatter-contract-reference.md`
- `docs/reference/docs-tooling-overview.md`
- `docs/reference/publication-rules-reference.md`
- `docs/implementation/docs-release-workflow.md`
- `docs/runbooks/add-new-release-version-runbook.md`
- `docs/decisions/adr/adr-0001-two-doc-sites-one-canonical-corpus.md`

# Notes for Future Readers

The key question behind this ADR is not “how much history can we preserve?”  
It is “what kind of history is actually useful, and in what form?”

This project preserves history in multiple ways:

- release snapshots for release-relevant docs
- chronology for captain’s-log entries
- Git history for authoring changes
- status and supersession metadata for stable docs

Selective versioning works because it respects those different preservation models instead of forcing everything into one.

# Suggested Commit Message

```text
docs(adr): add ADR-0003 for selective versioning policy
````
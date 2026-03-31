---
title: "ADR-0002: Audience-First Information Architecture"
description: "Records the decision to make audience the primary information-architecture axis for the documentation system, with domain, phase, and document type treated as secondary classification dimensions."
slug: "/decisions/adr/adr-0002-audience-first-information-architecture"
canonicalId: "adr-0002-audience-first-information-architecture"
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
  - information-architecture
  - navigation
sidebar_position: 2
---

# Status

Accepted

# Decision Summary

The documentation system will use **audience** as its **primary information-architecture axis**.

The primary top-level way readers enter and navigate the documentation system will be by intended audience:

- users
- architects
- engineers
- maintainers

Other important classification dimensions will still exist, but they will function as **secondary axes**, not competing primary navigations:

- domain
- lifecycle phase
- document type
- chronology where relevant, especially for the captain’s log

This decision exists to keep the documentation system understandable and usable as it grows, while still preserving rich multi-dimensional classification through metadata, indexes, search, and supporting pages.

# Decision Summary

The documentation system will use **audience** as its **primary information-architecture axis**.

The primary top-level way readers enter and navigate the documentation system will be by intended audience:

- users
- architects
- engineers
- maintainers

Other important classification dimensions will still exist, but they will function as **secondary axes**, not competing primary navigations:

- domain
- lifecycle phase
- document type
- chronology where relevant, especially for the captain’s log

This decision exists to keep the documentation system understandable and usable as it grows, while still preserving rich multi-dimensional classification through metadata, indexes, search, and supporting pages.

# Context

The documentation system has unusually broad requirements.

It must support:

- future users of the system
- architects evaluating or shaping the system
- engineers implementing and extending it
- maintainers operating and governing it

At the same time, the system also needs to reflect other important dimensions:

- the project’s domains and bounded contexts
- the lifecycle phase of documents, such as ideation, architecture, implementation, deployment, and operations
- document types such as reference, tutorial, runbook, ADR, architecture note, and captain’s-log entry
- chronological progress through the public and internal journal

This creates an information-architecture tension.

If every dimension is treated as equally “primary,” the system becomes a maze:
- multiple competing directory structures
- duplicated content placed under several top-level homes
- inconsistent contributor decisions about where docs belong
- readers unsure which route to take first
- large sidebars and top-level navigation that are hard to scan

At the same time, choosing too simplistic a model would hide valuable structure. The project still needs readers to discover documents by domain, phase, and type, and it needs those axes for governance, validation, search, and generated indexes.

The system therefore needs a stable primary organizing principle that remains human-centered while still supporting richer classification beneath it.

# Problem Statement

What should be the primary information-architecture axis for the documentation system so that:

- readers can enter the system intuitively
- contributors can place and classify documents consistently
- the docs remain understandable as the corpus grows
- other important dimensions such as domain, phase, and document type are still preserved
- public and internal site surfaces remain usable rather than overloaded

# Decision

The project will adopt the following information-architecture model:

1. **Audience is the primary navigation axis.**

2. The main top-level reader entry points and major site navigation paths will be organized around the intended audience:
   - users
   - architects
   - engineers
   - maintainers

3. **Domain, lifecycle phase, and document type are secondary classification axes.**
   These will be represented through metadata, generated indexes, curated landing pages, search, tags where appropriate, and related-document patterns, rather than each becoming a competing top-level primary structure.

4. **Chronology is a parallel specialized axis** used primarily for captain’s-log content and journal browsing, not for the documentation system as a whole.

5. The filesystem, navigation, and site entry points should reinforce audience-first orientation, while the metadata contract and tooling preserve the richer multi-dimensional classification model.

# Scope

This decision applies to:

- the documentation system’s high-level information architecture
- the structure of major audience-oriented documentation surfaces
- contributor expectations about how documents should be conceptually positioned
- index-generation strategy
- landing-page and navigation design
- how metadata dimensions are surfaced to readers

This decision does **not** directly define:

- the exact folder tree for every document
- the detailed taxonomy values themselves
- the search backend implementation
- the visual styling of landing pages
- the exact sync-routing logic for every site-local output
- the detailed versioning workflow

Those are addressed in companion reference, implementation, and architecture documents.

# Options Considered

## Option A — Audience-first primary information architecture

Under this option:

- audience becomes the main entry and navigation model
- other dimensions remain important but secondary
- readers start with “who am I?” rather than “what abstract classification dimension should I choose?”

### Advantages

- human-centered and intuitive for most readers
- reduces top-level navigation complexity
- fits the project’s clearly distinct readership groups
- supports curated experiences for each audience
- still allows metadata-based secondary views for domain, phase, and type
- works well for both public and internal documentation surfaces
- scales better than multiple competing primary axes

### Disadvantages

- some documents naturally span multiple audiences
- domain-oriented readers may still need secondary discovery tools
- contributors must learn that filesystem placement and metadata classification are related but not identical
- requires good supporting landing pages, indexes, and search to surface secondary dimensions well

## Option B — Domain-first primary information architecture

Under this option:

- the top-level docs structure is organized primarily by domain or bounded context
- audiences are secondary filters or landing-page groupings

### Advantages

- maps naturally to system bounded contexts
- useful for domain-driven technical reasoning
- potentially strong for architects and engineers deeply familiar with the system model

### Disadvantages

- less intuitive for many readers, especially new or public-facing readers
- weak fit for users who do not think in domain-model terms
- weak fit for maintainers whose mental model is often task- or responsibility-oriented
- encourages contributor-centric rather than reader-centric navigation
- can make general platform, governance, or cross-cutting docs harder to place

## Option C — Lifecycle-phase-first primary information architecture

Under this option:

- docs are primarily organized by phase such as discovery, architecture, implementation, deployment, and operations

### Advantages

- can reflect project progression clearly
- useful for some internal planning or SDLC-oriented reading

### Disadvantages

- not how most readers look for documentation once the system is mature
- causes awkward placement for stable user docs
- phases are often transient or ambiguous compared to audiences
- weak fit for long-term public documentation
- risks turning the docs into a process archive rather than a usable knowledge system

## Option D — Document-type-first primary information architecture

Under this option:

- top-level navigation is built around document classes such as references, tutorials, runbooks, ADRs, and journal entries

### Advantages

- clean from a documentation-genre perspective
- useful for authors and tooling
- aligns with templates and structural expectations

### Disadvantages

- readers usually do not begin with document genre
- makes the public reader experience more abstract than necessary
- can scatter closely related knowledge across separate type silos
- fits authoring mechanics better than reader needs

## Option E — Multi-primary information architecture with all dimensions equally first-class

Under this option:

- audience, domain, phase, and document type all attempt to act as simultaneous top-level navigation systems

### Advantages

- intellectually expressive
- appears comprehensive
- every classification dimension feels equally represented

### Disadvantages

- creates navigation overload
- encourages duplication and inconsistent placement
- makes contributor decisions harder
- weakens the clarity of the primary reading path
- produces a “maze” rather than a coherent docs experience

# Decision Drivers

The decision was driven primarily by the following criteria:

1. Reader-centered navigation
2. Clarity for first-time readers
3. Distinct audience needs
4. Scalability of the documentation system
5. Ability to preserve secondary dimensions without promoting all of them to equal top-level status
6. Public/internal docs usability
7. Low contributor ambiguity
8. Compatibility with metadata-driven indexes and search

# Rationale

Audience-first was chosen because it best matches how most real readers approach a documentation system.

A user usually begins by asking:
- “Where do I start as a user?”

An architect usually asks:
- “Where are the architecture materials?”

An engineer usually asks:
- “Where is the implementation and contributor documentation?”

A maintainer usually asks:
- “Where are the operational and release materials?”

These are audience questions before they are domain or document-type questions.

That does not mean domain, phase, and document type are unimportant. In fact, they remain extremely important for:

- metadata
- search
- governance
- versioning decisions
- generated indexes
- cross-linking
- contributor consistency

But promoting all those dimensions to equal primary navigation status would make the system harder to use, not richer.

Audience-first gives the project a strong, intuitive top-level model while still allowing the richer metadata model to surface secondary views. It creates one stable entrance path and many secondary discovery paths, instead of many conflicting entrances.

# Consequences

## Positive Consequences

- top-level navigation becomes more intuitive
- public and internal readers can find their likely starting points faster
- audience-specific landing pages become meaningful and useful
- contributor placement decisions become easier at the top level
- the system remains extensible through metadata rather than duplication
- search and generated indexes can surface domain, phase, and type without overloading main navigation
- the public site can be curated more effectively for non-internal readers

## Negative Consequences

- some documents will feel naturally multi-audience and may need careful metadata and linking
- domain-specialist readers may occasionally need extra clicks to reach their materials through secondary paths
- audience-first alone is insufficient without strong secondary discovery tools
- contributors may mistakenly think audience is the only classification dimension unless the taxonomy is documented well

## Neutral / Operational Consequences

- metadata fields for audience, domain, phase, and doc type all remain necessary
- generated audience landing pages and secondary index pages become important
- the journal remains a parallel chronological surface rather than being forced awkwardly into the main docs hierarchy
- contributor guidance must explain the difference between primary IA and secondary classification

# Implementation Notes

This decision implies the following high-level structure and behavior:

## Audience-oriented documentation surfaces

The system should have strong audience-oriented homes such as:

- `docs/audience/users/`
- `docs/audience/architects/`
- `docs/audience/engineers/`
- `docs/audience/maintainers/`

These do not eliminate other content categories such as:

- `docs/reference/`
- `docs/tutorials/`
- `docs/runbooks/`
- `docs/decisions/`
- `docs/journal/`

Instead, they provide the primary conceptual and navigational framing for the reader-facing system.

## Metadata remains multi-dimensional

The metadata contract must still preserve:

- `audiences`
- `domain`
- `phase`
- `docType`
- `visibility`
- `status`

This ADR does not reduce the metadata model. It defines which dimension is first in the reader experience.

## Supporting pages and indexes matter

Because audience is primary and the other axes are secondary, the system should provide:

- audience landing pages
- domain index pages
- phase index pages
- document-type index pages
- strong search
- related-doc links that bridge across axes

Without these, audience-first would be too shallow.

# Migration or Adoption Plan

This project is effectively greenfield for this docs system, so the adoption plan is mainly about establishing the pattern early and consistently.

## Immediate adoption steps

- create audience-oriented canonical directories
- define taxonomy values and front matter expectations
- make audience part of every document’s metadata
- create audience landing pages for both public and internal site surfaces where appropriate
- create secondary indexes for domains, phases, and document types
- ensure templates reflect audience explicitly

## Early enforcement steps

- validate that every document declares an audience
- ensure major site entry points are audience-oriented
- document the difference between primary IA and secondary metadata classification
- prevent contributor confusion by linking this ADR from taxonomy and authoring references

## Later hardening steps

- improve audience landing pages with curated paths and “start here” flows
- strengthen search and filtered index pages
- refine cross-linking between audience-oriented and domain/type-oriented materials

# Risks

This decision introduces or leaves open several risks:

- some documents may be difficult to position cleanly for one audience-first home
- contributors may over-tag audiences to compensate for uncertainty
- if secondary indexes are weak, non-audience discovery may suffer
- internal and public audience groupings may not always align perfectly in detail
- audience categories may need refinement as the corpus grows

These risks are real, but they are considered preferable to the confusion of multi-primary navigation or reader-hostile domain-first organization.

# Rejected Alternatives

## Domain-first primary IA

Rejected because it privileges architectural classification over reader intuition and is a weaker fit for public and mixed-skill audiences.

## Phase-first primary IA

Rejected because phases are not a stable or intuitive top-level navigation model for most readers, especially once the system matures.

## Document-type-first primary IA

Rejected because readers usually seek outcomes and relevance before they seek genre.

## All dimensions equally primary

Rejected because it creates a maze-like information architecture and increases contributor ambiguity.

# Follow-Up Work

- [ ] Create audience-oriented canonical directories and landing docs
- [ ] Ensure every canonical document declares intended audiences
- [ ] Create domain, phase, and document-type secondary indexes
- [ ] Build audience-first navigation into public and internal site entry points
- [ ] Document this model in taxonomy and authoring references
- [ ] Add cross-linking patterns that bridge audience and secondary classification views
- [ ] Validate against over-broad audience tagging where practical

# Compliance / Enforcement

This decision should be enforced through:

- the canonical taxonomy contract requiring `audiences`
- contributor guidance that explains audience as the primary IA axis
- audience landing pages and primary navigation structures
- secondary generated indexes for domain, phase, and type
- review discipline preventing every dimension from becoming a competing top-level structure
- metadata-aware validation and search support

In short, the system should reinforce audience-first navigation structurally, while still preserving richer metadata classification.

# Exceptions

None at this time.

A document may legitimately target multiple audiences, but that does not change the primary IA rule that audience remains the main reader-entry axis.

# Supersession Policy

This ADR remains authoritative until superseded by a later ADR.

It should be revisited if:

- the audience model proves persistently confusing in practice
- the project’s readership changes significantly
- domain-first or another model becomes clearly superior based on corpus scale and reader behavior
- the docs system adopts a radically different discovery model

Any such change should be recorded in a new ADR rather than by rewriting this one in place.

# Related Documents

- `docs/reference/document-taxonomy-reference.md`
- `docs/reference/docs-tooling-overview.md`
- `docs/reference/linking-and-cross-reference-conventions.md`
- `docs/reference/frontmatter-contract-reference.md`
- `docs/implementation/docs-directory-structure-reference.md`
- `docs/audience/architects/information-architecture-overview.md`
- `docs/audience/users/getting-started-with-the-documentation-site.md`

# Notes for Future Readers

This ADR does **not** say that audience is the only meaningful classification. It says audience is the **primary reader-entry and navigation axis**.

If you revisit this decision, evaluate not only whether the taxonomy is expressive, but whether real readers can enter the system confidently and predictably.

The question is not:
- “Can we classify docs many ways?”

The question is:
- “What should a reader experience first, and what should remain secondary but still powerful?”

# Suggested Commit Message

```text
docs(adr): add ADR-0002 for audience-first information architecture
```
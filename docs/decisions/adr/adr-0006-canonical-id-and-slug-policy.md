---
title: "ADR-0006: Canonical ID and Slug Policy"
description: "Records the decision to require stable canonical IDs and explicit slugs for canonical documents so that document identity, routing, linking, and historical preservation remain durable across renames, moves, and release snapshots."
slug: "/decisions/adr/adr-0006-canonical-id-and-slug-policy"
canonicalId: "adr-0006-canonical-id-and-slug-policy"
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
  - identity
  - routing
  - docs
  - slugs
sidebar_position: 6
---

# Status

Accepted

# Decision Summary

The documentation system will require **two distinct but related identity fields** for canonical documents:

- `canonicalId`: the stable, globally unique identity of the document
- `slug`: the explicit route-oriented identifier used for rendered site URLs

These fields serve different purposes and must not be conflated.

The project will treat `canonicalId` as the document’s durable identity across:

- file renames
- folder moves
- site-local sync routing
- release version snapshots
- supersession and historical comparison

The project will treat `slug` as the document’s explicit route contract for rendered documentation surfaces.

This decision exists to prevent ambiguity about document identity, reduce broken cross-references during structural change, and make release/version history more reliable.

# Context

The documentation system is designed to be:

- multi-audience
- multi-surface
- version-aware
- sync-driven
- long-lived
- rooted in one canonical authored corpus

In such a system, documents may change location over time for good reasons:

- the information architecture evolves
- a document moves to a more appropriate section
- a document is renamed for clarity
- a public/internal companion pattern is introduced
- versioned release snapshots preserve older route structures
- related documents are split or merged

If document identity depends only on filesystem path or title, several problems emerge:

- a rename can make it unclear whether the document is “the same doc” or a new one
- a move can make historical tracking weak or ambiguous
- validators and sync tooling have no stable identity anchor
- slugs may drift or collide silently
- reviewers cannot tell whether a content move preserved identity
- future release comparisons become harder

Static-site tooling can often infer routes or IDs from filenames, but those inference rules are not enough for a disciplined documentation system intended to scale and preserve history accurately.

The project therefore needs an explicit identity and routing policy.

# Problem Statement

How should canonical documents identify themselves so that the system can:

- preserve stable document identity across renames and moves
- support explicit, controlled routing in rendered sites
- detect collisions and ambiguity early
- keep cross-references durable
- support versioned documentation sensibly
- distinguish “same document moved” from “new document created”

# Decision

The project will adopt the following identity policy for canonical documents:

1. Every canonical document must declare a globally unique `canonicalId`.

2. Every canonical document must declare an explicit `slug`.

3. `canonicalId` and `slug` serve different roles:
   - `canonicalId` identifies the document as a stable conceptual artifact
   - `slug` identifies the document’s rendered route path

4. `canonicalId` should remain stable across normal document moves and renames unless the document has truly become a different document.

5. `slug` may change when routing, naming, or information architecture needs change, but such changes should be deliberate because they affect links, reader expectations, and release continuity.

6. Validation tooling must enforce:
   - global uniqueness of `canonicalId`
   - uniqueness of effective `slug` within each rendered site context
   - rejection of known-bad or ambiguous collisions

7. Contributors must not treat filename, title, and route as interchangeable identity mechanisms.

# Scope

This decision applies to:

- canonical authored documents in root `docs/`
- front matter requirements
- validation rules for identity and routing
- cross-reference durability
- sync behavior into public and internal site-local trees
- release-versioned documentation consistency
- contributor behavior around document renames and moves

This decision does **not** directly define:

- every naming style for every file path
- the entire linking policy
- the full publication model
- Docusaurus’s internal implementation details
- redirect strategy for changed slugs, if later added
- all edge-case migration rules for merged or split docs

Those are covered in companion references and implementation docs.

# Options Considered

## Option A — Explicit stable canonical IDs plus explicit slugs

Under this option:

- every document has a stable identity field
- every document has an explicit route field
- routing and identity are related but distinct

### Advantages

- strongest identity clarity
- best support for long-term maintainability
- easier collision detection
- better support for moves and renames
- better support for release-history reasoning
- clearer contributor expectations

### Disadvantages

- adds metadata overhead
- contributors must learn the distinction between identity and route
- changes require discipline rather than relying on tool inference

## Option B — Use file paths as document identity

Under this option:

- the path is treated as the real identity
- moves or renames implicitly change document identity

### Advantages

- simple at first glance
- low metadata overhead
- easy for small content sites

### Disadvantages

- poor fit for long-lived evolving docs systems
- makes moves and renames semantically ambiguous
- weak support for historical continuity
- harder to distinguish relocation from replacement

## Option C — Use slugs only and treat them as identity

Under this option:

- the explicit slug is both identity and route

### Advantages

- simpler than two fields
- explicit routing still exists

### Disadvantages

- route changes become identity changes
- routing concerns and identity concerns are conflated
- harder to maintain continuity across IA changes
- weak fit for release-history and supersession reasoning

## Option D — Infer IDs and routes from filenames and titles

Under this option:

- titles, filenames, or framework defaults determine identity and route

### Advantages

- least metadata to write
- convenient for small or informal sites

### Disadvantages

- ambiguous under change
- weak control over routing
- difficult to validate cleanly at scale
- higher risk of accidental collisions or unstable links

# Decision Drivers

The decision was driven primarily by the following criteria:

1. Stable long-term document identity
2. Clear distinction between identity and route
3. Better support for moves and renames
4. Early collision detection
5. Support for versioned docs and historical comparison
6. Contributor clarity about what constitutes “the same doc”
7. Better sync and validation behavior

# Rationale

Option A was chosen because it is the strongest fit for a serious, long-lived docs system.

The key architectural insight is that **document identity and document route are not the same thing**.

A document may remain conceptually the same document even if:

- its filename changes
- its directory changes
- its title changes
- its site section changes
- its route changes for reader-facing reasons

If the system does not preserve a stable identity across those changes, it becomes harder to reason about:

- supersession
- rename history
- versioned continuity
- cross-reference durability
- migration of docs structure over time

By separating `canonicalId` from `slug`, the project gains a cleaner model:

- `canonicalId` says *what document this is*
- `slug` says *where readers find it in the rendered site*

That distinction is worth the additional metadata discipline because it reduces ambiguity across the whole system.

# Consequences

## Positive Consequences

- document identity becomes durable
- route decisions become explicit
- validators can catch identity and route collisions early
- renames and moves become easier to reason about
- version snapshots can preserve route history without losing conceptual identity
- contributors gain a clearer mental model for document continuity

## Negative Consequences

- every canonical document needs more metadata
- contributors must understand when `canonicalId` should stay the same and when it should change
- slug changes may require follow-up review of links and routes
- implementation tooling becomes slightly more complex

## Neutral / Operational Consequences

- templates must include both fields
- validators must track uniqueness separately for identity and route
- contributor guidance must explain rename/move behavior
- code review should treat `canonicalId` changes as meaningful architectural changes to document identity

# Implementation Notes

This decision implies the following rules.

## `canonicalId`

`canonicalId` should be:

- globally unique in the canonical corpus
- stable over time
- semantically tied to the conceptual document
- changed only when the document truly becomes a different document

Examples:

- `reference-frontmatter-contract-reference`
- `tutorial-write-your-first-canonical-doc`
- `runbook-rebuild-doc-sites`
- `adr-0004-public-internal-publication-boundary`

## `slug`

`slug` should be:

- explicit
- route-safe
- meaningful to readers
- unique within the relevant rendered site context

Examples:

- `/reference/frontmatter-contract-reference`
- `/tutorials/write-your-first-canonical-doc`
- `/runbooks/rebuild-doc-sites`
- `/decisions/adr/adr-0004-public-internal-publication-boundary`

## Rename behavior

If a document is renamed for clarity but remains the same conceptual document:

- keep `canonicalId`
- update `title`
- update filename if needed
- update `slug` only if route change is also desired

## Move behavior

If a document moves to a different folder but remains the same conceptual document:

- keep `canonicalId`
- keep or change `slug` deliberately
- update references as needed

## True replacement behavior

If a document is replaced by a fundamentally new document rather than a renamed or moved version of the same one:

- create a new `canonicalId`
- decide on a new `slug`
- link the relationship through supersession or related-doc references where appropriate

# Migration or Adoption Plan

Because the project is establishing this system early, adoption can happen from the beginning rather than through heavy later migration.

## Immediate adoption steps

- require `canonicalId` and `slug` in the front matter contract
- include both in all core templates
- add validation for `canonicalId` uniqueness
- add validation for effective slug uniqueness
- document contributor rules for renames, moves, and replacements

## Early enforcement steps

- reject missing or duplicate `canonicalId`
- reject duplicate or colliding slugs
- review `canonicalId` changes carefully in code review
- document clearly that renaming a file does not automatically mean changing document identity

## Later hardening steps

- add richer diagnostics for collisions
- consider redirect or compatibility strategies if route changes become frequent
- add tooling support for tracking moved docs across the corpus if needed

# Risks

This decision introduces or leaves open several risks:

- contributors may change `canonicalId` too casually
- contributors may keep the same `canonicalId` when a document has actually become a different doc
- slug changes may create broken references if follow-up updates are missed
- edge cases such as split or merged documents may require judgment
- the distinction between conceptual continuity and document replacement may sometimes be subtle

These risks are manageable and preferable to the ambiguity of path-based identity.

# Rejected Alternatives

## File path as identity

Rejected because it makes ordinary refactoring of the docs tree too semantically destructive.

## Slug as identity

Rejected because it conflates route and identity.

## Inferred identity only

Rejected because a large documentation system needs explicit, reviewable identity rules rather than fragile inference.

# Follow-Up Work

- [ ] Require `canonicalId` and `slug` in templates
- [ ] Add reference docs explaining front matter and linking policy
- [ ] Implement duplicate `canonicalId` validation
- [ ] Implement duplicate/effective slug validation
- [ ] Add contributor guidance for rename vs replacement behavior
- [ ] Review seeded docs for stable IDs and route clarity
- [ ] Add documentation for how public/internal companion docs should handle distinct IDs and routes

# Compliance / Enforcement

This decision should be enforced through:

- required front matter fields
- uniqueness validation for `canonicalId`
- uniqueness validation for effective `slug`
- contributor docs explaining identity vs route
- code review scrutiny for `canonicalId` changes
- linking and release workflows that rely on explicit document identity

# Exceptions

None at this time.

Edge cases such as document splits, merges, or public/internal companion derivations should be handled explicitly and documented, not by weakening the general rule.

# Supersession Policy

This ADR remains authoritative until superseded by a later ADR.

It should be revisited if:

- the project adopts a different content platform with a superior identity model
- route redirection and compatibility needs become complex enough to require a broader route-governance policy
- the distinction between canonical identity and rendered route proves insufficient for future content classes

Any such change should be recorded in a new ADR rather than by rewriting this one in place.

# Related Documents

- `docs/reference/frontmatter-contract-reference.md`
- `docs/reference/linking-and-cross-reference-conventions.md`
- `docs/reference/docs-tooling-overview.md`
- `docs/reference/document-taxonomy-reference.md`
- `docs/implementation/docs-directory-structure-reference.md`
- `docs/implementation/docs-validation-and-sync-workflow.md`
- `docs/decisions/adr/adr-0001-two-doc-sites-one-canonical-corpus.md`

# Notes for Future Readers

The most important thing to remember about this ADR is:

**document identity is not the same thing as file path, title, or route.**

If you revisit this decision later, ask:

- are we trying to preserve continuity of a document across normal structural change?
- or are we actually creating a different document?

That is the question that should determine whether `canonicalId` stays the same or changes.

# Suggested Commit Message

```text
docs(adr): add ADR-0006 for canonical ID and slug policy
```
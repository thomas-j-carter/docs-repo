---
title: "ADR-0005: Generated Docs Are Tool-Owned"
description: "Records the decision that generated documentation outputs are owned by tooling rather than manual authorship, while human-authored source-of-truth explainer docs remain canonical."
slug: "/decisions/adr/adr-0005-generated-docs-are-tool-owned"
canonicalId: "adr-0005-generated-docs-are-tool-owned"
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
  - generated-docs
  - tooling
  - source-of-truth
  - automation
sidebar_position: 5
---

# Status

Accepted

# Decision Summary

The project will treat **generated documentation outputs as tool-owned artifacts**, not as manually maintained canonical source material.

This means:

- generated docs must be produced by tooling from defined source inputs
- contributors must not manually maintain generated outputs as if they were the authoritative version
- human-authored documentation may explain generated areas, their provenance, and their meaning, but those explainer docs are distinct from the generated outputs themselves
- fixes to generated docs should normally be made by changing:
  - the generator,
  - the source input,
  - or the generation contract,
  not by hand-editing the generated output

This decision exists to prevent drift, ambiguity, and hidden ownership confusion between authored truth and machine-produced derivative artifacts.

# Context

The documentation system is designed to include both human-authored and machine-produced content.

Examples of machine-produced or machine-assisted documentation areas include:

- OpenAPI inventories or generated API references
- schema inventories or generated schema docs
- changelog inventories or release-derived summaries
- generated taxonomy indexes
- generated category or landing metadata
- site-local synchronized content trees
- derived artifacts used by the public and internal documentation sites

Without an explicit ownership rule, generated docs create a dangerous ambiguity:

- a contributor sees an error in generated output
- they edit the output directly
- the change appears to fix the problem locally
- the next generation or sync run overwrites it
- no one can tell whether the generator, the input source, or the generated output is authoritative

This ambiguity produces several risks:

- source-of-truth drift
- silent loss of changes
- confusing contributor workflow
- poor CI determinism
- brittle release behavior
- increased maintenance cost
- unclear review expectations

The project already distinguishes canonical authored source content from rendered site-local outputs. Generated documentation needs the same clarity of ownership.

# Problem Statement

How should the documentation system handle generated documentation so that it can:

- benefit from automation
- avoid source-of-truth drift
- keep ownership clear
- make fixes durable
- support deterministic builds and release workflows
- avoid contributors manually “patching” generated outputs in ways that will later be lost

# Decision

The project will adopt the following rule set for generated documentation:

1. Generated documentation outputs are **tool-owned**.

2. A generated output is not a canonical manual authoring surface.

3. Contributors must not manually edit generated outputs except in narrowly defined temporary debugging scenarios that are not committed as durable fixes.

4. Durable fixes to generated content must be made by updating one or more of:
   - the source input
   - the generator implementation
   - the generator configuration
   - the generation contract
   - the source-of-truth authored explainer doc, if the problem is conceptual rather than output-level

5. Generated content must carry enough provenance information that readers and maintainers can tell:
   - that it is generated
   - what produced it
   - when or from what it was produced

6. Human-authored documents may exist to explain generated areas, but those documents are distinct from the generated output and may remain canonical reference material.

7. Generated content that is synchronized into site-local trees remains generated or derived output, not canonical authored material.

# Scope

This decision applies to:

- generated documentation in the canonical corpus
- generated inventories and references
- synchronized site-local content trees
- tool-produced metadata artifacts such as category files, tags registries, authors registries, or index pages
- contributor behavior around machine-produced documentation artifacts
- docs generation, sync, and CI determinism expectations

This decision does **not** directly define:

- every specific generator implementation
- the exact set of generated doc categories the project will ultimately support
- all deployment or versioning rules
- whether every generated area must be committed or regenerated on demand
- the complete metadata schema for generated outputs

Those are handled in companion references, implementation docs, and tooling contracts.

# Options Considered

## Option A — Generated outputs are tool-owned; fixes happen at the source or generator layer

Under this option:

- generated docs are treated as derived artifacts
- ownership is explicit
- contributors fix durable problems upstream
- human-authored explainer docs are allowed as separate canonical docs

### Advantages

- clear source-of-truth boundaries
- lower drift risk
- durable fixes
- easier CI determinism
- more trustworthy automation
- clearer contributor workflow
- better release reproducibility

### Disadvantages

- contributors cannot take the seemingly easy path of directly editing generated output
- fixing an issue may require touching generator code or source inputs
- generation contracts must be documented clearly
- some generated areas may require more tooling investment up front

## Option B — Generated outputs may be hand-corrected as needed

Under this option:

- contributors can patch generated docs directly
- generator issues may be tolerated for a time

### Advantages

- fast local correction in the moment
- lower immediate friction for simple issues
- may feel convenient when tooling is immature

### Disadvantages

- high source-of-truth ambiguity
- fixes are often lost on regeneration
- reviewers cannot easily tell whether the generator or output is authoritative
- release and CI determinism become weaker
- long-term maintenance becomes much harder

## Option C — Avoid generated docs entirely and author everything by hand

Under this option:

- no generated outputs exist
- all reference surfaces are manually written and maintained

### Advantages

- maximum human control over every page
- no generator complexity
- no provenance ambiguity because there is no generation

### Disadvantages

- poor fit for API/schema/changelog/reference inventories
- high maintenance burden
- increased staleness risk
- weak scalability
- missed automation opportunities

## Option D — Generated outputs are canonical and manually maintained after generation

Under this option:

- generation acts as a bootstrap
- generated docs become hand-edited source material afterward

### Advantages

- allows machine-assisted starting points
- later prose polish may feel easy

### Disadvantages

- ownership becomes muddy
- regeneration becomes risky or impossible
- generator usefulness declines over time
- contributors cannot trust whether regeneration is safe
- difficult to reason about provenance and drift

# Decision Drivers

The decision was driven primarily by the following criteria:

1. Source-of-truth clarity
2. Durability of fixes
3. Deterministic generation and build behavior
4. Low long-term drift risk
5. Clear contributor expectations
6. Scalability of generated documentation
7. Compatibility with CI, release, and site sync workflows

# Rationale

Option A was chosen because it gives the project the clearest and most sustainable ownership model.

Generated documentation is useful because it reduces manual maintenance, improves consistency, and makes release-aligned reference surfaces feasible. But those advantages disappear if generated outputs are treated as ordinary hand-editable content.

Once contributors begin editing generated outputs directly, several bad things happen:

- the generator becomes untrustworthy
- the outputs become partially generated and partially manual without clear boundaries
- regeneration becomes dangerous
- reviewers cannot confidently assess where truth lives
- small short-term convenience creates large long-term confusion

By making generated outputs tool-owned, the project preserves a clean separation:

- human-authored docs define rules, concepts, curated narrative, and source-of-truth explanation
- generated outputs provide derived reference material and automated structural artifacts

This decision also fits the overall system architecture, where site-local docs trees are already treated as derived outputs rather than canonical sources.

# Consequences

## Positive Consequences

- generated output ownership is clear
- durable fixes are pushed to the right layer
- automation remains trustworthy
- CI and sync determinism become easier to enforce
- contributors can distinguish between authored truth and generated derivatives
- release workflows become more reliable
- source-of-truth explainer docs can coexist cleanly with generated pages

## Negative Consequences

- contributors may initially find it inconvenient not to patch generated output directly
- fixing generated issues may require touching tooling or source inputs rather than content only
- generator quality becomes more important
- provenance and generation contracts must be documented clearly

## Neutral / Operational Consequences

- generated docs should usually include provenance fields
- generated directories require stricter review rules
- sync and generation tooling become central to docs correctness
- documentation onboarding must explain the difference between canonical authored docs and generated outputs

# Implementation Notes

This ADR implies the following ownership model.

## Canonical human-authored sources

These include documents such as:

- reference docs
- tutorials
- runbooks
- ADRs
- architecture notes
- captain’s-log entries
- source-of-truth explainers for generated areas

Examples:
- `docs/reference/api/openapi-source-of-truth.md`
- `docs/reference/schema/schema-source-of-truth.md`
- `docs/reference/changelog/changelog-source-of-truth.md`

These are manually authored and canonical.

## Tool-owned generated outputs

These include documents or artifacts such as:

- `docs/generated/openapi/**`
- `docs/generated/schema/**`
- `docs/generated/changelog/**`
- generated taxonomy indexes
- generated category files
- generated site-local docs trees
- generated site-local blog trees
- copied or emitted tags/authors registries where produced by tooling

These are derived outputs and not manually authoritative.

## Required behavior for fixes

If a generated output is wrong, the preferred correction order is:

1. fix the source input
2. fix the generator
3. fix the generation contract or config
4. regenerate the output
5. only then review the output for correctness

Not:
- hand-edit the output and hope it stays fixed

## Provenance expectations

Generated outputs should, where appropriate, declare fields such as:

- `generatedFrom`
- `generatedAt`

and possibly tooling ownership such as:

- `owner: docs-automation`

This makes the generated nature of the artifact explicit.

# Migration or Adoption Plan

This project is greenfield enough that adoption is mainly about establishing the ownership boundary before contributor habits form in the wrong direction.

## Immediate adoption steps

- create generated-content reference areas and source-of-truth explainers
- define generated-doc provenance expectations
- mark generated output areas clearly in contributor docs
- document in templates and references that generated outputs are not to be hand-maintained
- implement tooling that can regenerate these areas deterministically

## Early enforcement steps

- add contributor guidance explaining generated ownership
- add review expectations that reject direct edits to generated outputs where applicable
- add CI determinism checks for generation and sync outputs
- make site-local sync targets disposable and rebuildable

## Later hardening steps

- improve generator provenance metadata
- make generated-output diff review clearer
- document per-generator source inputs and ownership boundaries more precisely
- add validator warnings or errors for suspicious generated-output edits where feasible

# Risks

This decision introduces or leaves open several risks:

- contributors may still edit generated output out of habit
- generator bugs may temporarily make fixes feel slower than direct manual output edits
- some generated areas may blur into curated material unless the boundaries are documented carefully
- provenance fields may be inconsistently implemented at first
- determining whether a document is truly generated vs semi-curated may require discipline in edge cases

These risks are considered manageable and preferable to the much larger drift risk of mixed ownership.

# Rejected Alternatives

## Hand-correct generated outputs as needed

Rejected because it creates ambiguous ownership and fragile fixes.

## Avoid generated docs entirely

Rejected because the project benefits substantially from automation in API/schema/changelog/indexing and derived site artifacts.

## Treat generated outputs as post-generation canonical docs

Rejected because it makes regeneration unsafe and undermines the value of automation.

# Follow-Up Work

- [ ] Create source-of-truth explainer docs for generated areas
- [ ] Define provenance expectations for generated output
- [ ] Document generated directories and generated site-local trees clearly
- [ ] Add CI checks or review expectations discouraging manual edits to generated outputs
- [ ] Implement deterministic generators and sync flows
- [ ] Add contributor docs explaining how to fix generated-doc problems correctly
- [ ] Make site-local synced outputs clearly disposable and rebuildable

# Compliance / Enforcement

This decision should be enforced through:

- contributor documentation
- clear generated directory naming and conventions
- provenance metadata on generated docs where appropriate
- code review rules rejecting durable manual edits to generated outputs
- deterministic generation and sync workflows
- CI checks that regenerate outputs and detect unexpected drift
- source-of-truth explainer docs that tell contributors where real fixes belong

# Exceptions

Narrow temporary debugging edits may occur locally while diagnosing generator behavior, but they should not be treated as durable fixes and should not normally be committed as the final resolution.

No exception should create a standing second source of truth for generated content.

# Supersession Policy

This ADR remains authoritative until superseded by a later ADR.

It should be revisited if:

- the project adopts a fundamentally different content platform
- generation becomes so human-curated that a new ownership model is genuinely needed
- the distinction between generated and authored content proves insufficient for some future content class
- the system adopts a structured editorial workflow that changes how generated surfaces are governed

Any such change should be recorded in a new ADR rather than by rewriting this one in place.

# Related Documents

- `docs/reference/docs-tooling-overview.md`
- `docs/reference/frontmatter-contract-reference.md`
- `docs/reference/publication-rules-reference.md`
- `docs/reference/versioning-policy-reference.md`
- `docs/reference/linking-and-cross-reference-conventions.md`
- `docs/reference/api/openapi-source-of-truth.md`
- `docs/reference/schema/schema-source-of-truth.md`
- `docs/reference/changelog/changelog-source-of-truth.md`
- `docs/implementation/generated-content-pipeline-overview.md`

# Notes for Future Readers

This ADR is not anti-automation and not anti-human judgment.

It is pro-clarity.

The key question is not:
- “Can a person improve generated output by hand?”

Of course they can.

The real question is:
- “Where should the durable fix live so the system remains trustworthy tomorrow?”

This ADR answers:
- in the source input, generator, or generation contract, not in the derived output alone.

# Suggested Commit Message

```text
docs(adr): add ADR-0005 for tool-owned generated docs
```
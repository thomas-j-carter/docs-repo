---
title: "ADR-0004: Public/Internal Publication Boundary"
description: "Records the decision to enforce a hard public/internal publication boundary through explicit document metadata, deterministic sync rules, and separate public and internal documentation site surfaces."
slug: "/decisions/adr/adr-0004-public-internal-publication-boundary"
canonicalId: "adr-0004-public-internal-publication-boundary"
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
  - publication
  - docs
  - security
  - governance
sidebar_position: 4
---

# Status

Accepted

# Decision Summary

The documentation system will enforce a **hard publication boundary** between **public** and **internal** documentation.

This boundary will be implemented through three mutually reinforcing mechanisms:

1. **explicit per-document publication metadata**
2. **deterministic sync and validation rules**
3. **separate public and internal site deployments**

In practical terms:

- a document marked `visibility: public` is eligible for public publication only if it is also marked `publish: true`
- a document marked `visibility: internal` must never be published to the public site
- the internal site may include both internal docs and selected public docs, depending on sync policy
- the public site must never rely on manual curation by copying files around outside the canonical metadata and sync model
- public-safe and internal-detailed versions of related material may coexist as separate companion docs where needed

This decision exists to protect sensitive internal documentation, preserve a trustworthy public reader experience, and prevent boundary drift over time.

# Context

The project requires two very different documentation audiences and usage modes.

The **public** side of the system must support:

- future users of the system
- external readers evaluating the project
- selected public-facing technical documentation
- curated public journal or progress material
- stable release-facing docs that are appropriate for public consumption

The **internal** side of the system must support:

- engineers
- architects
- maintainers
- internal planning and pre-code artifacts
- internal architecture notes
- operational runbooks
- internal-only implementation detail
- internal engineering journal entries
- release support and operational governance

These two documentation surfaces are not merely different “views” in a casual sense. They have different trust, safety, and usability requirements.

If the project fails to define and enforce the public/internal boundary explicitly, several bad outcomes become likely:

- internal operational or security-sensitive material leaks into public outputs
- public readers encounter internal-only references or dead-end links
- contributors become unsure what can be published
- internal docs are softened or underwritten because authors are afraid they may later leak publicly
- public and internal variants drift without clear intent
- release and deployment workflows become less trustworthy

The docs system is also being built on a static-site model, which means the internal site’s protection is not something Docusaurus itself inherently guarantees. That increases the importance of having clean publication rules in the content and build pipeline, not just in infrastructure.

# Problem Statement

How should the documentation system define and enforce the public/internal documentation boundary so that it can:

- safely publish public-facing docs
- preserve internal-only material without compromise
- avoid accidental exposure of sensitive operational or implementation detail
- keep contributor behavior simple and explicit
- support selective publication of materials like journal entries
- work cleanly with separate public and internal documentation sites

# Decision

The project will adopt the following public/internal publication-boundary model:

1. Every canonical document must explicitly declare a publication boundary through front matter.

2. The publication boundary will be represented primarily through:
   - `visibility`
   - `publish`

3. The canonical meanings are:

   - `visibility: public` means the document is eligible for public publication if and only if `publish: true`
   - `visibility: internal` means the document must never appear on the public site
   - `publish: true` means the document is intended to appear in eligible rendered outputs
   - `publish: false` means the document is not currently intended to render into any site output

4. The public site will publish only content that is both:
   - `visibility: public`
   - `publish: true`

5. The internal site will publish:
   - `visibility: internal` documents with `publish: true`
   - and, where useful, `visibility: public` documents with `publish: true`

6. Public-safe and internal-detailed companion documents may coexist when one subject needs:
   - a public-safe explanation
   - and a more detailed internal treatment

7. Public publication must be determined by metadata and sync rules, not by manual copying or ad hoc site-local editing.

8. Internal docs protection will be reinforced at the deployment layer, but the content system itself must still enforce strict publication eligibility rules.

# Scope

This decision applies to:

- documentation publication eligibility
- public/internal rendering behavior
- sync routing rules
- contributor expectations for classifying docs
- public vs internal journal behavior
- public-safe vs internal-detailed companion documents
- validation and review expectations related to exposure risk
- documentation deployment assumptions at the system level

This decision does **not** directly define:

- the complete front matter contract
- the full search strategy
- the exact reverse-proxy or SSO configuration for internal docs hosting
- all content-style differences between public and internal writing
- the exact versioning workflow
- the exact site theme or navigation implementation

Those concerns are handled in companion ADRs, references, and implementation docs.

# Options Considered

## Option A — Hard public/internal boundary with explicit metadata, sync enforcement, and separate site surfaces

Under this option:

- each document explicitly declares publication eligibility
- validation enforces obvious violations
- sync routes content deterministically
- public and internal sites remain separate
- public-safe and internal-detailed companion docs are allowed where necessary

### Advantages

- strong publication clarity
- lower risk of accidental public leakage
- clearer contributor rules
- better fit for separate public and internal site experiences
- allows internal docs to remain candid and operationally useful
- supports selective publication of journal and architectural material
- aligns well with deployment-layer auth boundaries

### Disadvantages

- requires contributors to understand publication metadata
- requires sync and validation tooling
- some topics require judgment about whether one doc or two companion docs are appropriate
- reviewers must consider content safety, not only structure

## Option B — One mixed-content site with route-based protection and soft internal/public separation

Under this option:

- public and internal material coexist in one broad site
- protection is handled primarily through routing and deployment controls
- publication distinctions may be less explicit at the content level

### Advantages

- fewer site applications
- possibly simpler theme and build management
- fewer duplicated structural concerns at the app layer

### Disadvantages

- higher conceptual ambiguity
- increased risk of public/internal confusion
- weaker contributor model for publication safety
- harder to curate a clean public experience
- easier for public pages to link into internal dead ends
- greater pressure to rely on infrastructure alone for separation

## Option C — Default everything to public-safe content only

Under this option:

- contributors write everything as if it may become public
- internal-only rendered documentation is minimized or omitted

### Advantages

- simplest publication logic
- minimal boundary logic
- lower risk of accidental secret leakage if authors are extremely conservative

### Disadvantages

- fails the requirement for a serious internal working knowledge base
- pressures authors to omit useful internal detail
- weak fit for operational runbooks, internal architecture, debugging traces, and planning artifacts
- produces poorer internal documentation quality

## Option D — Manual public curation by copying or hand-maintaining public-friendly variants in site-local trees

Under this option:

- contributors or maintainers manually move or duplicate docs into public areas when they want them exposed

### Advantages

- superficially flexible
- easy to understand at a very small scale
- no strong metadata model required at first

### Disadvantages

- high drift risk
- unclear authority between canonical and copied versions
- high maintenance burden
- easy to make inconsistent exposure decisions
- poor auditability
- strong mismatch with the project’s source-of-truth model

# Decision Drivers

The decision was driven primarily by the following criteria:

1. Prevent accidental public exposure of internal content
2. Preserve a trustworthy, curated public reader experience
3. Allow internal docs to remain candid, useful, and operationally specific
4. Keep contributor publication decisions explicit and reviewable
5. Align content governance with separate public and internal site deployments
6. Support selective publication rather than all-or-nothing exposure
7. Avoid source-of-truth drift and ad hoc manual curation

# Rationale

Option A was chosen because it best balances safety, usability, and maintainability.

The project needs genuinely internal documentation. That means the internal surface must be allowed to contain material that is not suitable for public readers, including:

- operational runbooks
- internal auth-boundary detail
- infrastructure topology
- internal-only implementation notes
- candid engineering journal material
- pre-code exploration and planning material

At the same time, the public surface must remain coherent and trustworthy. Public readers should not encounter:

- internal-only routes
- references to inaccessible or inappropriate internal documents
- operational or security-sensitive detail
- half-sanitized documents that mix public-safe and internal-only content

A hard publication boundary with explicit metadata and deterministic routing is the cleanest way to satisfy both needs.

This model also supports a healthier internal culture of documentation. Authors do not need to constantly dilute internal docs out of fear that they may later leak publicly by convention or accident. Instead, publication is a deliberate classification and governance act.

The chosen model accepts some up-front complexity in metadata, validation, and sync logic, but that is a worthwhile trade for a system that will remain legible, safe, and maintainable over time.

# Consequences

## Positive Consequences

- internal and public docs are clearly distinguished
- public publication becomes deliberate and auditable
- internal documentation can remain more candid and operationally useful
- public readers get a cleaner, more trustworthy experience
- selective publication becomes easier to reason about
- companion public/internal docs can be created intentionally when needed
- validation and review can focus on meaningful publication risk

## Negative Consequences

- contributors must learn the distinction between `visibility` and `publish`
- some documents will require judgment calls about public eligibility
- reviewers must evaluate content safety, not just metadata correctness
- some topics may require paired public/internal documents, which adds authoring overhead
- sync and validation tooling must be robust enough to enforce the boundary

## Neutral / Operational Consequences

- the internal site may act as a superset surface in some areas
- the public site becomes more strongly curated by design
- public journal content becomes editorial rather than automatic
- public docs should avoid linking readers into internal-only paths
- infrastructure auth remains necessary but no longer the only line of defense

# Implementation Notes

This decision implies the following metadata behavior:

## Public-eligible published doc

```yaml id="6ruhp6"
visibility: public
publish: true
````

This content may appear on the public site and may also appear on the internal site if internal sync includes public docs.

## Public-eligible unpublished doc

```yaml id="tm08wo"
visibility: public
publish: false
```

This content is public-safe in principle but is not currently rendered into outputs.

## Internal-only published doc

```yaml id="s3luwu"
visibility: internal
publish: true
```

This content may appear on the internal site and must never appear on the public site.

## Internal-only unpublished doc

```yaml id="5pekrb"
visibility: internal
publish: false
```

This content remains canonical repo material but is not currently published to either site.

This decision also implies:

* validators must reject or flag obvious public/internal mismatches
* sync must never route `visibility: internal` content into the public site
* public docs should be checked for internal-only asset or route references where possible
* contributor docs must teach the public/internal distinction explicitly
* public-safe companion docs should be preferred over mixed-sensitivity documents

# Migration or Adoption Plan

This project is greenfield enough that adoption is mostly about establishing the rule early and enforcing it consistently.

## Immediate adoption steps

* require `visibility` and `publish` in the front matter contract
* define publication rules in the reference documentation
* make publication classification part of authoring templates
* ensure public and internal site sync behavior is based on metadata, not manual placement
* document internal as the default for sensitive or uncertain material

## Early enforcement steps

* reject internal docs in public sync outputs
* reject clearly invalid publication combinations where practical
* add review guidance for public-safe content assessment
* ensure public docs do not create obvious reader dead ends into internal-only materials

## Later hardening steps

* improve validation for public docs referencing internal-only assets or routes
* refine companion-document patterns for public/internal dual-topic coverage
* add deployment checks that reinforce the internal hosting boundary

# Risks

This decision introduces or leaves open several risks:

* contributors may misuse `visibility` or `publish`
* some content may be misclassified as public when it is not actually public-safe
* some content may remain internal longer than necessary because authors choose conservatively
* companion public/internal docs may drift if not linked and reviewed carefully
* internal site deployment misconfiguration could still create exposure risk if infrastructure protections are weak

These risks are real, but they are preferable to the much greater ambiguity and exposure risk of weaker publication boundaries.

# Rejected Alternatives

## Mixed public/internal site with soft boundary

Rejected because it weakens clarity and increases exposure risk.

## Public-safe-only documentation culture

Rejected because it would make internal documentation less useful and less truthful.

## Manual public curation by copying docs around

Rejected because it creates drift, duplication, and weak governance.

# Follow-Up Work

* [ ] Define publication metadata clearly in the front matter contract
* [ ] Publish a reference doc explaining publication rules
* [ ] Add sync rules that strictly enforce public/internal routing
* [ ] Add validation for obvious public/internal boundary violations
* [ ] Document companion-doc patterns for public-safe and internal-detailed pairs
* [ ] Add contributor guidance for deciding when content should be public vs internal
* [ ] Ensure public journal publication is selective and editorial
* [ ] Align deployment scaffolding with the hard publication-boundary model

# Compliance / Enforcement

This decision should be enforced through:

* required `visibility` and `publish` metadata
* validation tooling
* sync routing rules
* review standards for public-safe content
* code review discipline rejecting manual site-local publication hacks
* separate public and internal site build and deployment flows
* explicit contributor guidance about the publication boundary

The boundary should be enforced both **in content governance** and **in infrastructure**, not only in one layer.

# Exceptions

None at this time.

A narrow future exception may exist for carefully designed public/internal companion materials or mirrored public-safe docs on the internal site, but no exception should weaken the rule that internal-only docs must never be published publicly.

# Supersession Policy

This ADR remains authoritative until superseded by a later ADR.

It should be revisited if:

* the project no longer needs meaningful internal-only documentation
* the hosting or identity architecture changes so significantly that the current model is no longer the best fit
* the project adopts a fundamentally different publication platform or governance model
* repeated real-world edge cases suggest a more robust boundary model is needed

Any such change should be recorded in a superseding ADR rather than by rewriting this one in place.

# Related Documents

* `docs/reference/publication-rules-reference.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/docs-tooling-overview.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/implementation/internal-docs-auth-integration-plan.md`
* `docs/audience/architects/public-vs-internal-docs-architecture.md`
* `docs/decisions/adr/adr-0001-two-doc-sites-one-canonical-corpus.md`

# Notes for Future Readers

This ADR is not merely about hiding internal content. It is also about preserving the quality of both documentation surfaces.

A weak boundary harms both sides:

* the public side becomes confusing or risky
* the internal side becomes timid, incomplete, or over-sanitized

The purpose of this decision is therefore twofold:

* protect exposure boundaries
* preserve documentation quality on both sides of the system

# Suggested Commit Message

```text
docs(adr): add ADR-0004 for public/internal publication boundary
```
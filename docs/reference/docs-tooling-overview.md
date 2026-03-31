---
title: "Documentation Tooling Overview"
description: "Comprehensive overview of the documentation system tooling, including the canonical docs corpus, validation, generation, sync, build, versioning, and deployment-preparation workflows."
slug: "/reference/docs-tooling-overview"
canonicalId: "reference-docs-tooling-overview"
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
  - docs
  - tooling
  - architecture
sidebar_position: 1
---

# Purpose

This document provides the authoritative high-level overview of the documentation tooling system for the repository.

Its purpose is to explain, in one place, how the documentation platform works end to end, including:

- where canonical documentation is authored
- how documentation metadata is defined and enforced
- how generated documentation is produced
- how canonical documentation is synchronized into public and internal site-local trees
- how the two Docusaurus sites are built
- how documentation versions are preserved by release
- how deployment preparation fits into the overall workflow

This document is intended to help readers understand the tooling system as a whole before they dive into any specific validator, generator, sync script, or site configuration.

# Scope

This document covers the documentation tooling architecture and workflow at a system level.

It includes:

- the canonical documentation corpus
- the shared metadata contract
- the validation layer
- the generation layer
- the synchronization layer
- the public and internal Docusaurus site surfaces
- the deployment-preparation layer
- the typical local and CI execution flow

It does **not** provide exhaustive implementation detail for:

- every front matter field
- every validation rule
- every deployment configuration detail
- the visual design of the sites
- the identity-provider configuration for internal auth
- the exact search backend implementation

Those details belong in more specialized reference, implementation, runbook, and architecture documents.

# Status and Authority

This document is a **normative reference overview** for the documentation tooling system.

It is authoritative for the conceptual structure and operational responsibilities of the tooling layer, but it does not override accepted ADRs. Where an ADR and this document conflict, the ADR takes precedence and this document must be updated.

This document should be read as the main “system map” for the documentation tooling, while more specific documents define the detailed contracts for metadata, publication rules, versioning, and implementation behavior.

# Audience

This document is primarily for:

- **architects**, who need to understand the documentation system design at a structural level
- **engineers**, who will implement or modify validators, generators, sync logic, or site configuration
- **maintainers**, who will operate release, deployment, and quality-control workflows

It may also help advanced contributors understand how authored content moves through the system.

# Definitions

## Canonical Corpus

The root `docs/` directory in the repository, which is the single source of truth for authored project documentation.

## Site-Local Content Tree

A generated documentation tree inside a site application, such as `apps/docs-public/docs/` or `apps/docs-internal/blog/`, used by Docusaurus for rendering and versioning.

## Validation

The tooling stage that checks whether canonical documents satisfy required metadata, placement, structural, and publication rules.

## Generation

The tooling stage that creates machine-produced documentation artifacts or inventories from other project sources.

## Sync

The tooling stage that filters, routes, and materializes canonical documentation into public and internal site-local content trees.

## Public Site

The Docusaurus application that renders content safe for public publication.

## Internal Site

The Docusaurus application that renders internal documentation and is expected to be protected at the deployment layer.

## Generated Content

Documentation content produced by tooling rather than hand-authored directly in the rendered site trees.

## Canonical ID

A stable identifier assigned to a document so that the document can be tracked reliably across renames, relocations, and release snapshots.

## Versioned Documentation

Release-preserved documentation snapshots intended to reflect the documentation state for a specific release.

# Subject Overview

The documentation system is built around one central principle:

**authored documentation lives once, at the repository root, and everything else is derived from it.**

The system is intentionally split into two broad concerns:

1. **Canonical authorship and policy**
2. **Rendered presentation and delivery**

Canonical authorship and policy live in:

- `docs/`
- `packages/docs-config/`
- `tools/docs/`

Rendered presentation and delivery live in:

- `apps/docs-public/`
- `apps/docs-internal/`
- deployment scaffolding under infrastructure and workflow layers

This separation exists to prevent one of the most common documentation failures in complex systems: source-of-truth drift. If authors are allowed to maintain separate “real” copies for internal docs, public docs, blog content, generated docs, and versioned docs independently, the system becomes inconsistent very quickly. This tooling model avoids that by making the root `docs/` corpus authoritative and treating rendered trees as disposable outputs.

# Canonical Rules / Contracts / Interfaces

## Rule 1 — The root `docs/` directory is the only canonical authored corpus

All human-authored documentation should originate in the repository root `docs/` tree.

That includes:

- audience-oriented docs
- reference material
- tutorials
- runbooks
- implementation notes
- ADRs
- captain’s-log entries
- source-of-truth explainers for generated areas

It does **not** include hand-authoring inside:

- `apps/docs-public/docs/**`
- `apps/docs-public/blog/**`
- `apps/docs-internal/docs/**`
- `apps/docs-internal/blog/**`

Those site-local paths are generated sync targets and must be treated as disposable outputs.

## Rule 2 — Shared metadata policy is defined centrally

The project-level documentation contract is defined centrally in `packages/docs-config/`.

That package owns:

- taxonomy values
- front matter types
- required field expectations
- publication rules
- versioning eligibility rules
- path-placement rules
- shared constants used by validation and sync tooling

This prevents the same metadata rules from being redefined differently in multiple scripts or apps.

## Rule 3 — Invalid canonical docs must fail before sync or build

Validation is a hard gate.

If canonical documents are invalid, they must fail in the validation stage rather than being “helpfully” mutated later by sync logic or silently accepted by site builds.

This rule exists because the documentation system should be explicit and trustworthy, not permissive and surprising.

## Rule 4 — Public and internal rendered outputs are filtered views of the same canonical system

The public and internal sites are not separate authoring systems.

They are filtered and routed views over the same canonical corpus, with different publication boundaries, routing rules, and deployment expectations.

## Rule 5 — Generated documentation is tool-owned

Generated documentation must be produced by tooling and not manually maintained as if it were canonical authored content.

Where a generated area exists, authors may write the source-of-truth explainer for that area, but the actual generated output is owned by the tooling layer.

## Rule 6 — Versioning applies selectively, not universally

Versioning is reserved for content classes that should be preserved exactly by release.

Not all content should be versioned. In particular, captain’s-log content is historical narrative and should remain chronological rather than being duplicated into every release snapshot.

## Rule 7 — Internal access control is an infrastructure responsibility

The internal site is a static documentation site. Its protection does not come from Docusaurus itself; it comes from the deployment boundary around the built site.

This means the documentation tooling prepares the internal site for deployment, but actual access control belongs to infrastructure and operations.

# Allowed Values / Variants

The documentation tooling relies on a bounded taxonomy.

## Audience values

Allowed values:

- `users`
- `architects`
- `engineers`
- `maintainers`

These identify the primary readers of a document. A document may target more than one audience.

## Domain values

Allowed values:

- `identity-access`
- `membership`
- `governance`
- `legislative`
- `records-registry`
- `publication`
- `notifications`
- `search`
- `analytics`
- `platform`
- `cross-cutting`

These classify what part of the project the document belongs to.

## Phase values

Allowed values:

- `ideation`
- `discovery`
- `planning`
- `architecture`
- `implementation`
- `testing`
- `deployment`
- `operations`
- `retrospective`

These indicate the lifecycle phase the document belongs to most strongly.

## Document type values

Allowed values:

- `reference`
- `tutorial`
- `guide`
- `runbook`
- `adr`
- `architecture-note`
- `captain-log`
- `checklist`
- `glossary`
- `changelog`
- `specification`

These define the document’s structural and behavioral class.

## Visibility values

Allowed values:

- `public`
- `internal`

These determine where a document is eligible to be published.

## Status values

Allowed values:

- `draft`
- `active`
- `canonical`
- `deprecated`
- `archived`
- `superseded`

These indicate the maturity and authority of a document.

# Structure / Data Model / Layout

The documentation tooling system is shaped around the following repository structure:

```text
repo/
├── docs/                         # canonical authored corpus
├── apps/
│   ├── docs-public/             # public Docusaurus site
│   └── docs-internal/           # internal Docusaurus site
├── packages/
│   ├── docs-config/             # metadata contract and shared rules
│   └── docs-theme/              # shared site theme elements
└── tools/
    └── docs/                    # validation, generation, sync, deploy-prep
````

Within the canonical corpus:

```text
docs/
├── audience/
├── journal/
├── decisions/
├── reference/
├── tutorials/
├── runbooks/
├── implementation/
├── generated/
├── templates/
├── shared/
└── archive/
```

Within the tooling layer:

```text
tools/docs/src/
├── lib/
├── validate/
├── generate/
├── sync/
└── deploy/
```

This structure reflects a strict separation between:

* authored content
* policy and contracts
* automation and enforcement
* rendered site surfaces

# Core Tooling Components

## Canonical Content Layer — `docs/`

This is where human-authored content originates.

Responsibilities:

* hold the canonical authored documentation
* preserve stable content paths and document identity
* contain templates and writing conventions
* host journal entries, ADRs, tutorials, references, runbooks, and implementation docs

Non-responsibilities:

* direct site rendering
* direct deployment
* Docusaurus runtime configuration
* access control enforcement

## Shared Contract Layer — `packages/docs-config/`

This package defines the shared rules that the tooling system depends on.

Responsibilities:

* define allowed taxonomy values
* define shared front matter types
* define required-field rules
* define path-placement rules
* define publication rules
* define versioning rules
* provide reusable predicates and constants for tooling

Non-responsibilities:

* reading content from disk
* building site-local trees
* generating docs from code
* running CI workflows directly

## Tooling Execution Layer — `tools/docs/`

This is the operational brain of the documentation system.

Responsibilities:

* read canonical content
* parse and inspect front matter
* validate metadata and structure
* generate tool-owned content
* sync canonical content into site-local trees
* prepare deployment artifacts
* provide CLI entry points for local and CI workflows

Non-responsibilities:

* serve the sites directly
* render the documentation UI itself
* replace the canonical corpus

## Public Site Layer — `apps/docs-public/`

This is the public presentation surface.

Responsibilities:

* render public docs, tutorials, reference content, and selected public journal content
* expose public routes, navigation, and search
* hold site-local generated docs and blog trees for Docusaurus consumption
* preserve public docs versions when versioning is cut

Non-responsibilities:

* canonical authorship
* internal-only content storage
* source-of-truth metadata definition

## Internal Site Layer — `apps/docs-internal/`

This is the internal presentation surface.

Responsibilities:

* render internal docs, maintainers’ docs, runbooks, internal architecture notes, pre-code artifacts, and internal journal entries
* preserve internal docs versions when versioning is cut
* serve as the deployable internal documentation artifact

Non-responsibilities:

* canonical authorship
* infrastructure-level access control
* redefining the metadata contract independently of shared policy

## Deployment Preparation Layer

This layer prepares static build outputs for hosting and separates public and internal deployment outputs.

Responsibilities:

* package or stage built outputs
* organize artifacts for deployment pipelines
* support public and internal hosting preparation
* enforce or document expected deployment boundaries

Non-responsibilities:

* become the identity provider
* become the runtime authorization engine
* override publication visibility rules retroactively

# Workflow Overview

The documentation tooling system follows a staged workflow.

## Stage 1 — Authoring

A contributor writes or updates documentation in root `docs/`.

Examples:

* add a new ADR
* update a reference doc
* write a runbook
* add a captain’s-log entry
* update a tutorial

## Stage 2 — Validation

The validation layer checks that authored content is valid.

Typical checks include:

* front matter parsing
* required fields
* allowed taxonomy values
* path-placement consistency
* publication-boundary correctness
* slug uniqueness
* canonical ID uniqueness
* required headings for certain document classes
* asset and link validity

If validation fails, the workflow stops.

## Stage 3 — Generation

The generation layer produces or refreshes tool-owned content.

Examples:

* OpenAPI inventories or generated references
* schema inventories or generated references
* changelog source inventories
* taxonomy indexes
* generated landing docs or metadata artifacts

Generated outputs are not treated as canonical human-authored content.

## Stage 4 — Sync

The sync layer filters and routes canonical content into the public and internal site-local trees.

Examples:

* public docs into `apps/docs-public/docs/`
* internal docs into `apps/docs-internal/docs/`
* public journal entries into `apps/docs-public/blog/`
* internal journal entries into `apps/docs-internal/blog/`
* shared tag and author registries into site-local locations
* category metadata and generated index pages into site-local locations

## Stage 5 — Build

Each Docusaurus site builds its static output independently.

This produces deployable static site artifacts for:

* the public docs portal
* the internal docs portal

## Stage 6 — Versioning

When a release warrants it, eligible documentation content is preserved as a version snapshot.

This affects site-local versioning artifacts in the Docusaurus apps, not the root canonical corpus itself.

## Stage 7 — Deployment Preparation

The system prepares the built site artifacts for deployment.

At this stage, public and internal site artifacts are ready for their respective hosting paths.

# Interfaces and Contracts

## Contract — Canonical Authored Document

Producer:

* contributor authoring in root `docs/`

Consumer:

* validation tooling
* generation tooling where relevant
* sync tooling

Required characteristics:

* valid front matter
* valid taxonomy values
* unique `canonicalId`
* acceptable `slug`
* correct placement for document type
* allowed publication visibility
* required structural headings for the document class where applicable

Failure mode if violated:

* validation fails and the document does not progress into sync or build

## Contract — Shared Metadata Contract

Producer:

* `packages/docs-config/`

Consumer:

* all validators
* all generators
* all sync scripts
* any future tooling that reasons over docs structure

Required characteristics:

* single source of truth for allowed values and rules
* stable exports usable across the docs-tooling package

Failure mode if violated:

* rule drift between scripts
* inconsistent validation
* confusing contributor experience

## Contract — Public Sync Output

Producer:

* sync tooling

Consumer:

* `apps/docs-public/`
* public site build and deployment workflows

Required characteristics:

* only eligible public content
* correct routing into docs/blog/static trees
* correct supporting metadata artifacts such as tags, authors, category files, and indexes

Failure mode if violated:

* wrong content appears publicly
* public site build breaks
* route or navigation inconsistencies appear

## Contract — Internal Sync Output

Producer:

* sync tooling

Consumer:

* `apps/docs-internal/`
* internal site build and deployment workflows

Required characteristics:

* internal and public-eligible content routed correctly
* internal-only content preserved
* internal navigation and support artifacts generated correctly

Failure mode if violated:

* missing internal docs
* wrong route structure
* maintainer or engineer-facing content becomes incomplete

## Contract — Generated Content Provenance

Producer:

* generation tooling

Consumer:

* contributors, maintainers, sync tooling, site builds

Required characteristics:

* generated origin is clear
* ownership is tool-owned
* generation is deterministic where possible
* generated content is not mistaken for handwritten canonical source

Failure mode if violated:

* contributor confusion
* stale generated docs
* CI churn from non-deterministic outputs

# Examples

## Example 1 — Standard authoring path

An engineer writes:

* `docs/reference/frontmatter-contract-reference.md`

The workflow is:

1. the file is authored in root `docs/`
2. validation confirms the metadata and structure are valid
3. sync routes it into the appropriate site-local docs tree
4. the internal site build includes it in the reference section
5. if eligible and part of a release cut, it becomes part of a version snapshot later

This is correct because authorship remains canonical and rendered outputs remain derived.

## Example 2 — Public journal path

A contributor writes:

* `docs/journal/public/2026-04-10-how-we-version-documentation-by-release.mdx`

The workflow is:

1. validation confirms it is a valid `captain-log`
2. sync routes it into `apps/docs-public/blog/`
3. the public site renders it as a blog/journal entry
4. it remains historical and is not cut into every version snapshot

This is correct because captain’s-log content is narrative and chronological, not release-frozen canonical reference material.

## Example 3 — Internal runbook path

A maintainer writes:

* `docs/runbooks/add-new-release-version-runbook.md`

The workflow is:

1. validation confirms it is a runbook in the correct location
2. sync routes it into the internal site docs tree
3. the internal site build exposes it to internal readers
4. it remains internal and non-public

This is correct because operational procedures belong in the internal documentation surface.

# Non-Examples / Invalid Cases

## Invalid Example 1 — Editing site-local docs directly

A contributor edits:

* `apps/docs-public/docs/reference/frontmatter-contract-reference.md`

This is invalid because the site-local docs tree is a generated sync target, not a canonical authoring surface. The change is likely to be lost the next time sync runs.

Correct approach:

* edit the corresponding canonical doc in root `docs/`

## Invalid Example 2 — Public document with internal-only content

A document is marked:

```yaml
visibility: public
```

but includes internal infrastructure details, auth boundary specifics, or internal hostnames.

This is invalid because publication visibility and actual content safety must align.

Correct approach:

* either change `visibility` to `internal`
* or remove internal-only content and split the sensitive detail into an internal companion doc

## Invalid Example 3 — Treating generated content as canonical

A contributor hand-edits a file under:

* `docs/generated/`
* or a synced generated inventory in a site-local tree

This is invalid if that file is defined as tool-owned.

Correct approach:

* update the generator or the source-of-truth input that feeds the generated output

# Constraints

The documentation tooling system operates under the following constraints:

* the public and internal documentation sites are static-site builds
* the internal site must be protected outside the static-site runtime
* the same repository hosts both the product code and the documentation system
* documentation must remain Git-native and reviewable
* public and internal publication boundaries must be explicit and enforceable
* exact release snapshots must be preserved for eligible content
* generated output must not become a second, drifting source of truth
* the system must remain usable by a solo primary writer while still scaling to additional contributors later

These constraints shape the design choices throughout the tooling system.

# Operational Implications

In day-to-day practice, this tooling model means:

* contributors author only in root `docs/`
* contributors should use templates and follow required document-class structure
* maintainers rely on validation as a hard gate
* sync must be run to materialize current public/internal site-local content
* Docusaurus apps are build and presentation layers, not canonical authoring layers
* generated outputs are disposable and rebuildable
* internal docs security must be handled in deployment infrastructure
* release versioning must be done intentionally and only for eligible content

This system favors clarity and discipline over ad hoc convenience.

# Common Mistakes

Common mistakes include:

* authoring inside site-local Docusaurus trees instead of root `docs/`
* using taxonomy values not defined by the shared contract
* putting a captain’s-log entry outside `docs/journal/`
* marking internal operational content as public
* assuming all content should be versioned
* hand-editing generated outputs instead of fixing the generator or source input
* skipping validation and trying to debug issues only at Docusaurus build time
* assuming internal access control is handled by the site generator rather than deployment infrastructure

# Validation and Enforcement

The system is enforced through a combination of tooling, CI, and project discipline.

Automatically enforced:

* metadata validation
* taxonomy validation
* path-placement validation
* visibility and publication rules
* versioning eligibility rules
* required-section checks for certain doc types
* sync routing
* deterministic sync and generation checks where implemented
* Docusaurus build failures for broken routes or bad content

Manually reviewed:

* prose quality
* clarity of descriptions
* whether public content is appropriate for publication
* whether new docs reflect the intended architecture and conventions

Planned or evolving enforcement:

* deeper generated-doc provenance rules
* stronger search/index quality checks
* more sophisticated deployment-preparation verification

# Exceptions

The main permitted exceptions are narrowly scoped.

Examples of allowed exceptions include:

* temporary scaffolding docs written to establish the system itself
* generator-produced inventories that are machine-authored rather than human-authored
* transitional compatibility files during tooling migration, if explicitly documented

No exception should create a second long-term source of truth for authored documentation.

# Change Management

Changes to the tooling system should be managed deliberately.

In general:

1. update or create the relevant ADR if the change is architectural
2. update the specific reference or implementation doc that defines the behavior
3. update `packages/docs-config/` if the contract changes
4. update `tools/docs/` if validation, generation, or sync behavior changes
5. update templates if author expectations changed
6. update runbooks or tutorials if operator behavior changed
7. verify the changes through validation, sync, and site builds

This document should be updated whenever the system-level understanding of the tooling changes materially.

# Related Documents

* `docs/reference/document-taxonomy-reference.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/reference/linking-and-cross-reference-conventions.md`
* `docs/implementation/docs-authoring-workflow.md`
* `docs/implementation/docs-validation-and-sync-workflow.md`
* `docs/implementation/docs-release-workflow.md`
* `docs/decisions/adr/adr-0001-two-doc-sites-one-canonical-corpus.md`
* `docs/decisions/adr/adr-0004-public-internal-publication-boundary.md`

# Revision Notes

* Initial version established the documentation tooling system overview for the greenfield docs platform.
* Future revisions should update this document whenever the major tooling stages, boundaries, or responsibilities change.

# Suggested Commit Message

```text
docs(reference): add documentation tooling overview
```
---
title: "Linking and Cross-Reference Conventions"
description: "Authoritative reference for how documents should link to each other, reference related materials, use repo-relative paths, and preserve navigability across the canonical docs corpus and rendered sites."
slug: "/reference/linking-and-cross-reference-conventions"
canonicalId: "reference-linking-and-cross-reference-conventions"
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
  - linking
  - conventions
sidebar_position: 6
---

# Purpose

This document defines the canonical conventions for linking and cross-referencing within the documentation system.

Its purpose is to make documentation relationships explicit, durable, and navigable by establishing consistent rules for:

- linking between canonical docs
- linking between related public and internal docs
- linking to ADRs, runbooks, tutorials, references, and journal entries
- referencing repository files and directories
- choosing between route-oriented links and repo-relative path references
- avoiding broken, ambiguous, or misleading links
- preserving clarity when documents move, split, or are superseded

These conventions exist because a large documentation system fails quickly when links are inconsistent. Readers lose context, related materials become hard to find, and maintenance costs rise because authors invent their own patterns for pointing to adjacent information.

# Scope

This document covers linking and cross-reference behavior for the canonical documentation corpus.

It defines conventions for:

- inline links
- “Related Documents” sections
- repo-relative path references
- route-oriented document links
- references to directories, files, commands, scripts, and configuration
- references between public and internal companion documents
- references to superseded or deprecated materials
- references to generated documentation areas
- references to journal entries and ADRs

It does **not** define:

- the full front matter contract
- the site navigation/sidebar configuration model
- the publication policy itself
- the complete style guide for prose
- search implementation details
- deployment URL strategy beyond what affects link choice

Those are covered in separate documents.

# Status and Authority

This document is the canonical reference for linking and cross-reference conventions in the documentation system.

It is normative for:

- authors creating or updating canonical documents
- reviewers checking documentation quality
- engineers implementing validation around internal links and asset references
- maintainers governing long-term documentation coherence

If templates, examples, or contributor habits diverge from this document, they should be corrected.

If an accepted ADR or architectural constraint changes how links must behave, this document must be updated accordingly.

# Audience

This document is primarily for:

- **engineers**, who author and maintain documents and may implement link validation
- **architects**, who need to understand how the documentation graph is intended to behave
- **maintainers**, who need durable documentation relationships across releases and operational materials

It is also useful to contributors who want to write documentation that stays navigable over time.

# Definitions

## Inline Link

A clickable link embedded directly in the prose of a document.

## Cross-Reference

A deliberate reference from one document to another related document, directory, generated area, or repository artifact.

## Repo-Relative Path Reference

A non-click or link-like reference written as a repository path, such as:

- `docs/reference/frontmatter-contract-reference.md`
- `tools/docs/src/validate/validate-frontmatter.ts`

## Route-Oriented Link

A rendered-site link that points to the destination document by route or doc link rather than by raw repository path.

## Related Documents Section

A dedicated section near the end of a document listing the most relevant companion docs.

## Companion Document

A separate document that covers the same broad subject from a different audience, publication, or detail level.

## Public Companion

A public-safe version of a subject that also has a more detailed internal counterpart.

## Superseding Document

A newer document intended to replace an older one as the primary source of truth.

## Orphaned Document

A document with little or no meaningful connection to the rest of the docs graph, making it hard for readers to discover or contextualize.

# Subject Overview

A strong documentation system is not just a tree of files. It is also a graph of relationships.

Readers often arrive in one of three ways:

- through navigation
- through search
- through a direct link

Once a reader lands on a document, they need clear pathways to:

- the documents that define prerequisites
- the documents that provide adjacent detail
- the documents that operationalize the current topic
- the documents that supersede, complement, or constrain it

The linking model should therefore optimize for:

- clarity
- stability
- maintainability
- reader orientation
- explicitness of related material

The conventions in this document are designed to make those relationships durable without turning every document into an over-linked cluttered mesh.

# Canonical Rules / Contracts / Interfaces

## Rule 1 — Every canonical document should be meaningfully connected to the docs graph

No important canonical document should stand alone without context.

At minimum, a canonical document should usually connect to:

- the document that defines its governing rule, if one exists
- the document types immediately adjacent to it in workflow
- the most relevant related materials in its `Related Documents` section

Examples:
- a runbook should usually link to the reference or implementation doc that explains the system it operates
- an ADR should usually link to related architecture notes and follow-up implementation docs
- a tutorial should usually link to prerequisite references and next-step runbooks or guides

This rule exists to prevent orphaned content.

## Rule 2 — Use the link form that best serves the reader’s context

Not every reference should be a rendered route link.

Use:

- **repo-relative path references** when the point is to identify a file or directory in the repository as a source artifact
- **document links** when the point is to send the reader to another documentation page as reading material

Examples:
- “Update `packages/docs-config/src/taxonomy.ts`” should use a repo-relative path reference
- “See the [Front Matter Contract Reference](...)” should use a document link

Do not collapse these two use cases into one generic pattern.

## Rule 3 — Prefer durable semantic references over vague prose mentions

Bad:
- “See the other doc.”
- “Look at the architecture file.”
- “Check the versioning page.”

Good:
- “See `docs/reference/versioning-policy-reference.md`.”
- “See the Versioning Policy Reference.”
- “See `docs/decisions/adr/adr-0003-selective-versioning-policy.md`.”

A reader should never have to guess which document is being referenced.

## Rule 4 — Related links should be curated, not exhaustive

A `Related Documents` section should contain the most relevant companion materials, not every document vaguely connected to the topic.

Too many links reduce usefulness and create noise.

A good `Related Documents` section usually lists:
- the immediately governing ADR, if any
- one to three adjacent reference or implementation docs
- one operational or tutorial companion where helpful
- a superseding or superseded doc where relevant

## Rule 5 — Cross-reference based on reader need, not author memory

When deciding whether to add a link, ask:

- what would a reasonable reader need next?
- what document defines the prerequisite context?
- what document turns this theory into action?
- what document records the decision behind this rule?
- what document replaces or extends this one?

Do not add links merely because the author remembers another document exists.

## Rule 6 — Public documents must not link readers into internal-only dead ends

A public document must not send a public reader to an internal-only route as if it were part of the public reading path.

If a public doc needs to acknowledge deeper internal material, it should do so carefully and usually by:
- omitting the internal link
- referring generically to internal implementation material without linking
- linking only to a public-safe companion

Public linking should preserve public reader continuity.

## Rule 7 — Internal documents may link to public documents freely where useful

Internal readers can benefit from public-facing materials as part of the broader graph.

Internal documents may link to:
- public tutorials
- public guides
- public architecture overviews
- public journal entries

This is often useful when internal docs want to reference the public-facing explanation of a system.

## Rule 8 — Supersession and deprecation must be linked explicitly

When a document is superseded, deprecated, or replaced, it should link clearly to its successor where applicable.

Similarly, the successor should usually link back to the prior document when historical context is useful.

This prevents readers from getting trapped in obsolete content without an escape route.

# Link Types and When to Use Them

## Type 1 — Document-content link

Use when you want the reader to open another documentation page as part of the reading flow.

Examples:
- a reference doc linking to an ADR
- a tutorial linking to a prerequisite reference
- a runbook linking to an implementation overview

Preferred use:
- prose references
- prerequisite sections
- next-step sections
- related-doc sections

## Type 2 — Repo-relative path reference

Use when you want to identify a concrete file or directory in the repository as an artifact, source input, code location, or implementation target.

Examples:
- `docs/reference/frontmatter-contract-reference.md`
- `tools/docs/src/sync/build-public-docs.ts`
- `apps/docs-public/docusaurus.config.ts`

Preferred use:
- implementation docs
- captain’s-log entries
- code-adjacent references
- operational procedures
- “Files Created or Changed” lists
- source-of-truth explainer docs

When in prose, repo-relative paths should usually be rendered as inline code.

## Type 3 — Companion-document reference

Use when a public-safe and internal-detailed pair both exist.

Examples:
- public architecture overview ↔ internal architecture note
- public journal summary ↔ internal engineering journal entry
- public guide ↔ internal runbook

Preferred use:
- `Related Documents`
- “See also”
- explicit companion sections

## Type 4 — Supersession reference

Use when a document has been replaced or partially replaced.

Examples:
- deprecated guide linking to current guide
- superseded ADR linking to superseding ADR
- old reference linking to updated reference

Preferred use:
- near the top of the deprecated or superseded doc
- in `Related Documents`
- in status or revision notes where helpful

# Route Links vs Repo Paths

## Use route/document links when

- the reader is expected to read the linked doc as documentation
- the current document is part of a rendered site context
- the link supports reading flow or user navigation
- the exact repository file path is not the main point

Examples:
- linking from one reference doc to another
- linking from a tutorial to a runbook
- linking from an ADR to a companion architecture note

## Use repo-relative path references when

- the exact file path matters
- the reader may need to edit, inspect, or locate a repository artifact
- the document is describing tooling internals or implementation files
- the document is reporting changes or operational actions

Examples:
- a captain’s-log entry listing modified files
- an implementation doc pointing to a validator script
- a runbook naming a config file to edit

## Use both when useful

Sometimes both are appropriate:

- mention the repo path as the implementation artifact
- and also link the rendered reference doc as reader-facing explanation

Example pattern:
- “The shared rules are implemented in `packages/docs-config/src/taxonomy.ts`. For the conceptual model, see the Document Taxonomy Reference.”

# Required Linking Practices by Document Type

## Reference documents

Reference documents should usually link to:

- governing ADRs
- companion implementation docs
- relevant tutorials or runbooks where action follows theory
- adjacent references that define closely related concepts

They should avoid over-linking to every tangentially related document.

## Tutorials

Tutorials should usually link to:

- prerequisites
- reference docs that define key concepts
- runbooks or guides that represent next steps
- troubleshooting or implementation docs where deeper explanation is needed

A tutorial should help the reader continue productively after completion.

## Runbooks

Runbooks should usually link to:

- the reference or implementation doc that explains the operated system
- related deployment, recovery, or validation docs
- companion tutorials if there is a learning-mode counterpart
- relevant ADRs if operational constraints come from a design decision

Runbooks should prioritize actionable adjacent materials.

## ADRs

ADRs should usually link to:

- prior related ADRs
- superseding ADRs when applicable
- the architecture note or reference doc that explains the chosen design in more detail
- follow-up implementation docs where adoption is described

## Architecture notes

Architecture notes should usually link to:

- governing ADRs
- references that define core rules
- implementation docs that realize the design
- companion public-safe overviews if one exists

## Captain’s-log entries

Captain’s-log entries should usually link to:

- the files or docs changed during the session
- the ADRs or references that shaped the work
- the next intended follow-up document or operational step
- prior journal entries when continuity matters

Captain’s-log entries should preserve the engineering trail, not just narrate events abstractly.

# Related Documents Section Conventions

Every substantial canonical document should usually end with a `Related Documents` section.

That section should:

- list the most relevant adjacent materials
- prefer quality over quantity
- use repo-relative document references where appropriate
- remain current as the document evolves

A good `Related Documents` section usually contains between 3 and 8 entries.

## Good `Related Documents` example

- `docs/decisions/adr/adr-0003-selective-versioning-policy.md`
- `docs/reference/frontmatter-contract-reference.md`
- `docs/implementation/docs-release-workflow.md`
- `docs/runbooks/add-new-release-version-runbook.md`

## Bad `Related Documents` example

- every doc in the same directory
- every doc sharing the same tag
- vague phrases like “other docs in this section”

# Public/Internal Companion Conventions

When a subject has both a public-safe explanation and an internal-detailed explanation:

- the public doc should remain self-sufficient for its public purpose
- the internal doc may reference the public doc directly
- the public doc should not depend on the internal doc for safe understanding
- both docs should acknowledge the relationship where useful

Recommended pattern:

## In the internal doc

State:
- this document provides internal implementation or operational detail
- for a public-safe overview, see the public companion

## In the public doc

State only what is helpful and public-safe, for example:
- “A more detailed internal implementation document exists for authorized contributors.”

Do not expose internal routes or internal-only filenames to public readers unless there is a specific and safe reason.

# Supersession and Deprecation Conventions

When a document is superseded:

- change its status metadata appropriately
- add an explicit note near the top pointing to the successor
- include the successor in `Related Documents`
- update nearby docs that still point to the old doc, where feasible

Recommended pattern near the top of a superseded doc:

```md
> This document has been superseded by `docs/reference/new-document.md`.
> Consult the newer document for current guidance.
````

When a document is deprecated but still informative:

* say what should be used instead, if applicable
* clarify whether the old document remains historically valuable
* avoid leaving the reader without a clear next step

# Linking to Generated Content

Generated content should be linked carefully.

Use generated content links when:

* the generated output is meant for direct reader consumption
* the generated page is part of a stable rendered docs area
* the reader needs the generated artifact itself, not the generator source

Use source-of-truth explainer references when:

* the reader needs to understand where generated docs come from
* the reader needs to modify generation behavior
* the reader needs the authoritative explanation rather than the generated inventory

Recommended pattern:

* link to the generated page for consumption
* reference the source-of-truth explainer for maintenance or architectural context

# Linking to Files, Directories, Commands, and Config

## Files and directories

Use inline code for repo-relative paths:

* `tools/docs/src/validate/validate-frontmatter.ts`
* `apps/docs-internal/docusaurus.config.ts`

Use this style when the path itself matters.

## Commands

Use fenced code blocks for multi-step command sequences and inline code for short command mentions.

Example inline:

* Run `pnpm docs:validate` before syncing.

Example block:

```bash
pnpm docs:validate
pnpm docs:sync
pnpm --filter docs-public build
```

## Configuration keys

Use inline code for config keys and metadata fields:

* `visibility`
* `publish`
* `canonicalId`
* `routeBasePath`

This keeps technical references unambiguous.

# Structure / Data Model / Layout

A healthy document usually contains links in four places:

1. **inline conceptual links**
   for prerequisites or adjacent concepts

2. **implementation artifact references**
   for files, scripts, and directories

3. **end-of-document related links**
   for curated next reading

4. **status or supersession notes**
   for obsolete or replaced material

A typical pattern looks like:

* prose introduces the concept
* inline link points to the governing reference or ADR
* implementation section references concrete repo files
* `Related Documents` section provides the next most relevant docs

# Examples

## Example 1 — Reference doc linking correctly

A reference doc says:

* “See the Document Taxonomy Reference for the controlled vocabulary model.”
* “The shared taxonomy values are implemented in `packages/docs-config/src/taxonomy.ts`.”

Why this is good:

* the conceptual doc is linked as documentation
* the implementation artifact is referenced by path
* the two references serve distinct purposes

## Example 2 — Tutorial linking correctly

A tutorial says:

* “Before continuing, read the Front Matter Contract Reference.”
* “After completing this tutorial, use the Rebuild Documentation Sites Runbook to verify the full build path.”

Why this is good:

* it provides prerequisite and next-step flow
* it helps the reader move through the documentation graph intentionally

## Example 3 — ADR cross-reference pattern

An ADR includes:

* the related architecture note
* the prior ADR it builds on
* the implementation doc describing adoption work

Why this is good:

* the decision record is connected to rationale, context, and execution

## Example 4 — Captain’s-log entry linking correctly

A journal entry includes:

* changed file paths such as `tools/docs/src/sync/build-public-docs.ts`
* the ADR that justified the work
* the next implementation doc to be authored or updated

Why this is good:

* it preserves both the engineering trace and the conceptual context

# Non-Examples / Invalid Cases

## Invalid Example 1 — Vague reference

* “See the docs on versioning.”

Why invalid:

* the target is ambiguous
* the reader cannot reliably locate the intended document

## Invalid Example 2 — Public doc linking to internal-only destination

A public guide says:

* “For the exact internal auth implementation, see `/docs/internal-auth-boundary-reference`.”

Why invalid:

* it sends the public reader toward an unavailable or inappropriate internal destination
* it weakens the public reading experience

## Invalid Example 3 — Only raw file paths when conceptual reading is needed

A reference doc says:

* “See `docs/reference/frontmatter-contract-reference.md`”
  but gives no document-style contextual link or explanation in a rendered reading context.

Why weak:

* a repo path alone may be fine in some contexts, but it is not always the best reader-oriented presentation if the document itself is the intended reading destination

## Invalid Example 4 — Link dumping in `Related Documents`

A document lists 20 vaguely related docs.

Why invalid in practice:

* the section becomes noise
* the reader is not helped to identify the most relevant next materials

# Constraints

The linking model is shaped by several constraints:

* the documentation system has both canonical repo content and rendered site content
* some readers consume docs in the site, others in the repo
* public and internal publication boundaries differ
* site-local rendered trees are generated and disposable
* documents may be versioned, superseded, or moved over time
* authors need conventions simple enough to apply consistently
* links must remain maintainable as the corpus grows

These constraints require a disciplined but practical linking strategy.

# Operational Implications

In practice, these conventions mean:

* authors must think about reader navigation, not only page-local content
* reviewers should check whether a document is meaningfully connected to adjacent materials
* maintainers should update cross-references when documents are replaced or reorganized
* validation can and should catch some classes of broken links or internal/public boundary mistakes
* the documentation graph becomes part of the system architecture, not an accidental byproduct

# Common Mistakes

Common mistakes include:

* using vague document references instead of naming the actual target
* referencing files when a reader really needs the rendered concept doc
* linking public docs into internal-only paths
* forgetting to update cross-references after renames or supersession
* treating `Related Documents` as a dumping ground
* failing to link a new document back into the existing graph
* omitting file paths in implementation-heavy docs where the exact artifact matters

# Validation and Enforcement

These conventions should be enforced through a combination of tooling and review.

Tooling can enforce or assist with:

* broken internal link detection
* missing asset detection
* public docs linking to clearly internal-only assets or routes
* route collision detection
* consistency checks for known link patterns where feasible

Human review should enforce:

* link usefulness
* adequacy of `Related Documents`
* whether public/internal companion relationships are clear
* whether supersession links are present
* whether the chosen link form matches reader need

Not every linking quality issue can be solved by automation, so editorial discipline remains important.

# Exceptions

There are limited cases where a document may intentionally contain fewer links than normal.

Examples:

* a very small glossary entry
* a narrow checklist with only one valid companion doc
* a temporary draft not yet fully integrated, provided it is not treated as finished canonical material

These exceptions should be narrow and should not become the norm for significant documents.

# Change Management

Changes to linking conventions affect:

* authoring style
* contributor workflow
* validation expectations
* public/internal reader experience
* maintainability of the docs graph

The normal change path should be:

1. identify the linking problem or ambiguity
2. determine whether the issue is editorial, procedural, or architectural
3. update or add an ADR if the change is structural
4. update this reference
5. update templates or contributor guidance if necessary
6. update validation tooling if enforcement behavior changes
7. review high-value documents for consistency

# Related Documents

* `docs/reference/docs-tooling-overview.md`
* `docs/reference/document-taxonomy-reference.md`
* `docs/reference/frontmatter-contract-reference.md`
* `docs/reference/publication-rules-reference.md`
* `docs/reference/versioning-policy-reference.md`
* `docs/implementation/docs-authoring-workflow.md`
* `docs/implementation/docs-validation-and-sync-workflow.md`
* `docs/decisions/adr/adr-0006-canonical-id-and-slug-policy.md`

# Revision Notes

* Initial version established the canonical linking and cross-reference conventions for the documentation system.
* Future revisions should be coordinated with validation behavior, templates, and contributor guidance.

# Suggested Commit Message

```text
docs(reference): add linking and cross-reference conventions
```
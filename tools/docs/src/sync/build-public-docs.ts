// TODO
### `build-public-docs.ts`

Algorithm:

1. Delete `apps/docs-public/docs`
2. Delete `apps/docs-public/blog`
3. Recreate directories
4. Read canonical files under root `docs/`
5. Parse frontmatter
6. Filter to `visibility: public && publish: true`
7. Route docs into target folders by mapping rules
8. Route public journal entries to `apps/docs-public/blog`
9. Copy shared static assets
10. Generate index docs
11. Generate `_category_.yml` files if missing
12. Fail if required public index docs are absent

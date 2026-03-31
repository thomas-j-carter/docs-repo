// TODO
### `build-internal-docs.ts`

Algorithm:

1. Delete `apps/docs-internal/docs`
2. Delete `apps/docs-internal/blog`
3. Recreate directories
4. Read canonical files
5. Parse frontmatter
6. Filter to `publish: true`
7. Route public + internal docs into target folders
8. Route internal journal to `apps/docs-internal/blog`
9. Copy shared static assets
10. Generate internal index docs
11. Fail if required internal index docs are absent
---
"@voyantjs/cloud-sdk": minor
---

Add `createSearchClientConfig` for the Voyant search proxy. The helper
returns a configuration object that you pass directly to the official
`typesense` client — no hand-rolled search surface to learn, no
prefix-stamping or auth-header wiring on your side.

```ts
import { Client } from "typesense";
import { createSearchClientConfig } from "@voyantjs/cloud-sdk";

const search = new Client(
  createSearchClientConfig({
    apiKey: process.env.VOYANT_API_KEY!,
    organizationSlug: "acme",
    projectName: "catalog",
  }),
);
```

`apiKey` is your Voyant API token (`search:read` for queries,
`search:write` for writes). The proxy auths with `Authorization: Bearer
...`, substitutes the project's scoped Typesense key downstream, and
rewrites collection names so isolation prefixes never leak into your
code.

`typesense` is declared as an optional peer dependency — install it
alongside `@voyantjs/cloud-sdk` if you use search.

Adds the `SearchClientConfig` and `SearchClientConfigOptions` types to
the public type surface.

---
"@voyantjs/cloud-sdk": minor
---

Add an env-bindings adapter so consumers stop hand-rolling the same env-read +
empty-string + typed-error logic to construct a `VoyantCloudClient`. Reads
`VOYANT_CLOUD_API_KEY`, `VOYANT_CLOUD_API_URL`, and `VOYANT_CLOUD_USER_AGENT`
from a Cloudflare Worker `env`, Node `process.env`, or any other key/value
bag of strings.

```ts
import { getVoyantCloudClient } from "@voyantjs/cloud-sdk";

// Cloudflare Worker
export default {
  async fetch(_req: Request, env: VoyantCloudEnv) {
    const cloud = getVoyantCloudClient(env);
    return Response.json(await cloud.vault.listVaults());
  },
};

// Node
const cloud = getVoyantCloudClient(process.env);
```

- `getVoyantCloudClient(env, overrides?)` throws `VoyantCloudConfigError`
  when no API key can be resolved.
- `tryGetVoyantCloudClient(env, overrides?)` returns `null` instead, for
  paths that legitimately operate without cloud (e.g. local dev tooling
  that doesn't send mail).
- `overrides` take precedence over env values, except an empty-string
  override is treated as missing — it can't silently clobber a valid env
  value.
- Empty-string env values are treated the same as `undefined`, common
  when `.env` files leave a key blank.

Adds `VoyantCloudEnv` and `VoyantCloudConfigError` to the public type
surface.

---
"@voyantjs/cloud-sdk": minor
"@voyant-sdk/sdk-core": minor
---

Add `browser` group to `@voyantjs/cloud-sdk`, exposing Cloudflare Browser
Rendering through Voyant: `content`, `markdown`, `snapshot`, `scrape`,
`links`, `json`, `screenshot` and `pdf` render helpers; `browser.crawls.*`
for long-running crawl jobs; and `browser.sessions.*` for keep-alive
Puppeteer sessions with a typed command schema.

`@voyant-sdk/sdk-core` adds a `responseType` option to `VoyantRequestOptions`
(`"json" | "text" | "binary"`) so the transport can return raw text or a
`Uint8Array` for binary endpoints (used by `screenshot`/`pdf`).

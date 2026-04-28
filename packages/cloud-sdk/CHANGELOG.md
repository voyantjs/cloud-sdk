# @voyantjs/cloud-sdk

## 0.4.0

### Minor Changes

- a86c5de: Add `video` group to `@voyantjs/cloud-sdk`. The new surface covers video
  uploads (`videos.createUpload`, `videos.createFromUrl`), playback and
  lifecycle (`videos.list`, `videos.get`, `videos.update`, `videos.delete`,
  `videos.enableDownload`, `videos.mintToken`), captions
  (`videos.captions.{list, upload, generate, delete}`), and watermark
  profiles (`watermarks.{list, create, delete}`).

## 0.3.0

### Minor Changes

- 1e5b76e: Add `browser` group to `@voyantjs/cloud-sdk`, exposing Cloudflare Browser
  Rendering through Voyant: `content`, `markdown`, `snapshot`, `scrape`,
  `links`, `json`, `screenshot` and `pdf` render helpers; `browser.crawls.*`
  for long-running crawl jobs; and `browser.sessions.*` for keep-alive
  Puppeteer sessions with a typed command schema.

  `@voyant-sdk/sdk-core` adds a `responseType` option to `VoyantRequestOptions`
  (`"json" | "text" | "binary"`) so the transport can return raw text or a
  `Uint8Array` for binary endpoints (used by `screenshot`/`pdf`).

### Patch Changes

- Updated dependencies [1e5b76e]
  - @voyant-sdk/sdk-core@0.2.0

## 0.2.0

### Minor Changes

- d61f7c9: Email surface updates:
  - add `attachments` to `SendEmailInput` and export new `SendEmailAttachment` type for sending file attachments (base64 `content` or remote `path`, with optional `contentType` and `contentId` for inline images)
  - rename `EmailMessageSummary.resendEmailId` to `providerEmailId` to reflect that the field carries the upstream provider's message id rather than a Resend-specific value

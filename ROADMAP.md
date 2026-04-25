# Roadmap

This repo now has working public package surfaces, release scaffolding, CI,
API parity checks, and packed-artifact verification. The remaining work before
the first public release should stay focused on contract generation and final
consumer polish.

## Before first publish

- generate or export contract artifacts from `voyant-cloud` instead of relying
  on hand-mirrored SDK types
- add package-level examples that match real auth and endpoint behavior
- deepen package tests beyond the current smoke coverage
- decide versioning policy for prerelease versus stable releases

## Cloud SDK follow-up

- decide whether `SearchProtocol` should stay constrained to `"http" | "https"`
  or remain a looser transport field
- decide whether `providerStatus` on email messages is intentionally vendor
  passthrough and should stay `string | null`
- confirm whether `vault` should stay on the root client or move behind a more
  explicit namespace in a later major version

## Repo follow-up

- add package README validation or snippet verification into release checks
- keep docs in Markdown here until the shared docs app is ready in `voyant`
- decide whether to keep a single bootstrap changeset or split release notes
  into more granular prerelease entries before publishing

# FAQ

## Why is there no docs app in this repo?

Because the shared docs app will live in `voyant`. This repo only needs enough
Markdown to explain the SDK packages and how they are maintained.

## Why is `sdk-core` private?

It exists to share transport behavior without making that shared layer part of
the public support surface.

## Why not import code directly from `voyant-cloud`?

Because this repo is public and the SDK should depend on public contracts, not
private application internals.

## Why do we track intentional unused public types?

Because some exported types are part of the supported SDK surface even if the
current callable client methods do not reference them directly. The allowlist
keeps those cases explicit and prevents new unused exports from accumulating
without review.

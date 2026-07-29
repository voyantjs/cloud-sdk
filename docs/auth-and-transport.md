# Auth And Transport

`@voyant-travel/cloud-sdk` is built on an internal transport layer shared with
sibling SDK packages.

## Default behavior

- default base URL: `https://api.voyant.travel`
- default auth header: `authorization`
- default auth scheme: `Bearer`
- default user agent marker: `x-voyant-sdk: voyant-sdk`

## Client options

`@voyant-travel/cloud-sdk` accepts transport-level options such as:

- `apiKey`
- `baseUrl`
- `authHeader`
- `authScheme`
- `headers`
- `fetch`
- `userAgent`

## Request behavior

- query params skip `null` and `undefined`
- arrays are serialized as repeated query params
- non-`BodyInit` objects are JSON-encoded automatically
- `content-type: application/json` is set for JSON request bodies
- `idempotencyKey` is sent as the `Idempotency-Key` header

## Idempotency

Several Cloud API writes -- email sends among them -- accept an
`Idempotency-Key` so a retried request delivers once rather than twice. Pass
`idempotencyKey` on any request to set it:

```ts
await client.email.sendMessage(message, {
  idempotencyKey: `booking-${booking.id}-confirmation`,
});
```

The key must be **stable for the logical operation**. A value generated per
attempt is indistinguishable from sending no key at all, because the retry
carries a different one.

The SDK never generates a key. A random one would only restate "do not
deduplicate" while looking like real idempotency, and deriving one from the
request body would be worse: two one-time-code emails to the same address
differ only by the code, so a body hash would turn a legitimate resend into a
silent replay of the first message. Only the caller knows what "the same
operation" means.

## Response behavior

- JSON responses are parsed automatically
- plain text that looks like JSON is parsed defensively
- `{ data: ... }` envelopes are unwrapped by default
- callers can opt out with `unwrapData: false`

## Errors

Non-2xx responses throw `VoyantApiError`, which includes:

- `status`
- `requestId`
- `body`

The request ID should be preserved in logs and support requests whenever
possible.

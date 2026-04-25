# `@voyantjs/cloud-sdk`

Public TypeScript client for Voyant Cloud APIs.

## Scope

`@voyantjs/cloud-sdk` is for hosted Voyant Cloud services:

- vault (read secrets)
- sms (send messages, list phone numbers and messages)
- verification (start verification, check codes, list recent attempts)
- email (list, send, and fetch email messages)

## Install

```sh
pnpm add @voyantjs/cloud-sdk
```

## Usage

```ts
import { createVoyantCloudClient } from "@voyantjs/cloud-sdk";

const client = createVoyantCloudClient({
  apiKey: process.env.VOYANT_API_KEY!,
});

const vaults = await client.vault.listVaults();
const phoneNumbers = await client.sms.listPhoneNumbers();
```

## Shape

Root groups:

- `vault`
- `sms`
- `verification`
- `email`

The `vault` group covers list-vaults, list-secrets, and get-secret routes.

The `sms` group covers list-phone-numbers, list-messages, and send-message
routes.

The `verification` group covers verification start, check, and list-attempts routes.

The `email` group covers list-messages, send-message, and get-message routes.

## Key public types

Useful exported types include:

- `VaultSummary`, `VaultSecretSummary`, `VaultSecretValue`
- `PhoneNumberSummary`, `SmsMessageSummary`, `SendSmsInput`
- `VerificationAttemptSummary`, `VerificationCheckResult`
- `StartVerificationInput`, `CheckVerificationInput`
- `EmailMessageSummary`, `SendEmailInput`
- `PhoneNumberStatus`, `SmsMessageStatus`, `VerificationChannel`,
  `VerificationAttemptStatus`, `EmailMessageStatus`

## Notes

- default base URL is `https://api.voyantjs.com`
- request auth defaults to `authorization: Bearer <apiKey>`
- response envelopes of the form `{ data: ... }` are unwrapped by default
- API tokens are scoped (`vault:read`, `sms:read`, `sms:send`,
  `phone-numbers:read`, `verification:start`, `verification:check`,
  `verification:read`, `emails:read`, `emails:send`); requests fail with `403`
  if the token does not include the required scope

For repo-level context, see [../../docs/cloud.md](../../docs/cloud.md).

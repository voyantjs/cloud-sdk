# Cloud SDK

`@voyantjs/cloud-sdk` is the public TypeScript client for Voyant Cloud APIs.

## Current shape

- `vault` group for listing vaults and reading secrets
- `sms` group for listing phone numbers, listing messages, and sending messages
- `verification` group for starting verification attempts, checking codes, and listing recent attempts
- `email` group for listing, sending, and fetching email messages

## Key public types

- vault: `VaultSummary`, `VaultSecretSummary`, `VaultSecretValue`
- sms: `PhoneNumberSummary`, `SmsMessageSummary`, `SendSmsInput`,
  `PhoneNumberStatus`, `SmsMessageStatus`
- verification: `VerificationAttemptSummary`, `VerificationCheckResult`,
  `StartVerificationInput`, `CheckVerificationInput`, `VerificationChannel`,
  `VerificationAttemptStatus`
- email: `EmailMessageSummary`, `SendEmailInput`, `EmailMessageStatus`

## Auth scopes

API tokens are scoped. The required scopes per group:

- `vault.*` requires `vault:read`
- `sms.listPhoneNumbers` requires `phone-numbers:read`
- `sms.listMessages` requires `sms:read`
- `sms.sendMessage` requires `sms:send`
- `verification.start` requires `verification:start`
- `verification.check` requires `verification:check`
- `verification.listAttempts` requires `verification:read`
- `email.listMessages` and `email.getMessage` require `emails:read`
- `email.sendMessage` requires `emails:send`

## Example

```ts
import { createVoyantCloudClient } from "@voyantjs/cloud-sdk";

const client = createVoyantCloudClient({
  apiKey: process.env.VOYANT_API_KEY!,
});

const vaults = await client.vault.listVaults();
const message = await client.sms.sendMessage({
  to: "+14155551234",
  body: "Hello from Voyant Cloud",
});
```

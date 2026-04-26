---
"@voyantjs/cloud-sdk": minor
---

Email surface updates:

- add `attachments` to `SendEmailInput` and export new `SendEmailAttachment` type for sending file attachments (base64 `content` or remote `path`, with optional `contentType` and `contentId` for inline images)
- rename `EmailMessageSummary.resendEmailId` to `providerEmailId` to reflect that the field carries the upstream provider's message id rather than a Resend-specific value

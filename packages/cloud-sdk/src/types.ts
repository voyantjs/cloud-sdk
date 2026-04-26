import type { VoyantTransportOptions } from "@voyant-sdk/sdk-core";

export type VoyantCloudClientOptions = VoyantTransportOptions;

export type PhoneNumberStatus = "active" | "suspended" | "released";

export type SmsMessageStatus =
  | "queued"
  | "sent"
  | "delivered"
  | "undelivered"
  | "failed";

export type VerificationChannel = "sms" | "call" | "email" | "whatsapp";

export type VerificationAttemptStatus =
  | "pending"
  | "approved"
  | "canceled"
  | "expired"
  | "failed";

export type EmailMessageStatus =
  | "queued"
  | "sent"
  | "delivered"
  | "delivery_delayed"
  | "bounced"
  | "complained"
  | "opened"
  | "clicked"
  | "failed";

export interface PhoneNumberCapabilities {
  mms?: boolean;
  sms?: boolean;
  voice?: boolean;
}

export interface VaultSummary {
  createdAt: string;
  description: string | null;
  id: string;
  name: string;
  secretCount: number;
  slug: string;
  updatedAt: string;
}

export interface VaultSecretSummary {
  createdAt: string;
  key: string;
  updatedAt: string;
  version: number;
}

export interface VaultSecretValue {
  key: string;
  updatedAt: string;
  value: string;
  version: number;
}

export interface PhoneNumberSummary {
  capabilities: PhoneNumberCapabilities;
  country: string;
  createdAt: string;
  friendlyName: string | null;
  id: string;
  isShared: boolean;
  monthlyCostCents: number | null;
  organizationId: string;
  phoneNumber: string;
  purchasedAt: string | null;
  releasedAt: string | null;
  status: PhoneNumberStatus;
  updatedAt: string;
}

export interface SmsMessageSummary {
  body: string;
  createdAt: string;
  deliveredAt: string | null;
  errorCode: string | null;
  errorMessage: string | null;
  fromNumber: string;
  id: string;
  lastEventAt: string | null;
  organizationId: string;
  priceCents: number | null;
  providerMessageSid: string | null;
  providerStatus: string | null;
  segments: number;
  sentAt: string | null;
  status: SmsMessageStatus;
  toNumber: string;
  updatedAt: string;
}

export interface SendSmsInput {
  body: string;
  from?: string | null;
  to: string;
}

export interface VerificationAttemptSummary {
  channel: VerificationChannel;
  createdAt: string;
  errorMessage: string | null;
  id: string;
  organizationId: string;
  providerStatus: string | null;
  serviceId: string;
  status: VerificationAttemptStatus;
  toValue: string;
  updatedAt: string;
  verifiedAt: string | null;
}

export interface VerificationCheckResult extends VerificationAttemptSummary {
  valid: boolean;
}

export interface StartVerificationInput {
  channel?: VerificationChannel;
  locale?: string;
  to: string;
}

export interface CheckVerificationInput {
  code: string;
  to: string;
}

export interface EmailMessageSummary {
  bccAddresses: string[];
  ccAddresses: string[];
  clickCount: number;
  createdAt: string;
  deliveredAt: string | null;
  errorMessage: string | null;
  fromAddress: string;
  id: string;
  lastEventAt: string | null;
  openCount: number;
  organizationId: string;
  providerEmailId: string | null;
  providerStatus: string | null;
  replyTo: string[];
  sentAt: string | null;
  status: EmailMessageStatus;
  subject: string;
  toAddresses: string[];
  updatedAt: string;
}

export interface SendEmailAttachment {
  /** Filename presented to the recipient. */
  filename: string;
  /** Base64-encoded file bytes. Mutually exclusive with `path`. */
  content?: string;
  /** Public URL the email provider will fetch. Mutually exclusive with `content`. */
  path?: string;
  /** MIME type override (e.g. "application/pdf"). */
  contentType?: string;
  /** Content-ID for inline images referenced via `cid:` in HTML. */
  contentId?: string;
}

export interface SendEmailInput {
  attachments?: SendEmailAttachment[] | null;
  bcc?: string[] | null;
  cc?: string[] | null;
  from: string;
  html?: string | null;
  replyTo?: string[] | null;
  subject: string;
  text?: string | null;
  to: string[];
}

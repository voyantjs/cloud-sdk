import { VoyantTransport } from "@voyant-sdk/sdk-core";
import type {
  CheckVerificationInput,
  EmailMessageSummary,
  PhoneNumberSummary,
  SendEmailInput,
  SendSmsInput,
  SmsMessageSummary,
  StartVerificationInput,
  VaultSecretSummary,
  VaultSecretValue,
  VaultSummary,
  VerificationAttemptSummary,
  VerificationCheckResult,
  VoyantCloudClientOptions,
} from "./types.js";

export class VoyantCloudClient {
  readonly transport: VoyantTransport;

  constructor(options: VoyantCloudClientOptions) {
    this.transport = new VoyantTransport(options);
  }

  readonly vault = {
    getSecret: (vaultSlug: string, key: string) =>
      this.transport.request<VaultSecretValue>(
        `/vault/v1/${vaultSlug}/secrets/${key}`,
      ),
    listSecrets: (vaultSlug: string) =>
      this.transport.request<VaultSecretSummary[]>(
        `/vault/v1/${vaultSlug}/secrets`,
      ),
    listVaults: () => this.transport.request<VaultSummary[]>("/vault/v1"),
  };

  readonly sms = {
    listMessages: () =>
      this.transport.request<SmsMessageSummary[]>("/sms/v1/messages"),
    listPhoneNumbers: () =>
      this.transport.request<PhoneNumberSummary[]>("/sms/v1/phone-numbers"),
    sendMessage: (input: SendSmsInput) =>
      this.transport.request<SmsMessageSummary>("/sms/v1/messages", {
        body: input,
        method: "POST",
      }),
  };

  readonly verification = {
    check: (input: CheckVerificationInput) =>
      this.transport.request<VerificationCheckResult>("/verify/v1/check", {
        body: input,
        method: "POST",
      }),
    listAttempts: () =>
      this.transport.request<VerificationAttemptSummary[]>(
        "/verify/v1/attempts",
      ),
    start: (input: StartVerificationInput) =>
      this.transport.request<VerificationAttemptSummary>("/verify/v1/start", {
        body: input,
        method: "POST",
      }),
  };

  readonly email = {
    getMessage: (id: string) =>
      this.transport.request<EmailMessageSummary>(`/email/v1/messages/${id}`),
    listMessages: () =>
      this.transport.request<EmailMessageSummary[]>("/email/v1/messages"),
    sendMessage: (input: SendEmailInput) =>
      this.transport.request<EmailMessageSummary>("/email/v1/messages", {
        body: input,
        method: "POST",
      }),
  };
}

export function createVoyantCloudClient(options: VoyantCloudClientOptions) {
  return new VoyantCloudClient(options);
}

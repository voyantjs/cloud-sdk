import assert from "node:assert/strict";
import test from "node:test";

import { createVoyantCloudClient } from "../packages/cloud-sdk/dist/index.js";

function createRecorder({ responseBody = { data: [] } } = {}) {
  const calls = [];

  return {
    calls,
    fetch: async (url, init) => {
      calls.push({
        body: init?.body,
        headers: new Headers(init?.headers),
        method: init?.method ?? "GET",
        url: String(url),
      });

      return new Response(JSON.stringify(responseBody), {
        headers: { "content-type": "application/json" },
        status: 200,
      });
    },
  };
}

test("cloud client composes vault routes correctly", async () => {
  const recorder = createRecorder({ responseBody: { data: [] } });
  const client = createVoyantCloudClient({
    apiKey: "vault_key",
    fetch: recorder.fetch,
  });

  await client.vault.listVaults();
  await client.vault.listSecrets("primary");
  await client.vault.getSecret("primary", "stripe-key");

  assert.equal(recorder.calls[0].url, "https://api.voyant.cloud/vault/v1");
  assert.equal(recorder.calls[0].method, "GET");
  assert.equal(
    recorder.calls[0].headers.get("authorization"),
    "Bearer vault_key",
  );

  assert.equal(
    recorder.calls[1].url,
    "https://api.voyant.cloud/vault/v1/primary/secrets",
  );
  assert.equal(
    recorder.calls[2].url,
    "https://api.voyant.cloud/vault/v1/primary/secrets/stripe-key",
  );
});

test("cloud client composes sms phone-number and message routes correctly", async () => {
  const recorder = createRecorder({
    responseBody: { data: { id: "msg_123", status: "queued" } },
  });
  const client = createVoyantCloudClient({
    apiKey: "sms_key",
    fetch: recorder.fetch,
  });

  await client.sms.listPhoneNumbers();
  await client.sms.listMessages();
  await client.sms.sendMessage({
    to: "+14155551234",
    body: "hello",
    from: "+14155550000",
  });

  assert.equal(
    recorder.calls[0].url,
    "https://api.voyant.cloud/sms/v1/phone-numbers",
  );
  assert.equal(recorder.calls[0].method, "GET");

  assert.equal(
    recorder.calls[1].url,
    "https://api.voyant.cloud/sms/v1/messages",
  );

  assert.equal(
    recorder.calls[2].url,
    "https://api.voyant.cloud/sms/v1/messages",
  );
  assert.equal(recorder.calls[2].method, "POST");
  assert.deepEqual(JSON.parse(recorder.calls[2].body), {
    to: "+14155551234",
    body: "hello",
    from: "+14155550000",
  });
});

test("cloud client composes email message routes correctly", async () => {
  const recorder = createRecorder({
    responseBody: { data: { id: "email_123", status: "queued" } },
  });
  const client = createVoyantCloudClient({
    apiKey: "email_key",
    fetch: recorder.fetch,
  });

  await client.email.listMessages();
  await client.email.sendMessage({
    from: "noreply@example.com",
    to: ["alice@example.com"],
    subject: "Welcome",
    text: "Hi",
  });
  await client.email.getMessage("email_123");

  assert.equal(
    recorder.calls[0].url,
    "https://api.voyant.cloud/email/v1/messages",
  );
  assert.equal(recorder.calls[0].method, "GET");

  assert.equal(
    recorder.calls[1].url,
    "https://api.voyant.cloud/email/v1/messages",
  );
  assert.equal(recorder.calls[1].method, "POST");
  assert.deepEqual(JSON.parse(recorder.calls[1].body), {
    from: "noreply@example.com",
    to: ["alice@example.com"],
    subject: "Welcome",
    text: "Hi",
  });

  assert.equal(
    recorder.calls[2].url,
    "https://api.voyant.cloud/email/v1/messages/email_123",
  );
  assert.equal(recorder.calls[2].method, "GET");
});

test("cloud client composes verification start and check routes correctly", async () => {
  const recorder = createRecorder({
    responseBody: { data: { id: "ver_123", status: "approved", valid: true } },
  });
  const client = createVoyantCloudClient({
    apiKey: "verify_key",
    fetch: recorder.fetch,
  });

  await client.verification.start({
    to: "+14155551234",
    channel: "sms",
    locale: "en",
  });
  await client.verification.check({
    to: "+14155551234",
    code: "123456",
  });

  assert.equal(
    recorder.calls[0].url,
    "https://api.voyant.cloud/sms/v1/verification/start",
  );
  assert.equal(recorder.calls[0].method, "POST");
  assert.deepEqual(JSON.parse(recorder.calls[0].body), {
    to: "+14155551234",
    channel: "sms",
    locale: "en",
  });

  assert.equal(
    recorder.calls[1].url,
    "https://api.voyant.cloud/sms/v1/verification/check",
  );
  assert.equal(recorder.calls[1].method, "POST");
  assert.deepEqual(JSON.parse(recorder.calls[1].body), {
    to: "+14155551234",
    code: "123456",
  });
});

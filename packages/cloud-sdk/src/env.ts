import { createVoyantCloudClient, VoyantCloudClient } from "./client.js";
import type { VoyantCloudClientOptions } from "./types.js";

/**
 * Bindings/env shape recognized by {@link getVoyantCloudClient} and
 * {@link tryGetVoyantCloudClient}.
 *
 * Designed to accept a Cloudflare Worker `env` object, Node `process.env`,
 * or any other key/value bag of strings. Empty-string values are treated
 * the same as `undefined` — common when `.env` files leave a key blank.
 */
export interface VoyantCloudEnv {
  VOYANT_CLOUD_API_KEY?: string;
  VOYANT_CLOUD_API_URL?: string;
  VOYANT_CLOUD_USER_AGENT?: string;
}

/**
 * Thrown when {@link getVoyantCloudClient} cannot construct a client because
 * `VOYANT_CLOUD_API_KEY` is missing and no override was supplied.
 */
export class VoyantCloudConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VoyantCloudConfigError";
  }
}

/**
 * Construct a {@link VoyantCloudClient} from a runtime bindings object
 * (Cloudflare Worker `env`, Node `process.env`, etc.).
 *
 * `overrides` take precedence over env values, except an empty-string
 * override is treated as missing so it can't silently clobber a valid env
 * value.
 *
 * Throws {@link VoyantCloudConfigError} when no API key can be resolved
 * from either source.
 */
export function getVoyantCloudClient(
  env: VoyantCloudEnv,
  overrides: Partial<VoyantCloudClientOptions> = {},
): VoyantCloudClient {
  const apiKey =
    nonEmpty(overrides.apiKey) ?? nonEmpty(env.VOYANT_CLOUD_API_KEY);

  if (!apiKey) {
    throw new VoyantCloudConfigError(
      "VOYANT_CLOUD_API_KEY is not set. Set the env variable or pass `apiKey` in overrides.",
    );
  }

  const baseUrl = nonEmpty(env.VOYANT_CLOUD_API_URL);
  const userAgent = nonEmpty(env.VOYANT_CLOUD_USER_AGENT);

  return createVoyantCloudClient({
    ...(baseUrl ? { baseUrl } : {}),
    ...(userAgent ? { userAgent } : {}),
    ...overrides,
    apiKey,
  });
}

/**
 * Like {@link getVoyantCloudClient}, but returns `null` when the API key
 * is unset instead of throwing. Use from edges that legitimately operate
 * without cloud (e.g. local dev tooling that doesn't send mail).
 */
export function tryGetVoyantCloudClient(
  env: VoyantCloudEnv,
  overrides: Partial<VoyantCloudClientOptions> = {},
): VoyantCloudClient | null {
  try {
    return getVoyantCloudClient(env, overrides);
  } catch (error) {
    if (error instanceof VoyantCloudConfigError) {
      return null;
    }
    throw error;
  }
}

function nonEmpty(value: string | undefined): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

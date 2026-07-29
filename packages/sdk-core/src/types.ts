export type FetchLike = typeof fetch;

export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean | null | undefined>;

export type QueryParams = Record<string, QueryValue>;

export interface VoyantTransportOptions {
  apiKey: string;
  authHeader?: string;
  authScheme?: string | null;
  baseUrl?: string;
  fetch?: FetchLike;
  headers?: HeadersInit;
  userAgent?: string;
}

export type VoyantResponseType = "json" | "text" | "binary";

export interface VoyantRequestOptions {
  body?: BodyInit | object | null;
  headers?: HeadersInit;
  /**
   * Sent as the `Idempotency-Key` header.
   *
   * Supply a key that is STABLE for the logical operation, not one generated
   * per attempt: the point is that a retry of the same operation is recognised
   * as the same operation. A per-attempt value is indistinguishable from
   * sending no key at all.
   *
   * The SDK never generates one. A random key would only restate "do not
   * deduplicate", and deriving one from the request body would be worse: two
   * one-time-code emails to the same address differ only by the code, so a
   * body hash would turn a legitimate resend into a silent replay of the first
   * message. Only the caller knows what "the same operation" means.
   */
  idempotencyKey?: string;
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
  query?: QueryParams;
  responseType?: VoyantResponseType;
  signal?: AbortSignal;
  unwrapData?: boolean;
}

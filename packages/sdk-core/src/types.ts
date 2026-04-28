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
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
  query?: QueryParams;
  responseType?: VoyantResponseType;
  signal?: AbortSignal;
  unwrapData?: boolean;
}

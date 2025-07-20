import { describe, it, expect } from "vitest";
import { getAPIKey } from "../api/auth.js";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("should return the API key when authorization header is properly formatted", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-api-key",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("my-secret-api-key");
  });

  it("should return null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  it("should return null when authorization header is empty", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  it("should return null when authorization header doesn't start with 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer my-token",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  it("should return null when authorization header has wrong case", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey my-secret-api-key",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  it("should return null when authorization header has only one part", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  it("should return the second part when authorization header has extra parts", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-api-key extra-part",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("my-secret-api-key");
  });

  it("should handle authorization header with just spaces", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "   ",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  it("should handle authorization header with ApiKey but no key value", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey ",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("");
  });

  it("should handle complex API key values", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey sk-1234567890abcdef_special-chars.here",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("sk-1234567890abcdef_special-chars.here");
  });
});

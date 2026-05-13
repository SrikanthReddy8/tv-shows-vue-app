import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";

// ✅ hoisting-safe
var requestUseMock;
var responseUseMock;

// ✅ axios mock
vi.mock("axios", () => {
  requestUseMock = vi.fn();
  responseUseMock = vi.fn();

  return {
    default: {
      create: () => ({
        interceptors: {
          request: {
            use: requestUseMock,
          },
          response: {
            use: responseUseMock,
          },
        },
      }),
    },
  };
});

describe("API Interceptor", () => {
  let startMock;
  let stopMock;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();

    // ✅ ✅ IMPORTANT → setup fresh mocks AFTER resetModules

    startMock = vi.fn();
    stopMock = vi.fn();

    vi.doMock("@/stores/uiStore", () => ({
      useUIStore: () => ({
        startLoading: startMock,
        stopLoading: stopMock,
      }),
    }));

    // ✅ activate pinia
    setActivePinia(createPinia());

    // ✅ re-import interceptor AFTER mocks
    await import("@/api/interceptor");
  });

  // ✅ request
  it("calls startLoading on request", () => {
    const handler = requestUseMock.mock.calls[0][0];

    handler({});

    expect(startMock).toHaveBeenCalledTimes(1);
  });

  // ✅ success
  it("calls stopLoading and returns data", () => {
    const successHandler = responseUseMock.mock.calls[0][0];

    const res = { data: { test: 123 } };

    const result = successHandler(res);

    expect(stopMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(res.data);
  });

  // ✅ error
  it("calls stopLoading and throws error", async () => {
    const errorHandler = responseUseMock.mock.calls[0][1];

    const error = new Error("API error");

    await expect(errorHandler(error)).rejects.toThrow("API error");

    expect(stopMock).toHaveBeenCalledTimes(1);
  });
});
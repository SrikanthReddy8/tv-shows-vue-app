import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUIStore } from "../uiStore";

describe("useUIStore", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useUIStore();
  });

  // ✅ 1. Initial State
  it("should have correct initial state", () => {
    expect(store.loadingCount).toBe(0);
    expect(store.user.name).toBe("Srikanth Vanga");
    expect(store.user.initials).toBe("SV");
  });

  // ✅ 2. Getter - isLoading false
  it("should return false when not loading", () => {
    expect(store.isLoading).toBe(false);
  });

  // ✅ 3. startLoading increments counter
  it("should increment loadingCount on startLoading", () => {
    store.startLoading();

    expect(store.loadingCount).toBe(1);
    expect(store.isLoading).toBe(true);
  });

  // ✅ 4. stopLoading decrements counter
  it("should decrement loadingCount on stopLoading", () => {
    store.startLoading();
    store.stopLoading();

    expect(store.loadingCount).toBe(0);
    expect(store.isLoading).toBe(false);
  });

  // ✅ 5. stopLoading should not go below zero
  it("should not allow loadingCount to go below zero", () => {
    store.stopLoading(); // already 0

    expect(store.loadingCount).toBe(0);
  });

  // ✅ 6. multiple loading calls
  it("should handle multiple loading calls correctly", () => {
    store.startLoading();
    store.startLoading();
    store.startLoading();

    expect(store.loadingCount).toBe(3);
    expect(store.isLoading).toBe(true);

    store.stopLoading();

    expect(store.loadingCount).toBe(2);
    expect(store.isLoading).toBe(true);
  });
});
import { describe, it, expect, vi } from "vitest";
import api from "@/api/interceptor";
import {
  fetchShows,
  searchShows,
  getShowDetails,
} from "../showsService";

// ✅ mock interceptor
vi.mock("@/api/interceptor", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("Shows API Service", () => {
  it("fetchShows calls correct endpoint", async () => {
    api.get.mockResolvedValue([]);

    await fetchShows();

    expect(api.get).toHaveBeenCalledWith("/shows");
  });

  it("searchShows calls correct endpoint", async () => {
    api.get.mockResolvedValue([]);

    await searchShows("test");

    expect(api.get).toHaveBeenCalledWith("/search/shows?q=test");
  });

  it("getShowDetails calls correct endpoint", async () => {
    api.get.mockResolvedValue({});

    await getShowDetails(1);

    expect(api.get).toHaveBeenCalledWith("/shows/1");
  });
});
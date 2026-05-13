import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useShowsStore } from "../useShowsStore";

// ✅ Mock API functions (IMPORTANT)
vi.mock("@/api/showsService", () => ({
  fetchShows: vi.fn(),
  searchShows: vi.fn(),
  getShowDetails: vi.fn(),
}));

import { fetchShows, searchShows, getShowDetails } from "@/api/showsService";

describe("useShowsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  // ✅ 1. LOAD SHOWS SUCCESS
  it("loads shows successfully", async () => {
    fetchShows.mockResolvedValue([
      { id: 1, name: "Breaking Bad", rating: { average: 9 } },
    ]);

    const store = useShowsStore();

    await store.loadShows();

    expect(fetchShows).toHaveBeenCalled();
    expect(store.shows.length).toBe(1);
    expect(store.shows[0].name).toBe("Breaking Bad");
  });

  // ✅ 2. LOAD SHOWS ERROR
  it("handles loadShows error", async () => {
    fetchShows.mockRejectedValue(new Error("API error"));

    const store = useShowsStore();

    await store.loadShows();

    expect(store.error).toBe("Failed to load shows");
  });

  // ✅ 3. SEARCH SUCCESS
  it("searches shows correctly", async () => {
    searchShows.mockResolvedValue([{ show: { id: 2, name: "Friends" } }]);

    const store = useShowsStore();

    await store.search("friends");

    expect(searchShows).toHaveBeenCalledWith("friends");
    expect(store.searchResults[0].name).toBe("Friends");
  });

  // ✅ 4. SEARCH EMPTY QUERY
  it("clears results when query is empty", async () => {
    const store = useShowsStore();

    await store.search("");

    expect(store.searchResults).toEqual([]);
  });

  // ✅ 5. SEARCH ERROR
  it("handles search error", async () => {
    searchShows.mockRejectedValue(new Error("error"));

    const store = useShowsStore();

    await store.search("test");

    expect(store.error).toBe("Search failed");
  });

  // ✅ 6. LOAD SHOW DETAILS SUCCESS
  it("loads show details correctly", async () => {
    getShowDetails.mockResolvedValue({
      id: 5,
      name: "Game of Thrones",
    });

    const store = useShowsStore();

    await store.loadShowDetails(5);

    expect(getShowDetails).toHaveBeenCalledWith(5);
    expect(store.selectedShow.name).toBe("Game of Thrones");
  });

  // ✅ 7. LOAD SHOW DETAILS ERROR
  it("handles loadShowDetails error", async () => {
    getShowDetails.mockRejectedValue(new Error("error"));

    const store = useShowsStore();

    await store.loadShowDetails(1);

    expect(store.error).toBe("Failed to load show details");
  });

  // ✅ 8. TOGGLE MY LIST
  it("toggles my list correctly", () => {
    const store = useShowsStore();

    store.toggleMyList(1);
    expect(store.myList.has(1)).toBe(true);

    store.toggleMyList(1);
    expect(store.myList.has(1)).toBe(false);
  });

  // ✅ 9. LOAD MORE
  it("increments visible count", () => {
    const store = useShowsStore();

    const initial = store.visibleCount;

    store.loadMore();

    expect(store.visibleCount).toBe(initial + 10);
  });
  // ✅ 10. popularShows getter
  it("computes popularShows correctly (sorted by rating)", () => {
    const store = useShowsStore();

    store.shows = [
      { id: 1, rating: { average: 4 } },
      { id: 2, rating: { average: 9 } },
      { id: 3, rating: { average: 7 } },
    ];

    const result = store.popularShows;

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(3);
    expect(result[2].id).toBe(1);
  });

  // ✅ 11. topRatedShows getter
  it("filters topRatedShows (rating >= 8)", () => {
    const store = useShowsStore();

    store.shows = [
      { id: 1, rating: { average: 7 } },
      { id: 2, rating: { average: 8 } },
      { id: 3, rating: { average: 9 } },
    ];

    const result = store.topRatedShows;

    expect(result.length).toBe(2);
    expect(result[0].id).toBe(3);
  });

  // ✅ 12. showsByGenre grouping
  it("groups shows correctly by genre", () => {
    const store = useShowsStore();

    store.shows = [
      { id: 1, genres: ["Drama"] },
      { id: 2, genres: ["Comedy", "Drama"] },
      { id: 3, genres: ["Comedy"] },
    ];

    const result = store.showsByGenre;

    expect(result.Drama.length).toBe(2);
    expect(result.Comedy.length).toBe(2);
  });

  // ✅ 13. myListShows getter
  it("returns shows present in myList", () => {
    const store = useShowsStore();

    store.shows = [{ id: 1 }, { id: 2 }, { id: 3 }];

    store.myList.add(1);
    store.myList.add(3);

    const result = store.myListShows;

    expect(result.length).toBe(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(3);
  });

  // ✅ 14. latestShows sorting
  it("sorts latestShows by premiered date (recent first)", () => {
    const store = useShowsStore();

    store.shows = [
      { id: 1, premiered: "2020-01-01" },
      { id: 2, premiered: "2024-01-01" },
      { id: 3, premiered: "2022-01-01" },
    ];

    const result = store.latestShows;

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(3);
    expect(result[2].id).toBe(1);
  });
});

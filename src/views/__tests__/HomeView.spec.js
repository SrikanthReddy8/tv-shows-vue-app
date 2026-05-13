import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import * as storeModule from "@/stores/useShowsStore";
import HomeView from "../Home.vue";

// ✅ Mock child components
vi.mock("@/components/ScrollableRow.vue", () => ({
  default: { template: "<div><slot /></div>" },
}));

vi.mock("@/components/ShowCard.vue", () => ({
  default: { template: "<div>ShowCard</div>" },
}));

vi.mock("@/components/SearchBar.vue", () => ({
  default: { template: "<input />" },
}));

describe("HomeView", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  const createWrapper = (mockStore) => {
    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);
    return mount(HomeView);
  };

  // ✅ 1. Calls loadShows on mount
  it("calls loadShows on mount", () => {
    const loadMock = vi.fn();

    createWrapper({
      loadShows: loadMock,
      searchResults: [],
      popularShows: [],
      showsByGenre: {},
    });

    expect(loadMock).toHaveBeenCalled();
  });

  // ✅ 2. Shows default dashboard (Popular)
  it("renders default popular section", async () => {
    const wrapper = createWrapper({
      loadShows: vi.fn(),
      searchResults: [],
      popularShows: [{ id: 1 }],
      showsByGenre: {},
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Popular Shows");
  });

  // ✅ 3. Shows search results section
  it("renders search results section", async () => {
    const wrapper = createWrapper({
      loadShows: vi.fn(),
      searchResults: [{ id: 1 }],
      popularShows: [],
      showsByGenre: {},
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Search Results");
  });

  // ✅ 4. Renders genres correctly
  it("renders genres correctly", async () => {
    const wrapper = createWrapper({
      loadShows: vi.fn(),
      searchResults: [],
      popularShows: [],
      showsByGenre: {
        Drama: [{ id: 1 }],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Drama");
  });

  // ✅ 5. Does NOT show default when search is present
  it("hides default sections when search results exist", async () => {
    const wrapper = createWrapper({
      loadShows: vi.fn(),
      searchResults: [{ id: 1 }],
      popularShows: [],
      showsByGenre: {
        Drama: [{ id: 1 }],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain("Popular Shows");
  });
});
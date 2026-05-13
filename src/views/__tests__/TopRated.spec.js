import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import * as storeModule from "@/stores/useShowsStore";
import TopRated from "../TopRated.vue";

// ✅ Mock child component
vi.mock("@/components/ShowCard.vue", () => ({
  default: {
    template: "<div class='mock-card'>ShowCard</div>",
    props: ["show"],
  },
}));

describe("TopRated View", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // ✅ 1. renders component
  it("should render correctly", () => {
    const mockStore = {
      shows: [],
      topRatedShows: [],
      loadShows: vi.fn(),
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(TopRated);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("Top Rated Shows");
  });

  // ✅ 2. calls loadShows when no shows
  it("should call loadShows when shows are empty", () => {
    const loadShowsMock = vi.fn();

    const mockStore = {
      shows: [],
      topRatedShows: [],
      loadShows: loadShowsMock,
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    mount(TopRated);

    expect(loadShowsMock).toHaveBeenCalled();
  });

  // ✅ 3. show loading state
  it("should show loading message when shows are empty", () => {
    const mockStore = {
      shows: [],
      topRatedShows: [],
      loadShows: vi.fn(),
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(TopRated);

    expect(wrapper.text()).toContain("Loading shows...");
  });

  // ✅ 4. show empty state when no top rated shows
  it("should show empty message when no top rated shows", () => {
    const mockStore = {
      shows: [{ id: 1 }], // shows exist
      topRatedShows: [],
      loadShows: vi.fn(),
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(TopRated);

    expect(wrapper.text()).toContain("No top rated shows available");
  });

  // ✅ 5. show grid when top rated shows exist
  it("should render top rated shows grid", async () => {
    const mockStore = {
      shows: [{ id: 1 }],
      topRatedShows: [
        { id: 1, name: "Breaking Bad" },
        { id: 2, name: "Friends" },
      ],
      loadShows: vi.fn(),
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(TopRated);

    await wrapper.vm.$nextTick();

    const cards = wrapper.findAll(".mock-card");

    expect(cards.length).toBe(2);
  });
});
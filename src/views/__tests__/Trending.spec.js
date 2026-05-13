import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import * as storeModule from "@/stores/useShowsStore";
import Trending from "../Trending.vue";

// ✅ Mock ShowCard
vi.mock("@/components/ShowCard.vue", () => ({
  default: {
    template: "<div class='mock-card'>ShowCard</div>",
    props: ["show"],
  },
}));

describe("Trending View", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // ✅ 1. renders component
  it("should render correctly", () => {
    const mockStore = {
      shows: [],
      latestShows: [],
      loadShows: vi.fn(),
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(Trending);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("New & Trending");
  });

  // ✅ 2. calls loadShows when shows empty
  it("should call loadShows when shows are empty", () => {
    const loadShowsMock = vi.fn();

    const mockStore = {
      shows: [],
      latestShows: [],
      loadShows: loadShowsMock,
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    mount(Trending);

    expect(loadShowsMock).toHaveBeenCalled();
  });

  // ✅ 3. loading state
  it("should show loading message when shows are empty", () => {
    const mockStore = {
      shows: [],
      latestShows: [],
      loadShows: vi.fn(),
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(Trending);

    expect(wrapper.text()).toContain("Loading shows...");
  });

  // ✅ 4. empty state
  it("should show empty message when no latest shows", () => {
    const mockStore = {
      shows: [{ id: 1 }],
      latestShows: [],
      loadShows: vi.fn(),
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(Trending);

    expect(wrapper.text()).toContain("No latest shows available");
  });

  // ✅ 5. render list
  it("should render latest shows grid", async () => {
    const mockStore = {
      shows: [{ id: 1 }],
      latestShows: [
        { id: 1, name: "Show 1" },
        { id: 2, name: "Show 2" },
      ],
      loadShows: vi.fn(),
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(Trending);

    await wrapper.vm.$nextTick();

    const cards = wrapper.findAll(".mock-card");

    expect(cards.length).toBe(2);
  });
});
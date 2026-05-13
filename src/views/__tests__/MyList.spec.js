import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import * as storeModule from "@/stores/useShowsStore";
import MyList from "../MyList.vue";

// ✅ Mock ShowCard (child component)
vi.mock("@/components/ShowCard.vue", () => ({
  default: {
    template: "<div class='mock-show-card'>ShowCard</div>",
    props: ["show"],
  },
}));

describe("MyList View", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // ✅ 1. Renders correctly
  it("should render My List page", () => {
    const mockStore = {
      myListShows: [],
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(MyList);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("My List");
  });

  // ✅ 2. Empty state
  it("should show empty message when no items", () => {
    const mockStore = {
      myListShows: [],
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(MyList);

    expect(wrapper.text()).toContain("No shows added yet");
    expect(wrapper.find(".mock-show-card").exists()).toBe(false);
  });

  // ✅ 3. List rendering
  it("should render shows when items exist", async () => {
    const mockStore = {
      myListShows: [
        { id: 1, name: "Breaking Bad" },
        { id: 2, name: "Friends" },
      ],
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(MyList);

    await wrapper.vm.$nextTick();

    const cards = wrapper.findAll(".mock-show-card");

    expect(cards.length).toBe(2);
  });

  // ✅ 4. Should not show empty state when list exists
  it("should hide empty state when shows exist", () => {
    const mockStore = {
      myListShows: [{ id: 1 }],
    };

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue(mockStore);

    const wrapper = mount(MyList);

    expect(wrapper.text()).not.toContain("No shows added yet");
  });
});

import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ShowDetails from "../ShowDetails.vue";

// ✅ Mock API
vi.mock("@/api/showsService", () => ({
  getShowDetails: vi.fn(),
}));

import { getShowDetails } from "@/api/showsService";

// ✅ Mock Vue Router
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: {
      id: 1,
    },
  }),
}));

describe("ShowDetails View", () => {
  // ✅ 1. Renders after API load
  it("should fetch and render show details", async () => {
    getShowDetails.mockResolvedValue({
      id: 1,
      name: "Breaking Bad",
      rating: { average: 9.5 },
      summary: "<p>Great show</p>",
      genres: ["Drama", "Crime"],
      image: { medium: "test.jpg" },
    });

    const wrapper = mount(ShowDetails);

    // ✅ wait for async onMounted
    await new Promise((resolve) => setTimeout(resolve));
    await wrapper.vm.$nextTick();

    expect(getShowDetails).toHaveBeenCalledWith(1);
    expect(wrapper.text()).toContain("Breaking Bad");
    expect(wrapper.text()).toContain("9.5");
    expect(wrapper.text()).toContain("Drama, Crime");
  });

  // ✅ 2. Image rendering
  it("should render image correctly", async () => {
    getShowDetails.mockResolvedValue({
      id: 1,
      name: "Test Show",
      rating: { average: 8 },
      summary: "<p>Summary</p>",
      genres: ["Drama"],
      image: { medium: "test-image.jpg" },
    });

    const wrapper = mount(ShowDetails);

    await new Promise((resolve) => setTimeout(resolve));
    await wrapper.vm.$nextTick();

    const img = wrapper.find("img");

    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("test-image.jpg");
  });

  // ✅ 3. Should not render before data loads
  it("should not render content when show is null", () => {
    const wrapper = mount(ShowDetails);

    expect(wrapper.find(".container").exists()).toBe(false);
  });
});

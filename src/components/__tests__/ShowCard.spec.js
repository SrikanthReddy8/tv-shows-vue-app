import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as storeModule from "@/stores/useShowsStore";
import ShowCard from "../ShowCard.vue";

// ✅ Mock router
const pushMock = vi.fn();

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("ShowCard Component", () => {
  let toggleMock;

  const mockShow = {
    id: 1,
    name: "Breaking Bad",
    rating: { average: 9.5 },
    image: { medium: "test.jpg" },
  };

  beforeEach(() => {
    pushMock.mockClear();
    toggleMock = vi.fn();

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue({
      toggleMyList: toggleMock,
      myList: new Set(), // default empty
    });
  });

  // ✅ 1. renders correctly
  it("should render show details", () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    });

    expect(wrapper.text()).toContain("Breaking Bad");
    expect(wrapper.text()).toContain("9.5");
  });

  // ✅ 2. navigates on card click
  it("should navigate to details on card click", async () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    });

    await wrapper.find(".show-card").trigger("click");

    expect(pushMock).toHaveBeenCalledWith("/show/1");
  });

  // ✅ 3. toggle my list on button click
  it("should toggle my list on button click", async () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    });

    const button = wrapper.find(".add-btn");

    await button.trigger("click");

    expect(toggleMock).toHaveBeenCalledWith(1);
  });

  // ✅ 4. button shows "+" when not in list
  it('should show "+" when not in my list', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    });

    expect(wrapper.find(".add-btn").text()).toBe("+");
  });

  // ✅ 5. button shows "✓" when in list
  it('should show "✓" when in my list', () => {
    vi.spyOn(storeModule, "useShowsStore").mockReturnValue({
      toggleMyList: vi.fn(),
      myList: new Set([1]), // ✅ in list
    });

    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    });

    expect(wrapper.find(".add-btn").text()).toBe("✓");
  });

  // ✅ 6. stopPropagation prevents navigation
  it("should not navigate when clicking button", async () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    });

    const button = wrapper.find(".add-btn");

    await button.trigger("click");

    expect(pushMock).not.toHaveBeenCalled();
  });

  // ✅ 7. fallback image when missing
  it("uses fallback image when image is missing", () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: {
          id: 1,
          name: "Test Show",
          rating: { average: 8 },
          image: null, // ✅ missing
        },
      },
    });

    const img = wrapper.find("img");

    expect(img.attributes("src")).toContain("placeholder");
  });

  // ✅ 8. fallback rating when missing
  it('shows "N/A" when rating is missing', () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: {
          id: 1,
          name: "Test Show",
          image: { medium: "test.jpg" },
          rating: null, // ✅ missing
        },
      },
    });

    expect(wrapper.text()).toContain("N/A");
  });

  // ✅ 9. fallback when rating.average missing
  it('shows "N/A" when rating.average is missing', () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: {
          id: 1,
          name: "Test Show",
          rating: {},
          image: { medium: "test.jpg" },
        },
      },
    });

    expect(wrapper.text()).toContain("N/A");
  });
});
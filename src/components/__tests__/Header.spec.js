import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as uiStoreModule from "@/stores/uiStore";
import * as showsStoreModule from "@/stores/useShowsStore";
import Header from "../Header.vue";

// ✅ router mock (needed)
vi.mock("vue-router", () => ({
  useRoute: () => ({
    name: "home",
  }),
  RouterLink: {
    template: "<a><slot /></a>",
    props: ["to"],
  },
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createWrapper = (overrides = {}) => {
    vi.spyOn(uiStoreModule, "useUIStore").mockReturnValue({
      user: {
        name: "Srikanth Vanga",
        initials: "SV",
      },
      ...overrides.ui,
    });

    vi.spyOn(showsStoreModule, "useShowsStore").mockReturnValue({
      myList: new Set(),
      ...overrides.shows,
    });

    return mount(Header, {
      global: {
        mocks: {
          $route: {
            name: "home", // ✅ CRITICAL FIX
          },
        },
      },
    });
  };

  it("should render navbar", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(".app-navbar").exists()).toBe(true);
  });

  it("should render logo", () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain("TV");
  });

  it("should render navigation links", () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain("Discover");
  });

  it("should apply active class", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(".nav-link.active").exists()).toBe(true);
  });

  it("should display user initials", () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain("SV");
  });

  it("should show user name", () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain("Srikanth Vanga");
  });

  it("should show badge when items exist", async () => {
    const wrapper = createWrapper({
      shows: {
        myList: [1, 2, 3],
      },
    });

    await wrapper.vm.$nextTick();

    const badge = wrapper.find(".badge-count");

    expect(badge.exists()).toBe(true);
    expect(badge.text()).toBe("3");
  });

  it("should not show badge when empty", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(".badge-count").exists()).toBe(false);
  });
});

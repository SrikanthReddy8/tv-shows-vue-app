import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as storeModule from "@/stores/useShowsStore";
import SearchBar from "../SearchBar.vue";

// ✅ Mock debounce to run immediately
vi.mock("lodash/debounce", () => ({
  default: (fn) => fn,
}));

describe("SearchBar Component", () => {
  let searchMock;

  beforeEach(() => {
    searchMock = vi.fn();

    vi.spyOn(storeModule, "useShowsStore").mockReturnValue({
      search: searchMock,
    });
  });

  // ✅ 1. renders input
  it("should render input field", () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find("input");

    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Search TV Shows...");
  });

  // ✅ 2. updates value
  it("should update query on input", async () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find("input");

    await input.setValue("breaking bad");

    expect(input.element.value).toBe("breaking bad");
  });

  // ✅ 3. triggers search
  it("should call store.search when typing", async () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find("input");

    await input.setValue("friends");

    expect(searchMock).toHaveBeenCalledWith("friends");
  });
});
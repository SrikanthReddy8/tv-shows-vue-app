import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Loader from "../Loader.vue";

describe("Loader Component", () => {
  // ✅ 1. Renders correctly
  it("should render loader wrapper", () => {
    const wrapper = mount(Loader);

    expect(wrapper.find(".loader-wrapper").exists()).toBe(true);
  });

  // ✅ 2. Shows bootstrap spinner
  it("should render spinner element", () => {
    const wrapper = mount(Loader);

    const spinner = wrapper.find(".spinner-border");

    expect(spinner.exists()).toBe(true);
  });

  // ✅ 3. Accessibility text present
  it("should contain loading text for accessibility", () => {
    const wrapper = mount(Loader);

    expect(wrapper.text()).toContain("Loading...");
  });

  // ✅ 4. Spinner has correct class
  it("should have correct bootstrap class", () => {
    const wrapper = mount(Loader);

    const spinner = wrapper.find(".spinner-border");

    expect(spinner.classes()).toContain("text-danger");
  });
});
import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ScrollComponent from "../ScrollableRow.vue";

// ✅ Helper to mock DOM scroll properties
const setScrollProps = (el, { scrollWidth, clientWidth, scrollLeft }) => {
  Object.defineProperty(el, "scrollWidth", {
    configurable: true,
    value: scrollWidth,
  });

  Object.defineProperty(el, "clientWidth", {
    configurable: true,
    value: clientWidth,
  });

  Object.defineProperty(el, "scrollLeft", {
    configurable: true,
    writable: true,
    value: scrollLeft,
  });
};

describe("ScrollComponent - Horizontal Scroll", () => {
  let wrapper;
  let el;

  const mountComponent = () => {
    wrapper = mount(ScrollComponent, {
      attachTo: document.body,
      slots: {
        default: `<div style="width:2000px;height:100px">Content</div>`,
      },
    });

    el = wrapper.vm.scrollRef;
  };

  beforeEach(() => {
    mountComponent();
  });

  // ✅ 1
  it("should render scroll container", () => {
    expect(wrapper.find(".scroll-container").exists()).toBe(true);
  });

  // ✅ 2
  it("should not show arrows when no overflow", async () => {
    setScrollProps(el, {
      scrollWidth: 500,
      clientWidth: 500,
      scrollLeft: 0,
    });

    await wrapper.vm.checkArrows();

    expect(wrapper.find(".scroll-btn").exists()).toBe(false);
  });

  // ✅ 3
  it("should show right arrow when content overflows", async () => {
    setScrollProps(el, {
      scrollWidth: 1200,
      clientWidth: 500,
      scrollLeft: 0,
    });

    await wrapper.vm.checkArrows();

    const buttons = wrapper.findAll(".scroll-btn");
    expect(buttons.length).toBe(1);
    expect(buttons[0].text()).toBe("›");
  });

  // ✅ 4
  it("should show both arrows when scrolled to middle", async () => {
    setScrollProps(el, {
      scrollWidth: 1200,
      clientWidth: 500,
      scrollLeft: 200,
    });

    await wrapper.vm.checkArrows();

    expect(wrapper.findAll(".scroll-btn").length).toBe(2);
  });

  // ✅ 5
  it("should scroll right when right button clicked", async () => {
    setScrollProps(el, {
      scrollWidth: 1200,
      clientWidth: 500,
      scrollLeft: 0,
    });

    el.scrollBy = vi.fn();

    await wrapper.vm.checkArrows();
    await wrapper.vm.$nextTick();

    const rightBtn = wrapper.findAll(".scroll-btn").find(b => b.text() === "›");

    await rightBtn.trigger("click");

    expect(el.scrollBy).toHaveBeenCalledWith({
      left: 300,
      behavior: "smooth",
    });
  });

  // ✅ 6
  it("should scroll left when left button clicked", async () => {
    setScrollProps(el, {
      scrollWidth: 1200,
      clientWidth: 500,
      scrollLeft: 200,
    });

    el.scrollBy = vi.fn();

    await wrapper.vm.checkArrows();
    await wrapper.vm.$nextTick();

    const leftBtn = wrapper.findAll(".scroll-btn").find(b => b.text() === "‹");

    await leftBtn.trigger("click");

    expect(el.scrollBy).toHaveBeenCalledWith({
      left: -300,
      behavior: "smooth",
    });
  });

  // ✅ 7
  it("should update arrows on scroll event", async () => {
    setScrollProps(el, {
      scrollWidth: 1200,
      clientWidth: 500,
      scrollLeft: 0,
    });

    await wrapper.vm.checkArrows();

    el.scrollLeft = 300;
    el.dispatchEvent(new Event("scroll"));

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showLeft).toBe(true);
    expect(wrapper.vm.showRight).toBe(true);
  });

  // ✅ 8
  it("should update arrows on window resize", async () => {
    setScrollProps(el, {
      scrollWidth: 1200,
      clientWidth: 800,
      scrollLeft: 0,
    });

    await wrapper.vm.checkArrows();

    window.dispatchEvent(new Event("resize"));
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showRight).toBe(true);
  });

  // ✅ 9
  it("should not crash if scrollRef is null", () => {
    wrapper.vm.scrollRef = null;

    expect(() => wrapper.vm.checkArrows()).not.toThrow();
  });

  // ✅ 10
  it("should render correct arrow symbols", async () => {
    setScrollProps(el, {
      scrollWidth: 1200,
      clientWidth: 500,
      scrollLeft: 200,
    });

    await wrapper.vm.checkArrows();

    const texts = wrapper.findAll(".scroll-btn").map(b => b.text());

    expect(texts).toContain("‹");
    expect(texts).toContain("›");
  });
});
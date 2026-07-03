// Entry point: renders content, then wires up navigation, the FAQ accordion,
// work filters/lightbox, and the GSAP scroll effects (progress bar, hero
// landing animation, section reveals).

document.addEventListener("DOMContentLoaded", () => {
  renderAll();

  initNav();
  initFaqAccordion();
  initWorkFilters();
  initLightbox();

  gsap.registerPlugin(ScrollTrigger);
  initProgressBar();
  initFlightRail();
  initHeroLanding();
  initReveals();

  // Images (work grid, hero art) finish loading after ScrollTrigger records
  // trigger positions, which shifts document height and staled thresholds.
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
});

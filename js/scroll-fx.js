// Scroll-driven effects: top progress bar, the flight rail (rocket riding
// along the page as you scroll), the hero "landing" animation, and staggered
// fade-in reveals for sections.

function getScrollRatio() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  return scrollable > 0 ? window.scrollY / scrollable : 0;
}

function initProgressBar() {
  const fill = document.getElementById("progress-fill");
  const onScroll = () => {
    fill.style.width = `${getScrollRatio() * 100}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}

function initFlightRail() {
  const rail = document.getElementById("flight-rail");
  const marker = document.getElementById("flight-rail-marker");
  if (!rail || !marker) return () => {};

  gsap.set(marker, { rotate: 180 });

  const setY = gsap.quickTo(marker, "y", { duration: 0.35, ease: "power2.out" });
  const onScroll = () => {
    const trackHeight = rail.getBoundingClientRect().height - marker.offsetHeight;
    setY(getScrollRatio() * trackHeight);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  const wobble = gsap.to(marker, {
    rotate: 186,
    duration: 1.4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    wobble.kill();
  };
}

function initHeroLanding() {
  const tween = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    },
  });

  tween
    .to(".hero-rocket", { top: "78%", rotate: 90, ease: "power1.in" }, 0)
    .to(".hero-planet", { y: "-6%", ease: "none" }, 0)
    .to(".hero-content", { opacity: 0, y: -40, ease: "none" }, 0);

  return () => tween.scrollTrigger && tween.scrollTrigger.kill();
}

function initReveals() {
  const batch = ScrollTrigger.batch(".reveal", {
    start: "top 88%",
    onEnter: (elements) =>
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        overwrite: true,
      }),
  });

  return () => batch.forEach((st) => st.kill());
}

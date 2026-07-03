// Mobile nav toggle + smooth-scroll for in-page anchor links, and active-link
// highlighting driven by scroll position.

function initNav() {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");

  const onToggleClick = () => nav.classList.toggle("is-open");
  toggle.addEventListener("click", onToggleClick);

  const onLinkClick = (e) => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;
    nav.classList.remove("is-open");
  };
  nav.addEventListener("click", onLinkClick);

  return () => {
    toggle.removeEventListener("click", onToggleClick);
    nav.removeEventListener("click", onLinkClick);
  };
}

function initFaqAccordion() {
  const list = document.getElementById("faq-list-mount");

  const onClick = (e) => {
    const question = e.target.closest(".faq-question");
    if (!question) return;
    const item = question.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const isOpen = item.classList.contains("is-open");

    list.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
      openItem.classList.remove("is-open");
      openItem.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("is-open");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  };

  list.addEventListener("click", onClick);
  return () => list.removeEventListener("click", onClick);
}

function initWorkFilters() {
  const filtersMount = document.getElementById("work-filters");
  const grid = document.getElementById("work-grid-mount");

  const onClick = (e) => {
    const btn = e.target.closest(".work-filter");
    if (!btn) return;
    const filter = btn.dataset.filter;

    filtersMount.querySelectorAll(".work-filter").forEach((b) => b.classList.toggle("is-active", b === btn));
    grid.querySelectorAll(".project-card").forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
    });
  };

  filtersMount.addEventListener("click", onClick);
  return () => filtersMount.removeEventListener("click", onClick);
}

function initLightbox() {
  const grid = document.getElementById("work-grid-mount");
  const lightbox = document.getElementById("lightbox");
  const inner = document.getElementById("lightbox-inner");

  const close = () => { lightbox.hidden = true; };

  const onGridClick = (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    const project = SITE_CONTENT.work.projects.find((p) => p.id === card.dataset.project);
    if (!project) return;

    const media = project.video
      ? `<video controls preload="metadata" poster="${project.poster}"><source src="${project.video}" type="video/mp4" /></video>`
      : project.images.map((src) => `<img src="${src}" alt="${project.title}" />`).join("");

    inner.innerHTML = `
      <button class="lightbox-close" aria-label="Fermer">&times;</button>
      <div class="project-tags">${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}</div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="lightbox-images">${media}</div>
    `;
    lightbox.hidden = false;
  };

  const onLightboxClick = (e) => {
    if (e.target === lightbox || e.target.closest(".lightbox-close")) close();
  };

  grid.addEventListener("click", onGridClick);
  lightbox.addEventListener("click", onLightboxClick);

  return () => {
    grid.removeEventListener("click", onGridClick);
    lightbox.removeEventListener("click", onLightboxClick);
  };
}

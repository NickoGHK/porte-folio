// Renders SITE_CONTENT (js/content.js) into the DOM mount points defined in index.html.
// Keeping all text/image references in one data object means future copy edits
// never require touching this file or the HTML structure.

function renderNav() {
  const { nav } = SITE_CONTENT;
  document.getElementById("nav-logo").textContent = nav.logo;
  const linksMount = document.getElementById("nav-links");
  linksMount.innerHTML = nav.links
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join("");
}

function renderHero() {
  const { hero } = SITE_CONTENT;
  const mount = document.getElementById("hero-mount");
  mount.innerHTML = `
    <p class="kicker">${hero.kicker}</p>
    <h1 class="hero-title">${hero.title}</h1>
    <p class="hero-subtitle">${hero.subtitle}</p>
    <a class="btn" href="${hero.cta.href}">${hero.cta.label}</a>
  `;
  document.getElementById("scroll-hint").textContent = hero.scrollHint;
}

function renderAbout() {
  const { about } = SITE_CONTENT;
  document.getElementById("about-mount").innerHTML = `
    <div class="about-photo">${about.photo ? `<img src="${about.photo}" alt="${SITE_CONTENT.nav.logo}" />` : "Photo à venir"}</div>
    <div class="about-text">
      <p class="kicker">${about.kicker}</p>
      <h2 class="section-title">${about.title}</h2>
      ${about.paragraphs.map((p) => `<p>${p}</p>`).join("")}
      <div class="about-facts">
        ${about.facts.map((f) => `
          <div class="about-fact">
            <span class="about-fact-label">${f.label}</span>
            <span class="about-fact-value">${f.value}</span>
          </div>`).join("")}
      </div>
    </div>
  `;
}

function renderServices() {
  const { services } = SITE_CONTENT;
  document.getElementById("services-header-mount").innerHTML = `
    <p class="kicker">${services.kicker}</p>
    <h2 class="section-title">${services.title}</h2>
  `;
  document.getElementById("services-grid-mount").innerHTML = services.items
    .map((item) => `
      <article class="service-card reveal">
        <h3 class="service-title">${item.title}</h3>
        <p class="service-description">${item.description}</p>
      </article>
    `).join("");
}

function projectMediaHTML(project) {
  if (project.video) {
    return `<video muted loop playsinline poster="${project.poster}"><source src="${project.video}" type="video/mp4" /></video>`;
  }
  return `<img src="${project.images[0]}" alt="${project.title}" loading="lazy" />`;
}

function projectCardHTML(project) {
  return `
    <article class="project-card" data-category="${project.category}" data-project="${project.id}">
      <div class="project-media">${projectMediaHTML(project)}</div>
      <div class="project-body">
        <div class="project-tags">${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
      </div>
    </article>
  `;
}

function renderWork() {
  const { work } = SITE_CONTENT;
  document.getElementById("work-header-mount").innerHTML = `
    <div>
      <p class="kicker">${work.kicker}</p>
      <h2 class="section-title">${work.title}</h2>
      <p class="section-subtitle">${work.subtitle}</p>
    </div>
    <div class="work-filters" id="work-filters">
      ${work.filters.map((f, i) => `<button class="work-filter${i === 0 ? " is-active" : ""}" data-filter="${f.key}">${f.label}</button>`).join("")}
    </div>
  `;
  document.getElementById("work-grid-mount").innerHTML = work.projects.map(projectCardHTML).join("");
}

function renderPillars() {
  const { pillars } = SITE_CONTENT;
  document.getElementById("pillars-header-mount").innerHTML = `
    <p class="kicker">${pillars.kicker}</p>
    <h2 class="section-title">${pillars.title}</h2>
  `;
  document.getElementById("pillars-grid-mount").innerHTML = pillars.items
    .map((item) => `
      <div class="pillar-card reveal">
        <h3 class="pillar-title">${item.title}</h3>
        <p class="pillar-description">${item.description}</p>
      </div>
    `).join("");
}

function renderFaq() {
  const { faq } = SITE_CONTENT;
  document.getElementById("faq-header-mount").innerHTML = `
    <p class="kicker">${faq.kicker}</p>
    <h2 class="section-title">${faq.title}</h2>
  `;
  document.getElementById("faq-list-mount").innerHTML = faq.items
    .map((item, i) => `
      <div class="faq-item" data-faq="${i}">
        <button class="faq-question">
          <span>${item.q}</span>
          <span class="faq-question-icon">+</span>
        </button>
        <div class="faq-answer">
          <p class="faq-answer-inner">${item.a}</p>
        </div>
      </div>
    `).join("");
}

function renderContact() {
  const { contact } = SITE_CONTENT;
  document.getElementById("contact-mount").innerHTML = `
    <p class="kicker">${contact.kicker}</p>
    <h2 class="section-title">${contact.title}</h2>
    <p class="contact-message">${contact.message}</p>
    <a class="btn" href="${contact.cta.href}">${contact.cta.label}</a>
  `;
}

function renderFooter() {
  const { footer, contact, nav } = SITE_CONTENT;
  document.getElementById("footer-mount").innerHTML = `
    <p>${footer.text} © ${new Date().getFullYear()}</p>
    <div class="footer-socials">
      ${contact.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join("")}
    </div>
  `;
}

function renderAll() {
  document.title = SITE_CONTENT.meta.title;
  renderNav();
  renderHero();
  renderAbout();
  renderServices();
  renderWork();
  renderPillars();
  renderFaq();
  renderContact();
  renderFooter();
}

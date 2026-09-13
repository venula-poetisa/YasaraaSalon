// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

// Service tabs (Salon / Dressmaking)
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.service-panel');

function activateTab(tabName) {
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
    btn.tabIndex = isActive ? 0 : -1;
  });
  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabName;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

// Nav links that jump straight to a specific service tab
document.querySelectorAll('[data-tab-link]').forEach((link) => {
  link.addEventListener('click', () => activateTab(link.dataset.tabLink));
});

// Highlight the current section's nav link while scrolling
// (tab-jump links are excluded since two of them share the #services target)
const navLinks = document.querySelectorAll('#main-nav a[href^="#"]:not([data-tab-link])');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === id);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

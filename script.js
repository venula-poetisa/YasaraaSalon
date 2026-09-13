/* =========================================================
   YASARAA SALON & DRESS MAKING
   Main JavaScript
   ========================================================= */

/* ---------------------------------------------------------
   MOBILE NAVIGATION
   --------------------------------------------------------- */

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");

      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });
}


/* ---------------------------------------------------------
   SERVICE TABS
   --------------------------------------------------------- */

const tabButtons = document.querySelectorAll(".tab-btn");
const servicePanels = document.querySelectorAll(".service-panel");

function activateTab(tabName) {

  // Update the two buttons
  tabButtons.forEach((button) => {

    const isActive = button.dataset.tab === tabName;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;

  });


  // Show the correct panel
  servicePanels.forEach((panel) => {

    const isActive = panel.dataset.panel === tabName;

    panel.classList.toggle("active", isActive);

    if (isActive) {
      panel.removeAttribute("hidden");
    } else {
      panel.setAttribute("hidden", "");
    }

  });
}


/* Listen for clicks on Salon / Dressmaking */

tabButtons.forEach((button) => {

  button.addEventListener("click", (event) => {

    event.preventDefault();

    const tabName = button.dataset.tab;

    if (tabName) {
      activateTab(tabName);
    }

  });

});


/* ---------------------------------------------------------
   NAVIGATION LINKS THAT OPEN A SPECIFIC SERVICE TAB
   --------------------------------------------------------- */

document.querySelectorAll("[data-tab-link]").forEach((link) => {

  link.addEventListener("click", () => {

    const tabName = link.dataset.tabLink;

    if (tabName) {
      activateTab(tabName);
    }

  });

});


/* ---------------------------------------------------------
   HIGHLIGHT NAVIGATION WHILE SCROLLING
   --------------------------------------------------------- */

const navLinks = document.querySelectorAll(
  '#main-nav a[href^="#"]:not([data-tab-link])'
);

const sections = Array.from(navLinks)
  .map((link) => {
    const selector = link.getAttribute("href");
    return document.querySelector(selector);
  })
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const currentId = `#${entry.target.id}`;

          navLinks.forEach((link) => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") === currentId
            );

          });

        }

      });

    },
    {
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
}


/* ---------------------------------------------------------
   FOOTER YEAR
   --------------------------------------------------------- */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   START WITH SALON OPEN
   --------------------------------------------------------- */

activateTab("salon");
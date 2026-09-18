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
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

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
   SERVICE TABS (Salon / Dressmaking / Dress Hiring)
   --------------------------------------------------------- */

const tabButtons = document.querySelectorAll(".tab-btn");
const servicePanels = document.querySelectorAll(".service-panel");


function activateTab(tabName) {

  let matched = false;

  tabButtons.forEach((button) => {

    const isActive = button.dataset.tab === tabName;
    if (isActive) matched = true;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;

  });

  if (!matched) return;

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


tabButtons.forEach((button) => {

  button.addEventListener("click", (event) => {

    event.preventDefault();
    const tabName = button.dataset.tab;
    if (tabName) activateTab(tabName);

  });

});


document.querySelectorAll("[data-tab-link]").forEach((link) => {

  link.addEventListener("click", () => {

    const tabName = link.dataset.tabLink;
    if (tabName) activateTab(tabName);

  });

});


/* ---------------------------------------------------------
   HIGHLIGHT NAVIGATION WHILE SCROLLING
   --------------------------------------------------------- */

const navLinks = document.querySelectorAll(
  '#main-nav a[href^="#"]:not([data-tab-link])'
);

const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);


if ("IntersectionObserver" in window && sections.length) {

  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const currentId = `#${entry.target.id}`;

          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === currentId);
          });

        }

      });

    },

    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }

  );

  sections.forEach((section) => observer.observe(section));

}


/* ---------------------------------------------------------
   HELPERS
   --------------------------------------------------------- */

function escapeHTML(value) {

  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));

}

async function fetchJSON(path, fallback) {

  try {

    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`${path} → ${response.status}`);
    return await response.json();

  } catch (error) {

    console.warn(`Could not load ${path}, using empty content.`, error);
    return fallback;

  }

}

function renderServiceCards(gridElement, items, emptyMessage) {

  if (!gridElement) return;

  gridElement.innerHTML = "";

  if (!Array.isArray(items) || items.length === 0) {
    gridElement.innerHTML = `<p class="empty-state">${escapeHTML(emptyMessage)}</p>`;
    return;
  }

  items.forEach((item) => {

    const article = document.createElement("article");
    article.className = "service-card";

    const name = escapeHTML(item.name);
    const price = escapeHTML(item.price);
    const description = escapeHTML(item.description);

    article.innerHTML = `
      ${item.image ? `<img src="${escapeHTML(item.image)}" alt="${name || "Service photo"}" loading="lazy">` : ""}
      <div class="service-card-body">
        <div class="service-card-top">
          <h3>${name}</h3>
          ${price ? `<span class="price">Rs. ${price}</span>` : ""}
        </div>
        ${description ? `<p>${description}</p>` : ""}
      </div>
    `;

    gridElement.appendChild(article);

  });

}


/* ---------------------------------------------------------
   LOAD CONTENT FROM CMS
   --------------------------------------------------------- */

async function loadCMSContent() {

  const [business, salon, dressmaking, hiring, gallery, reviews] = await Promise.all([
    fetchJSON("content/business.json", {}),
    fetchJSON("content/salon.json", { services: [] }),
    fetchJSON("content/dressmaking.json", { designs: [] }),
    fetchJSON("content/dress-hiring.json", { dresses: [] }),
    fetchJSON("content/gallery.json", { photos: [] }),
    fetchJSON("content/reviews.json", { reviews: [] })
  ]);


  /* Business information */

  if (business.name) {

    document.querySelectorAll("[data-business-name]").forEach((el) => {
      el.textContent = business.name;
    });

    document.title = `${business.name} — Salon, Dressmaking & Dress Hiring`;

  }

  if (business.about) {

    document.querySelectorAll("[data-about]").forEach((el) => {
      el.textContent = business.about;
    });

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", business.about);

  }

  if (business.phone) {

    const cleanPhone = business.phone.replace(/[^\d+]/g, "");

    document.querySelectorAll("[data-phone]").forEach((el) => {

      el.href = `tel:${cleanPhone}`;

      if (el.children.length === 0) {
        el.textContent = business.phone;
      }

    });

    document.querySelectorAll("[data-phone-text]").forEach((el) => {
      el.textContent = business.phone;
    });

  }

  if (business.whatsapp) {

    const cleanWhatsApp = business.whatsapp.replace(/\D/g, "");

    document.querySelectorAll("[data-whatsapp]").forEach((el) => {
      el.href = `https://wa.me/${cleanWhatsApp}`;
      el.target = "_blank";
      el.rel = "noopener";
    });

  }

  if (business.address) {

    document.querySelectorAll("[data-address]").forEach((el) => {
      el.textContent = business.address;
    });

  }

  if (business.hours) {

    document.querySelectorAll("[data-hours]").forEach((el) => {
      el.textContent = business.hours;
    });

  }


  /* Salon */

  renderServiceCards(
    document.getElementById("salon-services"),
    salon.services,
    "Salon services will appear here shortly."
  );

  /* Dressmaking */

  renderServiceCards(
    document.getElementById("dressmaking-services"),
    dressmaking.designs,
    "Dressmaking services will appear here shortly."
  );

  /* Dress hiring */

  renderServiceCards(
    document.getElementById("hiring-services"),
    hiring.dresses,
    "Dresses available for hire will appear here shortly."
  );


  /* Gallery */

  const galleryGrid = document.getElementById("gallery-grid");

  if (galleryGrid) {

    const photos = Array.isArray(gallery.photos) ? gallery.photos.filter((p) => p.image) : [];

    if (photos.length === 0) {

      galleryGrid.innerHTML = `<p class="empty-state">Photos of our work are coming soon.</p>`;

    } else {

      galleryGrid.innerHTML = "";

      photos.forEach((photo, index) => {

        const figure = document.createElement("figure");

        if (index === 0 || index === 3) figure.className = "g-tall";

        const caption = escapeHTML(photo.caption) || "Yasaraa Salon & Dress Making";

        figure.innerHTML = `
          <img src="${escapeHTML(photo.image)}" alt="${caption}" loading="lazy">
          ${photo.caption ? `<figcaption>${escapeHTML(photo.caption)}</figcaption>` : ""}
        `;

        galleryGrid.appendChild(figure);

      });

    }

  }


  /* Reviews */

  const reviewsGrid = document.getElementById("reviews-grid");

  if (reviewsGrid) {

    const reviewList = Array.isArray(reviews.reviews) ? reviews.reviews : [];

    if (reviewList.length === 0) {

      reviewsGrid.innerHTML = `<p class="empty-state">Client reviews are coming soon.</p>`;

    } else {

      reviewsGrid.innerHTML = "";

      reviewList.forEach((review) => {

        const blockquote = document.createElement("blockquote");

        const rating = Math.max(1, Math.min(5, Number(review.rating) || 5));

        blockquote.innerHTML = `
          <div class="stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
          ${review.review ? `<p>${escapeHTML(review.review)}</p>` : ""}
          <footer>${escapeHTML(review.name) || "Yasaraa client"}</footer>
        `;

        reviewsGrid.appendChild(blockquote);

      });

    }

  }

}


/* ---------------------------------------------------------
   FOOTER YEAR
   --------------------------------------------------------- */

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();


/* ---------------------------------------------------------
   START
   --------------------------------------------------------- */

activateTab("salon");
loadCMSContent();

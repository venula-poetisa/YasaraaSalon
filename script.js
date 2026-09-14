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

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

  });


  mainNav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");
      navToggle.classList.remove("open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Open menu"
      );

    });

  });

}


/* ---------------------------------------------------------
   SERVICE TABS
   --------------------------------------------------------- */

const tabButtons = document.querySelectorAll(".tab-btn");
const servicePanels = document.querySelectorAll(".service-panel");


function activateTab(tabName) {

  /* Update tab buttons */

  tabButtons.forEach((button) => {

    const isActive =
      button.dataset.tab === tabName;

    button.classList.toggle(
      "active",
      isActive
    );

    button.setAttribute(
      "aria-selected",
      String(isActive)
    );

    button.tabIndex =
      isActive ? 0 : -1;

  });


  /* Show correct service panel */

  servicePanels.forEach((panel) => {

    const isActive =
      panel.dataset.panel === tabName;

    panel.classList.toggle(
      "active",
      isActive
    );

    if (isActive) {

      panel.removeAttribute("hidden");

    } else {

      panel.setAttribute("hidden", "");

    }

  });

}


/* Listen for Salon / Dressmaking tabs */

tabButtons.forEach((button) => {

  button.addEventListener("click", (event) => {

    event.preventDefault();

    const tabName =
      button.dataset.tab;

    if (tabName) {
      activateTab(tabName);
    }

  });

});


/* ---------------------------------------------------------
   NAVIGATION LINKS THAT OPEN A SPECIFIC SERVICE TAB
   --------------------------------------------------------- */

document
  .querySelectorAll("[data-tab-link]")
  .forEach((link) => {

    link.addEventListener("click", () => {

      const tabName =
        link.dataset.tabLink;

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

    const selector =
      link.getAttribute("href");

    return document.querySelector(selector);

  })
  .filter(Boolean);


if (
  "IntersectionObserver" in window &&
  sections.length
) {

  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            const currentId =
              `#${entry.target.id}`;

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


  sections.forEach((section) => {
    observer.observe(section);
  });

}


/* ---------------------------------------------------------
   LOAD CONTENT FROM CMS
   --------------------------------------------------------- */

async function loadCMSContent() {

  try {

    const [
      businessResponse,
      salonResponse,
      dressmakingResponse,
      galleryResponse,
      reviewsResponse
    ] = await Promise.all([

      fetch("content/business.json"),
      fetch("content/salon.json"),
      fetch("content/dressmaking.json"),
      fetch("content/gallery.json"),
      fetch("content/reviews.json")

    ]);


    /* Check that all files loaded */

    if (
      !businessResponse.ok ||
      !salonResponse.ok ||
      !dressmakingResponse.ok ||
      !galleryResponse.ok ||
      !reviewsResponse.ok
    ) {

      throw new Error(
        "One or more CMS content files could not be loaded."
      );

    }


    const business =
      await businessResponse.json();

    const salon =
      await salonResponse.json();

    const dressmaking =
      await dressmakingResponse.json();

    const gallery =
      await galleryResponse.json();

    const reviews =
      await reviewsResponse.json();


    /* -----------------------------------------------------
       BUSINESS INFORMATION
       ----------------------------------------------------- */

    /* Business name */

    if (business.name) {

      document
        .querySelectorAll("[data-business-name]")
        .forEach((element) => {

          element.textContent =
            business.name;

        });


      document.title =
        business.name;

    }


    /* About */

    if (business.about) {

      document
        .querySelectorAll("[data-about]")
        .forEach((element) => {

          element.textContent =
            business.about;

        });


      /* Also update browser description */

      const description =
        document.querySelector(
          'meta[name="description"]'
        );

      if (description) {

        description.setAttribute(
          "content",
          business.about
        );

      }

    }


    /* Phone */

    if (business.phone) {

      const cleanPhone =
        business.phone.replace(
          /[^\d+]/g,
          ""
        );


      /* Update phone links */

      document
        .querySelectorAll("[data-phone]")
        .forEach((element) => {

          element.href =
            `tel:${cleanPhone}`;


          /*
             If the element itself is the phone text,
             update it.
          */

          if (
            element.children.length === 0
          ) {

            element.textContent =
              business.phone;

          }

        });


      /* Update separate phone text */

      document
        .querySelectorAll("[data-phone-text]")
        .forEach((element) => {

          element.textContent =
            business.phone;

        });

    }


    /* WhatsApp */

    if (business.whatsapp) {

      const cleanWhatsApp =
        business.whatsapp.replace(
          /\D/g,
          ""
        );


      document
        .querySelectorAll("[data-whatsapp]")
        .forEach((element) => {

          element.href =
            `https://wa.me/${cleanWhatsApp}`;

          element.target = "_blank";
          element.rel = "noopener";

        });

    }


    /* Address */

    if (business.address) {

      document
        .querySelectorAll("[data-address]")
        .forEach((element) => {

          element.textContent =
            business.address;

        });

    }


    /* Opening hours */

    if (business.hours) {

      document
        .querySelectorAll("[data-hours]")
        .forEach((element) => {

          element.textContent =
            business.hours;

        });

    }


    /* -----------------------------------------------------
       SALON SERVICES
       ----------------------------------------------------- */

    const salonGrid =
      document.getElementById(
        "salon-services"
      );


    if (
      salonGrid &&
      Array.isArray(salon.services)
    ) {

      salonGrid.innerHTML = "";


      salon.services.forEach((service) => {

        const article =
          document.createElement("article");

        article.className =
          "service-card";


        article.innerHTML = `

          ${
            service.image
              ? `
                <img
                  src="${service.image}"
                  alt="${service.name || "Salon service"}"
                  loading="lazy"
                >
              `
              : ""
          }


          <div class="service-card-body">

            <div class="service-card-top">

              <h3>
                ${service.name || ""}
              </h3>


              ${
                service.price
                  ? `
                    <span class="price">
                      ${service.price}
                    </span>
                  `
                  : ""
              }

            </div>


            ${
              service.description
                ? `
                  <p>
                    ${service.description}
                  </p>
                `
                : ""
            }

          </div>

        `;


        salonGrid.appendChild(article);

      });

    }


    /* -----------------------------------------------------
       DRESSMAKING
       ----------------------------------------------------- */

    const dressmakingGrid =
      document.getElementById(
        "dressmaking-services"
      );


    if (
      dressmakingGrid &&
      Array.isArray(dressmaking.designs)
    ) {

      dressmakingGrid.innerHTML = "";


      dressmaking.designs.forEach((design) => {

        const article =
          document.createElement("article");

        article.className =
          "service-card";


        article.innerHTML = `

          ${
            design.image
              ? `
                <img
                  src="${design.image}"
                  alt="${design.name || "Dressmaking service"}"
                  loading="lazy"
                >
              `
              : ""
          }


          <div class="service-card-body">

            <div class="service-card-top">

              <h3>
                ${design.name || ""}
              </h3>


              ${
                design.price
                  ? `
                    <span class="price">
                      ${design.price}
                    </span>
                  `
                  : ""
              }

            </div>


            ${
              design.description
                ? `
                  <p>
                    ${design.description}
                  </p>
                `
                : ""
            }

          </div>

        `;


        dressmakingGrid.appendChild(article);

      });

    }


    /* -----------------------------------------------------
       GALLERY
       ----------------------------------------------------- */

    const galleryGrid =
      document.getElementById(
        "gallery-grid"
      );


    if (
      galleryGrid &&
      Array.isArray(gallery.photos)
    ) {

      galleryGrid.innerHTML = "";


      gallery.photos.forEach(
        (photo, index) => {

          if (!photo.image) return;


          const figure =
            document.createElement("figure");


          if (
            index === 0 ||
            index === 3
          ) {

            figure.className =
              "g-tall";

          }


          figure.innerHTML = `

            <img
              src="${photo.image}"
              alt="${
                photo.caption ||
                "Yasaraa Salon & Dress Making"
              }"
              loading="lazy"
            >

            ${
              photo.caption
                ? `
                  <figcaption>
                    ${photo.caption}
                  </figcaption>
                `
                : ""
            }

          `;


          galleryGrid.appendChild(
            figure
          );

        }
      );

    }


    /* -----------------------------------------------------
       REVIEWS
       ----------------------------------------------------- */

    const reviewsGrid =
      document.getElementById(
        "reviews-grid"
      );


    if (
      reviewsGrid &&
      Array.isArray(reviews.reviews)
    ) {

      reviewsGrid.innerHTML = "";


      reviews.reviews.forEach((review) => {

        const blockquote =
          document.createElement(
            "blockquote"
          );


        const rating =
          Math.max(
            1,
            Math.min(
              5,
              Number(review.rating) || 5
            )
          );


        blockquote.innerHTML = `

          <div class="stars">
            ${"★".repeat(rating)}
          </div>


          ${
            review.review
              ? `
                <p>
                  ${review.review}
                </p>
              `
              : ""
          }


          <footer>
            ${review.name || "Yasaraa client"}
          </footer>

        `;


        reviewsGrid.appendChild(
          blockquote
        );

      });

    }


  } catch (error) {

    console.error(
      "Could not load Yasaraa CMS content:",
      error
    );

  }

}


/* ---------------------------------------------------------
   FOOTER YEAR
   --------------------------------------------------------- */

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* ---------------------------------------------------------
   START
   --------------------------------------------------------- */

activateTab("salon");

loadCMSContent();
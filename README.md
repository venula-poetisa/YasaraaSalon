# Suvasa Studio — Website (Draft 2, full rebuild)

Lightweight static site: plain HTML/CSS/JS, no build step, ready for GitHub Pages.

## Structure
```
index.html      → all page content, in commented sections (Header, Hero, Facts strip,
                   About, Salon services, Dressmaking services, Process, Gallery,
                   Testimonials, CTA banner, Contact, Footer)
css/style.css   → all styling. Colour/font/spacing variables are at the top under :root
js/script.js    → mobile menu toggle, active nav-link highlighting, footer year
```

## Everything here is sample/placeholder content
- Business name: "Suvasa Studio" — find/replace throughout `index.html`
- Founder name: "Mrs. Chandrika Perera"
- Phone: `+94 81 234 5678`, WhatsApp: `+94 77 123 4567`, email: `hello@suvasastudio.lk`
- Address: "142 Peradeniya Road, Kandy, Sri Lanka" (also update the `<title>` and meta description)
- All prices (marked in Rs.) and the opening hours table
- Testimonial names and quotes
- All photos are stock placeholders from Unsplash — swap every `<img src="...">` in the
  Hero, About, Salon, Dressmaking, and Gallery sections for real photos
- Social links (`href="#"` for Facebook/Instagram)
- The map box in Contact — replace with a real Google Maps `<iframe>` embed once the
  address is confirmed (a commented example is left in the HTML right above it)

## Replacing gallery photos
Each photo is one `<img>` inside a `<figure>` in the `#gallery` section, with a
`<figcaption>` underneath it for the label. Swap `src` for a real photo path
(e.g. `images/bridal-1.jpg`) and edit the caption text. Photos roughly 800px+ wide
work well; the two figures with the class `g-tall` are intentionally taller in the
grid for visual variety — keep that in mind if you reorder them.

## Hosting on GitHub Pages
1. Push this folder to a GitHub repo.
2. In the repo settings → Pages, set the source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

# [Business Name] — Website (Draft 1)

Lightweight static site: plain HTML/CSS/JS, no build step, ready for GitHub Pages.

## Structure
```
index.html      → all page content, in sections (Hero, About, Salon, Dressmaking, Process, Gallery, Testimonials, Contact, Footer)
css/style.css   → all styling, colour and font variables at the top under :root
js/script.js    → mobile menu toggle + footer year
```

## Things marked as placeholders (search for these in index.html)
- `[Business Name]`, `[Founder Name]`, `[Town/City]`, `[Street Address]`, `[Year]`
- Phone/WhatsApp numbers: `+94XXXXXXXXX`
- Email: `hello@example.com`
- All prices marked with `*`
- Client names in Testimonials
- Social links (`href="#"` for Facebook/Instagram)
- The map section (currently a placeholder box — swap for a real Google Maps embed once you have the address)

## Replacing gallery photos
Each photo is one `<img>` inside `<figure>` in the `#gallery` section. Just swap the `src` for a real photo path (e.g. `images/bridal-1.jpg`) and update the `<figcaption>` text. Square photos around 800×800px work best.

## Hosting on GitHub Pages
1. Push this folder to a GitHub repo.
2. In the repo settings → Pages, set the source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

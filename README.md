# Yasaraa Salon & Dress Making — Website

Lightweight static site: plain HTML/CSS/JS, no build step, ready for GitHub Pages.
Content (business info, services, gallery, reviews) is editable through a
Decap CMS admin panel at `/admin/` without touching code.

## Structure
```
index.html          → all page content (Header, Hero, About, Services tabs,
                       Gallery, Testimonials, CTA, Contact, Footer)
style.css            → all styling. Colour/font/spacing variables at the top under :root
script.js            → mobile menu, service tabs, loads content from /content/*.json, footer year
admin/index.html     → Decap CMS entry point (visit yoursite.com/admin/ to edit content)
admin/config.yml     → Decap CMS schema — defines the editable fields
content/
  business.json      → name, about text, phone, WhatsApp, address, hours
  salon.json         → salon services (name, description, price, photo)
  dressmaking.json   → dressmaking designs (name, description, price, photo)
  dress-hiring.json  → dresses available to hire (name, description, price, photo)
  gallery.json        → gallery photos + captions
  reviews.json        → client reviews + star rating
images/              → uploaded photos land here via the CMS
```

## Services shown on the site
The Services section now has **three** tabs: **Salon**, **Dressmaking**, and
**Dress Hiring**. Each tab pulls its cards from its own JSON file in
`content/`, so adding another category later just means: add a new tab button
+ panel in `index.html`, a render call in `script.js`, a `content/*.json`
file, and a matching collection in `admin/config.yml`.

## Editing content
- **Easiest:** deploy with Netlify + enable Netlify Identity & Git Gateway,
  then go to `yoursite.com/admin/` and edit everything (including uploading
  photos) through the CMS UI — no code required.
- **Manual:** edit the JSON files directly in `content/` and commit.

## What still needs real content
- Prices are placeholders where blank — fill in what you charge.
- No photos are set yet (`"image": ""` everywhere) — add real photos either
  through `/admin/` (they'll land in `images/`) or by pointing `image` at a
  file in `images/` directly.
- `gallery.json` and `reviews.json` are currently empty arrays — the site
  shows a friendly "coming soon" message until you add entries.
- The Contact section has a placeholder map box — swap in a real Google Maps
  `<iframe>` once you're happy with the listed address.
- Social links (Facebook/Instagram) aren't wired up yet.

## Hosting on GitHub Pages
1. Push this folder to a GitHub repo (root of the repo, not a subfolder).
2. In the repo settings → Pages, set the source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

Note: the Decap CMS `git-gateway` backend needs Netlify (Identity + Git
Gateway) to handle logins — GitHub Pages alone will host the site fine, but
won't power the `/admin/` login by itself.

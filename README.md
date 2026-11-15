# RAIZ BRAZIL – Shopify Theme

Shopify Online Store 2.0 theme for **RAIZ BRAZIL**: an editorial, modern tropical boutique for Brazilian beachwear, beach & living and (later) Brazilian beauty. German is the primary language; English and Brazilian Portuguese are prepared.

Built on [Shopify Dawn](https://github.com/Shopify/dawn) (MIT, see `LICENSE.md`). All native Shopify functionality – products, variants, collections with filtering, cart, predictive search, customer accounts, localization (Markets), checkout – is untouched Dawn code. No build step, no dependencies: Liquid, JSON templates, CSS and vanilla JS.

## What was added to Dawn

| Area | Files |
|---|---|
| Brand design tokens & overrides | `assets/raiz-base.css`, colour schemes/fonts in `config/settings_data.json` |
| New sections | `raiz-hero`, `raiz-editorial`, `raiz-collection-tiles`, `raiz-trust-bar`, `raiz-owner-notice` (editor-only) |
| Snippets | `raiz-image` (responsive image / placeholder), `raiz-icon` |
| Templates (German content) | `index`, `product`, `collection`, `page.about`, `page.faq`, `page.contact`, `page.legal` |
| Footer | new **legal links menu** setting |
| Locales | `de` (default), `en`, `pt-BR`; other Dawn locales removed |

Palette: cream `#FAF6EE`, sand `#EFE6D6`, terracotta `#A8492E`, forest `#2F4A3A`, ocean `#3B6A80`, ink `#2A2622` (all text pairings ≥ WCAG AA 4.5:1). Fonts: Cormorant (headings) + Jost (body) from Shopify's font library.

## Installation

Requires [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) 3.x and Node 18+.

```bash
npm install -g @shopify/cli
shopify auth login --store YOUR-STORE.myshopify.com
shopify theme dev --store YOUR-STORE.myshopify.com   # live preview on a development theme
```

Upload as a new, **unpublished** theme:

```bash
shopify theme push --unpublished --theme "RAIZ BRAZIL v1"
```

> Never run `shopify theme push --live` or push into the live theme without review. `config/settings_data.json` holds the theme settings – pushing it into a theme overwrites that theme's customisations.

## GitHub workflow

1. Create a repository on GitHub and push this folder (`git remote add origin …; git push -u origin main`).
2. Work in feature branches, open pull requests. `.github/workflows/theme-check.yml` runs Shopify Theme Check and JSON validation on every PR.
3. Optional: connect the repo in *Online Store → Themes → Add theme → Connect from GitHub*. Use a dedicated branch (e.g. `staging`) so the live theme is not changed by accident.
4. Locally: `shopify theme check` and `node scripts/validate.js`.

## Shopify configuration (Admin)

**Collections** (handles used by default links): `beachwear`, `beach-living`, `brazilian-beauty`, `new-arrivals`, plus `all`. Assign a collection to each tile in *Customize → Home → Collection tiles* and to *Bestseller*.

**Pages** (Online Store → Pages) and template:
| Page title | Handle | Theme template |
|---|---|---|
| Über uns | `ueber-uns` | `page.about` |
| FAQ | `faq` | `page.faq` |
| Kontakt | `kontakt` | `page.contact` |
| Impressum, Datenschutz, Widerrufsbelehrung, AGB, Versand & Rückgabe | your choice | `page.legal` |

**Menus** (Online Store → Navigation): `main-menu` (header: Beachwear, Beach & Living, Brazilian Beauty, Neuheiten, Über uns), `footer` (FAQ, Kontakt, Versand & Rückgabe …), `legal` (Impressum, Datenschutz, Widerruf, AGB). Select `legal` in *Footer → Legal links menu*. Shopify's own policy pages (*Settings → Policies*) are also linked automatically; remove duplicates in one place.

**Languages:** Settings → Languages → add English and Portuguese (Brazil) and set German as default. Theme UI strings are in `locales/*.json`. Content you typed in the Theme Editor (headings, texts) is translated with Shopify's *Translate & Adapt* app.

**Tone:** copy uses the informal "du" (consistent with Dawn's German locale). Switch to "Sie" by editing `locales/de.default.json` and the template texts.

## Theme configuration

Everything is editable in the Theme Editor (*Customize*): hero, editorial blocks, tiles, trust bar, announcement bar, colours (*Theme settings → Colors*, 5 schemes), typography, buttons, cards, footer, social links. Add sections via "Add section → RAIZ …".

## Replacing images

The theme ships **no photography**; empty image slots show Shopify's neutral illustrations. Upload your own licensed photos in the Theme Editor (hero: ≥ 2400 px wide, landscape; set the focal point for mobile crops). Add alt text for meaningful images. Collection tiles use the collection image unless overridden.

## Deployment checklist

1. Push to an unpublished theme and preview on desktop + mobile.
2. Complete the owner list below.
3. Test a full order (Shopify test mode/Bogus gateway), account creation, search, language/country switch.
4. Run PageSpeed on the preview URL.
5. Only then publish the theme from *Online Store → Themes*.

## Missing before launch – owner actions

**Assets:** logo (SVG/PNG) and favicon; hero, editorial, About and tile photography (licensed or your own); social share image.

**Business/legal information (not provided by the theme, must be supplied and reviewed by a qualified person):**
- Impressum (§ 5 DDG), Datenschutzerklärung, Widerrufsbelehrung, AGB, Versand- und Rückgabebedingungen, company name/address/VAT ID/contact data
- Newsletter consent text and double opt-in setup (default text on the home page is a draft)
- Cookie consent / Consent-Management (Shopify Customer Privacy settings or an app)
- Tax and price display ("inkl. MwSt."), shipping rates/zones, delivery times, Grundpreis where required
- Product facts: materials, sizes, care instructions, origin claims. No certifications or supplier claims are made by the theme.

**Shopify configuration:** products and collections, payments (Settings → Payments), shipping & taxes, Markets/languages, checkout branding, customer accounts, notification e-mails (German), email marketing app, domain.

**Content to write/verify:** About page (real founder story, artisan/partner details), FAQ answers (currently refer to your policy pages), contact details, trust-bar texts, announcement text. The Theme Editor shows orange "Hinweis für Shop-Betreiber" notices on About, FAQ, Contact and legal templates; they are hidden from customers – delete them when done.

**Hero copy:** headline is `A LITTLE PIECE OF BRAZIL.` as briefed; the supporting line is German. English version: *"Discover authentic Brazilian beachwear, beautiful textiles and everyday escapes."*

## Notes

- Quality checks run: Shopify Theme Check (0 offenses, a few documented upstream false positives in `.theme-check.yml`), JSON/JS/CSS validation, visual layout check at 1440 px and 390 px. A live Shopify preview was not possible in the build environment, so test on a development theme.
- No secrets, API keys or store credentials are stored in this repository.

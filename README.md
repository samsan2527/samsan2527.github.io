# Santhosh · personal business portfolio

A static, data-driven portfolio for GitHub Pages. Plain HTML, CSS, and vanilla JavaScript ES modules. No package installation, framework, backend, or build step. Optional motion libraries load from pinned CDN URLs; the site stays usable if they fail.

## Preview

Serve this folder over HTTP (ES modules do not work reliably with `file://`):

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`. Stop the server with Ctrl+C.

## Make it yours

Edit **`js/config.js`** for the owner’s full name, display name, title, location, region, email, LinkedIn, canonical site URL, Web3Forms key, notification preference, and motion settings. Replace `Santhosh [LAST NAME]` before publishing. The visible wordmark uses `displayName`.

Edit **`js/data.js`** for all primary copy, services, industries, technologies, products, and project outlines:

- `content`: home-page copy, navigation labels, process steps, contact choices, industry and technology strips.
- `pillars`: service names and descriptions.
- `solutions`: `id`, `title`, `category`, `summary`, `modules[]`, `features[]`, `integrations[]`, `stack[]`. Adding an entry automatically creates a catalog card, detail page and command-palette entry.
- `caseStudies`: `id`, `title`, `pillar`, `industry`, anonymized `client`, `summary`, `problem`, `solution`, `architecture[]`, `stack[]`, `metrics[]`, `cover`, and `status`. Images belong in `assets/` and paths start with `./assets/`.

The supplied cases are **project outlines**, not claims of delivered results. Their architecture and suggested technology are illustrative. Replace the descriptions with verified implementation details before presenting them as completed case studies. Replace bracketed metrics only when verified. A numeric `metrics[].value` animates when visible; placeholder strings are never converted to made-up numbers. Update each metric’s `label` and project `status` too. Integration names identify potential scope, not regulatory approval or certification.

`solution.html?id=emr` and `case.html?id=smartlab` render directly from the data. Unknown IDs show a helpful not-found state. The home explorer features EMR, CRM, HRMS, ERP and Finance; the catalog includes all 15 solutions.

### Search and social metadata

Set `siteUrl` to the actual deployed URL, with the repository path and no trailing slash, for example `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY`.

Browser titles, descriptions, structured data and canonical URLs use configuration at runtime. Social crawlers often do not execute JavaScript, so the HTML also contains static metadata. After updating owner details or `siteUrl`, synchronize those tags and generate the sitemap using this **optional, dependency-free publishing helper**:

```sh
node scripts/sync-seo.mjs
```

This is not a build step: the site serves the source files directly. The helper changes only metadata, the no-JavaScript fallback, `sitemap.xml` and `robots.txt`; no markup editing is needed. Until the actual hostname is known, the sitemap is intentionally empty instead of advertising a fabricated URL. Dynamic solution and project pages have unique browser metadata, but their social previews share their respective static detail-page metadata. Distinct crawler-readable social cards for each ID require individual static HTML pages or a rendering service.

`assets/og-image.png` is an original 1200 × 630 share image. `assets/favicon.svg` is the monogram. All case covers are lightweight original SVG architecture illustrations.

## Connect enquiries with Web3Forms

1. Visit [Web3Forms](https://web3forms.com/) and request a free access key using **samsanthosh2596@gmail.com**.
2. Complete email verification and copy the issued key.
3. Replace `WEB3FORMS_KEY` in `config.web3formsKey` with that key. Web3Forms access keys are intended for public client-side forms; do not put private credentials in this site.
4. Submit one real test enquiry on your deployment and confirm email delivery. Configure allowed domains/spam protection in Web3Forms where supported.

The form validates name, email, service interest and a message of at least 10 characters. Company and budget are optional. A hidden `botcheck` honeypot is included. The request has a 15-second timeout, a loading state, explicit success/error states, and an email fallback that preserves the enquiry details. With the placeholder key it shows “not connected yet” and offers email; it does not pretend to send.

API implementation follows the [Web3Forms JavaScript documentation](https://docs.web3forms.com/how-to-guides/js-frameworks/javascript). The site does not store enquiries itself; sending the form transmits the entered details to Web3Forms.

### Optional visit notifications

`notifyOnVisit` defaults to **false**. Set it to `true` after configuring the form key to make one notification attempt per tab session using `sessionStorage`. It includes only page pathname, referrer, ISO timestamp, timezone, language and screen dimensions. It makes no IP lookup or fingerprint. It skips localhost, loopback, automated browsers and common bots. Storage/network failures are silent, and a failed attempt is not retried in the session. Confirm that visitor emails fit your provider’s limits and your intended privacy notice before enabling them.

## Deploy to GitHub Pages

These steps follow [GitHub’s branch publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

1. Create a repository and push these files to its `main` branch, preserving this folder structure. `index.html` must be at the repository root.
2. In GitHub open **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Select **main** and **/ (root)**, then Save.
4. Once GitHub shows the live URL, put it in `config.siteUrl`, run the SEO helper, then commit and push those updates.
5. Visit the live site and test navigation and one real enquiry.

`.nojekyll` is included. Internal scripts, styles, images and links use relative paths, so both `username.github.io/` and `username.github.io/repo-name/` work. External fonts, CDN imports and the contact endpoint intentionally use absolute HTTPS URLs. No GitHub credentials or repository destination were provided, so this project has not been pushed or deployed.

### Add a custom domain later

In **Settings → Pages → Custom domain**, enter the domain. Configure your DNS following [GitHub’s custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). GitHub creates/updates the root `CNAME` file. After DNS resolves, enable HTTPS. Change `config.siteUrl` to the custom HTTPS URL and rerun the SEO helper. Preserve the `CNAME` file on later pushes.

### GitHub Pages 404 paths

The root `404.html` works for missing sibling URLs. On deeply nested nonexistent paths, browsers resolve relative assets against that nested path. GitHub Pages has no rewrite engine. If deep-path error routing is needed after choosing a deployment URL, add a deployment-specific `<base>` only to `404.html` or generate its URLs with that prefix. Normal pages and query-string detail links do not have this limitation.

## Interactions and accessibility

- Command palette: **⌘K / Ctrl+K**, fuzzy search, arrows to navigate, Enter to open, Escape to close. Native dialog focus trapping and focus restoration.
- Solution tabs: Left/Right, Home/End; click or keyboard focus on a module traces its connection. Select a module to open its detail. All 21 EMR modules are included; the mobile diagram becomes a connected list.
- Service panels: pointer hover or button/keyboard activation. Mobile panels stack.
- Header tracks scroll direction, section state and keyboard focus. Native cursor throughout.
- “Pause motion” stops decorative CSS, SVG and WebGL animation. Reduced-motion preference disables scramble, parallax, reveals and smooth scrolling and uses a static CSS aurora. Native scrolling and content remain available without the optional libraries.
- Canvas uses layered simplex/FBM shader planes, particles and a perspective grid. Pixel ratio is capped at 1.75, with fewer planes on mobile; it pauses when hidden or outside the hero viewport. Device tilt is used only if already available, without requesting permission.
- Fonts come from Google Fonts. Motion uses three.js 0.169.0, GSAP/ScrollTrigger 3.12.5, and Lenis 1.1.18 via jsDelivr. [Three.js documents CDN module imports here](https://threejs.org/manual/pages/installation.html).

## Verification

Run `node scripts/check.mjs` for dependency-free integrity and isolated behavior checks (no real enquiries are sent). See `QA.md` for the checks actually completed and any remaining deployment checks. Lighthouse targets are goals, not guaranteed scores: test the published URL with mobile throttling, where the actual host, CDN/font delivery and caching can be measured. The contact endpoint needs a real key for end-to-end email-delivery verification.

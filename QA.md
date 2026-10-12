# Verification record

Checked locally on 12 October 2026. No real enquiry or visit-notification emails were sent.

## Completed

- `node scripts/check.mjs`: **177 checks passed**. Includes JavaScript syntax, local asset references, unique content IDs, all 15 products / 10 cases / 21 EMR modules, relative HTML asset paths, the six AI application links, and complete storyboard coverage for all 15 software products.
- Contact module tested with isolated DOM/network doubles: invalid fields, missing key, email fallback, successful request, failed request preserving content, button recovery, honeypot suppression, payload subject and `botcheck`.
- Notification module tested with isolated network/storage doubles: disabled setting, localhost exclusion, automated-browser exclusion, one attempt per session, expected metadata, silent failures and no retry.
- Served with Python’s static HTTP server; homepage, catalog, product detail, work archive, case detail and 404 page loaded in Safari. Server logs showed successful local asset requests, with no missing requested assets during the checks.
- Previously inspected catalog, project archive, project detail and 404. After the redesign, inspected the fluid homepage, AI panels and software storyboard in dark and light modes, plus the product-detail theme.
- Inspected narrow-window / browser-zoom reflow for the homepage, product modules and contact form. This was a desktop browser reflow check, not a physical-device test.
- Tested AI switching from custom chatbots to MCP with keyboard navigation. Tested software next control (EMR → Insurance), selection of Mobile apps, and Right-arrow navigation to HR Software; panel content, position and detail link updated correctly.
- Verified light-mode persistence when navigating to HR Software detail and back to the homepage, and dark-mode persistence after reload.
- Verified software carousel wraparound from EMR (01/15) to Branding (15/15) using the previous control.
- Checked the redesigned homepage at a narrow Safari window with browser zoom (approximately a 383px CSS viewport); navigation expands and closes on section selection, and the storyboard reflows with horizontally scrollable product tabs.
- Tested ⌘K palette opening, “emr” search, and Enter navigation to the correct product page.
- Tested project filtering: Automation selected and exactly four relevant project cards shown, with an accessible result-count announcement.
- Tested form validation in the browser: inline errors displayed and focus moved to the first invalid field. Valid dummy data with the placeholder key showed the explicit “not connected” state and a mailto fallback preserving the enquiry.
- Loaded the homepage through `/repo-name/index.html` on a second local static server; scripts, styles, images and generated internal links retained the repository prefix.
- Moved font loading out of CSS `@import` to a direct stylesheet link to remove an extra discovery dependency.
- Corrected duplicate metadata nodes and preserved node positioning during FLIP animations.

## Remaining checks before public launch

- Enter the real full name, Web3Forms access key and final `siteUrl` in `js/config.js`.
- Run `node scripts/sync-seo.mjs` after setting the URL to generate absolute sitemap and social URLs.
- Replace illustrative project details and bracketed metrics with verified information, or retain their explicit outline labels.
- Test one real enquiry and confirm delivery to the owner’s inbox.
- Run Lighthouse against the deployment. **90+ performance / 100 accessibility / 100 SEO have not been measured or certified.** Browser developer-console inspection and an automated accessibility audit were not available in this verification pass; no claim of a clean console or perfect accessibility score is made.
- Check exact 360px and 2560px viewports, physical iOS/Android behavior, live reduced-motion changes, a blocked-CDN scenario, WebGL-unavailable fallback on target devices. Code paths are implemented, but these environments were not exhaustively exercised here.
- Validate GitHub’s deep-path 404 behavior if that routing matters; the README describes the relative-path limitation.

The local checks are repeatable without installing dependencies. Preview commands and deployment instructions are in `README.md`.

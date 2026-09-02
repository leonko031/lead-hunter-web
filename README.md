# Lead Hunter, sales page

The published page is `index.html`, a self-contained build. `src-lead-hunter-67.html`
is the source fragment it is built from; `preview.sh` rebuilds one from the other.

`set-links.py` fills in the checkout link, the founder name and the support address
across all seven buttons at once. `stripe_setup.py` creates or reuses the Stripe
product, price and payment link. `CHECKOUT.md` is the comparison that decided how the
checkout is configured.

Every product claim on this page was checked against the scraper's source before it
shipped. Do not add a number, a duration or a count without measuring it first.

## Which file is the source of truth for copy

`index.html` is the live page and the only copy that matters. It is a Claude Design
bundle; the text lives on one long line inside it, with `"` stored as `\"` and `/` as
`\u002F`. Edit it with an exact-string replacement script, never by hand.

`src-lead-hunter-67.html` is the older Tailwind build and is now behind the bundle on
copy. Keep it for the tooling around it, do not treat its wording as current.

## Copy standards in force

No em or en dashes anywhere. No: powerful, revolutionary, game-changing, unlock,
supercharge, seamless, effortless, AI-powered, 10x. No results, revenue, reply-rate or
income claims. Every product fact traces to the scraper's source. USP order: the first
screen sells what the buyer walks away with, never the QA mechanism.

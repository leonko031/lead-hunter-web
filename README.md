# Lead Hunter, sales page

The published page is `index.html`, a self-contained build. `src-lead-hunter-67.html`
is the source fragment it is built from; `preview.sh` rebuilds one from the other.

`set-links.py` fills in the checkout link, the founder name and the support address
across all seven buttons at once. `stripe_setup.py` creates or reuses the Stripe
product, price and payment link. `CHECKOUT.md` is the comparison that decided how the
checkout is configured.

Every product claim on this page was checked against the scraper's source before it
shipped. Do not add a number, a duration or a count without measuring it first.

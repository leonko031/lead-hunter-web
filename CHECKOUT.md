# Making the checkout look like theoperatorstack.io

I opened their checkout for the $67 Copy Machine and compared it with yours line
by line. Here is what differs and what it takes to close each gap.

| | theirs | yours now |
|---|---|---|
| address | `pay.theoperatorstack.io` | `buy.stripe.com/8x2fZi...` |
| header | logo mark plus "The Operator Stack" | grey building icon plus "LeadHunter" |
| summary panel | cream, on brand | Stripe default white |
| description | shown under the name | hidden behind "View details" |
| currency | buyer picks EUR or USD | USD only |
| business name field | yes, optional | **yes, optional** |
| line under Pay | "Invoice issued after payment..." | blocked, see below |

## Done through the API

The business name field is added. It is the B2B signal on their checkout and it
costs the buyer nothing, since it is optional.

## Blocked, and why

Your account runs **Managed Payments**, which means Stripe is the merchant of
record and handles VAT for you. Two things come with that:

- `custom_text` is refused. Stripe writes the small print itself, because it is
  the seller of record, not you.
- `adaptive_pricing` is refused on the payment link for the same reason.

That is a good trade. Their custom line is worth less than not filing OSS returns
yourself. The same reassurance already sits on your own page, right under the
price button, where you control it.

## Four things only you can do

**1. Branding.** Settings → Business → Branding. Upload a logo, set the accent to
your lime `#b6ff3d` and the background to something warm rather than white. This
is the single biggest visual difference and it takes five minutes.

**2. The account name.** Your checkout header says `LeadHunter`, one word. Their
header says `The Operator Stack`. Settings → Business → Public details, set it to
`Lead Hunter` with the space, the way the page writes it everywhere else.

**3. Custom domain.** Settings → Checkout and Payment Links → custom domain. Point
`pay.yourdomain.com` at Stripe with the CNAME they give you. Then your checkout
lives on your own domain the way theirs does. This needs the domain you are going
to publish the page on, so do it after the page is live.

**4. Adaptive Pricing.** Settings → Payments → Adaptive Pricing. If it is available
on a Managed Payments account it is an account-level toggle, not a per-link one,
which is why the API refused it. Turning it on gives EU buyers the euro price
next to the dollar one, exactly like theirs.

## What was copied from their page, not their checkout

Every CTA on their product page carries the price: "Install it, $67". Yours
already does: "Get Lead Hunter, $67".

Their browser tab reads "The Copy Machine - $67 - The Operator Stack". Yours now
reads "Lead Hunter - $67 - twenty local businesses you can pitch", and the page
has a meta description for the first time.

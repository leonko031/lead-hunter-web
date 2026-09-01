#!/usr/bin/env python3
"""Create, or reuse, the Lead Hunter product, price and payment link in Stripe.

    python3 stripe_setup.py --check
    python3 stripe_setup.py --download https://your.host/LeadHunter.zip
    python3 stripe_setup.py --download https://your.host/LeadHunter.zip --tax

It never creates a second copy of something that already exists. If you already
made the product by hand in the dashboard, it finds it by name and builds on it.

Nothing here charges, refunds, or moves money. It only creates the listing.
The key is read from stripe.key, never from the command line.
"""

from __future__ import annotations

import argparse
import base64
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
API = "https://api.stripe.com/v1"
NAME = "Lead Hunter"
AMOUNT = 6700
CURRENCY = "usd"


def load_key() -> str:
    path = ROOT / "stripe.key"
    if not path.exists():
        sys.exit("stripe.key is missing. Put a RESTRICTED key in it:\n"
                 "  printf 'rk_live_xxx' > stripe.key && chmod 600 stripe.key")
    key = path.read_text(encoding="utf-8").strip()
    if key.startswith("sk_"):
        sys.exit("That is a full secret key. Make a RESTRICTED key (rk_) with write access to\n"
                 "Products, Prices and Payment links only, and use that instead.")
    if not key.startswith("rk_"):
        sys.exit("stripe.key does not look like a Stripe key.")
    return key


def call(key: str, method: str, path: str, params=None):
    url = API + path
    data = None
    if params:
        encoded = urllib.parse.urlencode(params, doseq=True)
        if method == "GET":
            url += "?" + encoded
        else:
            data = encoded.encode("utf-8")
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "Basic " + base64.b64encode((key + ":").encode()).decode())
    req.add_header("User-Agent", "lead-hunter-setup/1.0")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        try:
            msg = json.loads(body)["error"]["message"]
        except Exception:
            msg = body[:300]
        sys.exit("Stripe said no (%s): %s" % (e.code, msg))


def find_product(key: str):
    for p in call(key, "GET", "/products", {"active": "true", "limit": 100}).get("data", []):
        if p.get("name", "").strip().lower() == NAME.lower():
            return p
    return None


def find_price(key: str, product_id: str):
    for p in call(key, "GET", "/prices",
                  {"product": product_id, "active": "true", "limit": 100}).get("data", []):
        if (p.get("unit_amount") == AMOUNT and p.get("currency") == CURRENCY
                and p.get("type") == "one_time"):
            return p
    return None


def find_link(key: str, price_id: str):
    res = call(key, "GET", "/payment_links",
               {"active": "true", "limit": 100, "expand[]": "data.line_items"})
    for link in res.get("data", []):
        for item in (link.get("line_items") or {}).get("data", []):
            if (item.get("price") or {}).get("id") == price_id:
                return link
    return None


def confirmation(download: str) -> str:
    if download:
        return ("Your download is ready. Keep this link: %s\n\n"
                "A copy is on its way to your email. Fourteen days to change your mind: run one "
                "search in your own city, and if the file is not worth what you paid, reply to "
                "that email and ask." % download)
    return ("Thanks. Your download link is on its way to your email, usually within a few "
            "minutes.\n\nFourteen days to change your mind: run one search in your own city, and "
            "if the file is not worth what you paid, reply to that email and ask.")


def main() -> int:
    ap = argparse.ArgumentParser(description="Set up the Lead Hunter listing in Stripe.")
    ap.add_argument("--download", default="", help="public URL of LeadHunter.zip")
    ap.add_argument("--tax", action="store_true", help="turn on automatic tax (configure Stripe Tax first)")
    ap.add_argument("--check", action="store_true", help="report what exists, create nothing")
    args = ap.parse_args()
    key = load_key()

    product = find_product(key)
    price = find_price(key, product["id"]) if product else None
    link = find_link(key, price["id"]) if price else None

    if args.check:
        print("product      : %s" % (product["id"] if product else "not found"))
        print("price 67 usd : %s" % (price["id"] if price else "not found"))
        print("payment link : %s" % (link["url"] if link else "not found"))
        return 0

    if product:
        print("product      : %s  (reusing what is already there)" % product["id"])
    else:
        product = call(key, "POST", "/products", {
            "name": NAME,
            "description": ("Nine tools in one folder. Local business leads, scored, with twenty "
                            "profiles that each end with what to sell and what to charge."),
        })
        print("product      : %s  (created)" % product["id"])

    if price:
        print("price 67 usd : %s  (reusing)" % price["id"])
    else:
        price = call(key, "POST", "/prices", {
            "product": product["id"], "unit_amount": AMOUNT, "currency": CURRENCY,
        })
        print("price 67 usd : %s  (created)" % price["id"])

    if link:
        print("payment link : %s  (already existed)" % link["url"])
    else:
        params = {
            "line_items[0][price]": price["id"],
            "line_items[0][quantity]": 1,
            "billing_address_collection": "required",
            "allow_promotion_codes": "false",
            "automatic_tax[enabled]": "true" if args.tax else "false",
            "after_completion[type]": "hosted_confirmation",
            "after_completion[hosted_confirmation][custom_message]": confirmation(args.download),
        }
        link = call(key, "POST", "/payment_links", params)
        print("payment link : %s  (created)" % link["url"])

    print("\nNow put it on the page:")
    print("  python3 set-links.py --checkout %s" % link["url"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

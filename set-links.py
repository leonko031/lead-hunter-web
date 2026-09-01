#!/usr/bin/env python3
"""Fill in the things only the owner knows: checkout URL, name, support address.

    python3 set-links.py --checkout https://buy.stripe.com/xxxx
    python3 set-links.py --name "Leon Ilisin" --support hello@yourdomain.com
    python3 set-links.py --checkout https://buy.stripe.com/yyyy      # run again to change it

Safe to run as many times as you like. It matches a marker comment rather than the
current value, so a second run replaces a link that a first run already set.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

PAGE = Path(__file__).resolve().parent / "lead-hunter-67.html"
MARKER = "<!-- checkout -->"
OLD_MARKER = "<!-- TODO: point this at your checkout -->"


def main() -> int:
    p = argparse.ArgumentParser(description="Fill in the owner-supplied details on the sales page.")
    p.add_argument("--checkout", help="your Stripe payment link")
    p.add_argument("--name", help="the name that signs the 'why this exists' section")
    p.add_argument("--support", help="the address people write to")
    args = p.parse_args()
    if not any([args.checkout, args.name, args.support]):
        p.error("nothing to do. Pass at least one of --checkout, --name, --support.")

    s = PAGE.read_text(encoding="utf-8")
    before = s
    report = []

    # Normalise the marker so this stays re-runnable after the first pass.
    s = s.replace(OLD_MARKER, MARKER)

    if args.checkout:
        if not args.checkout.startswith("https://"):
            sys.exit("The checkout link has to start with https://")
        # Replace the href of the first <a ...> after each marker, whatever it holds now.
        pattern = re.compile(r"(%s\s*\n\s*<a\s+)href=\"[^\"]*\"" % re.escape(MARKER))
        s, n = pattern.subn(lambda m: m.group(1) + 'href="%s"' % args.checkout, s)
        report.append("%d checkout links set" % n)
        if n != s.count(MARKER):
            report.append("WARNING: %d markers but %d links set, check the file"
                          % (s.count(MARKER), n))

    if args.name:
        pattern = re.compile(r"(<p class=\"mt-8 font-mono text-sm text-\[#8f8f96\]\">)[^<]*?(&middot;)")
        s, n = pattern.subn(lambda m: m.group(1) + args.name + " " + m.group(2), s)
        report.append("%d signature set" % n)

    if args.support:
        s = s.replace("<!-- TODO: drop in your support address -->", "<!-- support -->")
        # The refund answer is where people look for an address. Put a real one in it.
        answer = ('Fourteen days from purchase. Write to '
                  '<a href="mailto:%s" class="text-lime-300 underline underline-offset-4 '
                  'decoration-lime-300/40 hover:decoration-lime-300">%s</a> '
                  'and you get your money back.') % (args.support, args.support)
        pattern = re.compile(r'(<!-- support -->\s*\n\s*<p class="pb-6 pr-10 text-neutral-400">).*?(</p>)',
                             re.S)
        s, n = pattern.subn(lambda m: m.group(1) + answer + m.group(2), s)
        report.append("%d support address set" % n)

    # Re-running with the same value is a no-op, not a failure. Only a marker that
    # cannot be found is a failure, because then nothing was set at all.
    if not any(int(line.split()[0]) for line in report if line[0].isdigit()):
        print("No markers matched. Check that the comment markers are still in the page.")
        return 1
    if s == before:
        print("Already set to those values, nothing to change.")
        return 0
    PAGE.write_text(s, encoding="utf-8")
    for line in report:
        print(line)
    left = s.count('href="#"')
    print("remaining empty links: %d" % left)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

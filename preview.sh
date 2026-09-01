#!/usr/bin/env bash
# Rebuild the standalone preview from the source block and open it fresh.
#
# The problem this solves: `open file.html` will happily switch to a tab the browser
# already has, and show you the cached render from an hour ago. Appending a changing
# query string makes it a different URL every time, so the browser has to re-read it.
set -euo pipefail
cd "$(dirname "$0")"

SRC="lead-hunter-67.html"
OUT="lead-hunter-67-preview.html"

python3 - "$SRC" "$OUT" <<'PY'
import sys
src, out = sys.argv[1], sys.argv[2]
frag = open(src, encoding='utf-8').read()
open(out, 'w', encoding='utf-8').write(
    '<!doctype html><html lang="en"><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1">'
    '<meta http-equiv="Cache-Control" content="no-store">'
    '<title>Lead Hunter - $67 - twenty local businesses you can pitch</title>'
    '<meta name="description" content="One sentence, a few hundred local businesses, twenty of them profiled with what to sell and what to charge. Nine tools in one folder, $67 paid once.">'
    '<script src="https://cdn.tailwindcss.com"></script>'
    '<style>body{margin:0;background:#08080a}</style></head><body>\n'
    + frag + '\n</body></html>')
PY

# The local server serves a copy in the session scratchpad. Regenerate that too, or the
# localhost URL quietly serves whatever was there an hour ago. That mistake cost a round.
SCRATCH="/private/tmp/claude-501/-Users-leonilisin/fa81bd7f-b037-4b2d-bde2-4403c578dcfa/scratchpad/lh/lh67.html"
[ -d "$(dirname "$SCRATCH")" ] && cp "$OUT" "$SCRATCH" && echo "synced the served copy too"

STAMP=$(date +%s)
open "file://$(pwd)/$OUT?v=$STAMP"
echo "opened $OUT  (cache-buster v=$STAMP)"

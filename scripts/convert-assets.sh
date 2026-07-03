#!/bin/bash
# One-time asset prep: rasterize source PDFs into optimized web images.
# Run from the project root: bash scripts/convert-assets.sh
set -e

SRC_ILLUS="/Users/Projet Bachelor/Portfolio /Dossier portfolio pour claude/Illustration"
SRC_LIVR="/Users/Projet Bachelor/Portfolio /Dossier portfolio pour claude/Livrables de communication"
OUT_ILLUS="./assets/img/illustration"
OUT_LIVR="./assets/img/livrables"
MAXDIM=1800

extract() {
  xcrun swift scripts/pdf-page-extract.swift "$1" "$2" "$3" "$MAXDIM"
}

echo "== Illustration category =="
extract "$SRC_ILLUS/Laura Twitch /emote 1.pdf" 0 "$OUT_ILLUS/laura-emote-raw.png"
extract "$SRC_ILLUS/Docklight LYSAA/Docklight Logo.pdf" 0 "$OUT_ILLUS/docklight-logo-raw.png"
extract "$SRC_ILLUS/Docklight LYSAA/docklight token.pdf" 0 "$OUT_ILLUS/docklight-token-raw.png"
extract "$SRC_ILLUS/Docklight LYSAA/Docklight mascotte.pdf" 0 "$OUT_ILLUS/docklight-mascotte-raw.png"
extract "$SRC_ILLUS/Docklight LYSAA/forme contreforme.pdf" 0 "$OUT_ILLUS/docklight-forme-raw.png"
extract "$SRC_ILLUS/souvenir d'une inconnue/souvenir de l'inconnue.pdf" 0 "$OUT_ILLUS/souvenir-raw.png"
extract "$SRC_ILLUS/No AI /robia.pdf" 0 "$OUT_ILLUS/robia-raw.png"

echo "== Livrables de communication category =="
extract "$SRC_LIVR/Jika/AffichetteProp1V2.pdf" 0 "$OUT_LIVR/jika-affichette-raw.png"
extract "$SRC_LIVR/Jika/CartdinvProp1_V3.pdf" 0 "$OUT_LIVR/jika-cartinv-raw.png"
extract "$SRC_LIVR/Jika/Post FVProp1_V3.pdf" 0 "$OUT_LIVR/jika-post-fv-raw.png"

echo "== Branding guide (curated spreads) =="
BRANDING="$SRC_LIVR/Office nottarial du duc/Branding guide lassaleV3 (1).pdf"
extract "$BRANDING" 0  "$OUT_LIVR/branding-guide-01-cover-raw.png"
extract "$BRANDING" 2  "$OUT_LIVR/branding-guide-02-concept-raw.png"
extract "$BRANDING" 6  "$OUT_LIVR/branding-guide-03-colors-raw.png"
extract "$BRANDING" 9  "$OUT_LIVR/branding-guide-04-badge-raw.png"
extract "$BRANDING" 13 "$OUT_LIVR/branding-guide-05-mockup-raw.png"

echo "== Instagram JPGs (already web-ready, just copy) =="
cp "$SRC_LIVR/nos amies lointain/Nos_amies_lointain-P_INSTA.jpg" "$OUT_LIVR/nos-amies-p.jpg"
cp "$SRC_LIVR/nos amies lointain/Nos_amies_lointain-S_INSTA.jpg" "$OUT_LIVR/nos-amies-s.jpg"

echo "== Final format pass: raw PNG -> optimized web format =="
# Flat graphic marks that likely need transparency preserved -> PNG (no lossy recompression needed beyond resize).
PNG_KEEP=("docklight-logo" "docklight-token" "docklight-mascotte")

for f in "$OUT_ILLUS"/*-raw.png "$OUT_LIVR"/*-raw.png; do
  dir=$(dirname "$f")
  base=$(basename "$f" -raw.png)
  keep_png=false
  for k in "${PNG_KEEP[@]}"; do
    [ "$base" == "$k" ] && keep_png=true
  done
  if [ "$keep_png" == true ]; then
    cp "$f" "$dir/$base.png"
  else
    sips -s format jpeg -s formatOptions 82 "$f" --out "$dir/$base.jpg" >/dev/null
  fi
  rm "$f"
done

echo "Done. Output in $OUT_ILLUS and $OUT_LIVR"
ls -la "$OUT_ILLUS" "$OUT_LIVR"

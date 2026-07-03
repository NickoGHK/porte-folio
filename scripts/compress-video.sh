#!/bin/bash
# Compress the teaser video for web embedding + extract a poster frame.
# Run from the project root: bash scripts/compress-video.sh
set -e

SRC="/Users/Projet Bachelor/Portfolio /Dossier portfolio pour claude/Livrables de communication/teaser 2.mp4"
OUT_VIDEO="./assets/video/teaser-compressed.mp4"
OUT_POSTER="./assets/img/livrables/teaser-poster.jpg"

echo "== Compressing teaser video via avconvert =="
rm -f "$OUT_VIDEO"
avconvert --source "$SRC" --preset PresetMediumQuality --output "$OUT_VIDEO" --replace --progress

echo "== Extracting poster frame via AVFoundation/Swift =="
xcrun swift scripts/video-frame-extract.swift "$SRC" 2.0 "$OUT_POSTER.png"
sips -s format jpeg -s formatOptions 80 "$OUT_POSTER.png" --out "$OUT_POSTER" >/dev/null
rm -f "$OUT_POSTER.png"

echo "Done."
ls -la "$OUT_VIDEO" "$OUT_POSTER"

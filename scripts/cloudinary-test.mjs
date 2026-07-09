// One-off connectivity check for Cloudinary — not part of the app build.
// Reads credentials from .env.local (never hardcode secrets in this file).
// Run with: node --env-file=.env.local scripts/cloudinary-test.mjs

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const demoImageUrl = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

console.log("Uploading demo image to Cloudinary…");
const uploadResult = await cloudinary.uploader.upload(demoImageUrl, {
  folder: "portfolio-test",
});

console.log("\nUpload result:");
console.log("  secure_url:", uploadResult.secure_url);
console.log("  public_id:", uploadResult.public_id);

const details = await cloudinary.api.resource(uploadResult.public_id);
console.log("\nImage details:");
console.log("  width:", details.width);
console.log("  height:", details.height);
console.log("  format:", details.format);
console.log("  bytes:", details.bytes);

// f_auto: Cloudinary picks the best format for the requesting browser (e.g. AVIF/WebP)
// q_auto: Cloudinary picks the best quality/compression tradeoff automatically
const transformedUrl = cloudinary.url(uploadResult.public_id, {
  fetch_format: "auto",
  quality: "auto",
});

console.log("\nDone! Open the URL below to see the optimized version (check size/format vs the original):");
console.log(transformedUrl);

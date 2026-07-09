// Uploads everything in scratchpad/staged/<project>/* to Cloudinary under
// portfolio/<project>/, and writes a JSON map of project -> [{type, src, poster?}]
// for use when rewriting lib/data.ts.
import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import path from "node:path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const STAGE_DIR = process.argv[2];
if (!STAGE_DIR) {
  console.error("Usage: node upload-to-cloudinary.mjs <staged-dir>");
  process.exit(1);
}

const isVideo = (f) => f.endsWith(".mp4");
const isPoster = (f) => f === "poster.jpg";

async function uploadFile(filePath, folder, resourceType) {
  const publicIdBase = path.basename(filePath).replace(/\.[^.]+$/, "");
  const res = await cloudinary.uploader.upload(filePath, {
    folder: `portfolio/${folder}`,
    public_id: publicIdBase,
    resource_type: resourceType,
    overwrite: true,
  });
  return res.secure_url;
}

async function main() {
  const projects = fs.readdirSync(STAGE_DIR).filter((p) => fs.statSync(path.join(STAGE_DIR, p)).isDirectory());
  const result = {};

  for (const proj of projects) {
    const dir = path.join(STAGE_DIR, proj);
    const files = fs.readdirSync(dir).sort();
    const items = [];
    let posterUrl = null;

    // upload poster first if present, so video entries can reference it
    const posterFile = files.find(isPoster);
    if (posterFile) {
      process.stdout.write(`  uploading ${proj}/${posterFile}...\n`);
      posterUrl = await uploadFile(path.join(dir, posterFile), proj, "image");
    }

    for (const f of files) {
      if (isPoster(f)) continue;
      process.stdout.write(`  uploading ${proj}/${f}...\n`);
      if (isVideo(f)) {
        const url = await uploadFile(path.join(dir, f), proj, "video");
        items.push({ type: "video", src: url, poster: posterUrl });
      } else {
        const url = await uploadFile(path.join(dir, f), proj, "image");
        items.push({ type: "image", src: url });
      }
    }
    result[proj] = items;
    console.log(`✓ ${proj}: ${items.length} item(s)`);
  }

  fs.writeFileSync(
    path.join(STAGE_DIR, "cloudinary-map.json"),
    JSON.stringify(result, null, 2)
  );
  console.log("\nDone. Map written to cloudinary-map.json");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});

/**
 * Verifies all imageUrls in mock-data.ts and generated-products.ts
 * Replaces broken URLs with empty string (which triggers branded placeholder).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FILES = [
  path.join(__dirname, "..", "src", "lib", "mock-data.ts"),
  path.join(__dirname, "..", "src", "lib", "generated-products.ts"),
];

async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    clearTimeout(timeout);
    if (!res.ok) return false;
    const contentLength = parseInt(res.headers.get("content-length") || "0", 10);
    return contentLength > 1000 || !res.headers.get("content-length");
  } catch {
    return false;
  }
}

async function processFile(file) {
  console.log(`\n📄 ${path.basename(file)}`);
  let content = fs.readFileSync(file, "utf8");
  const urls = [...content.matchAll(/imageUrl:\s*"([^"]+)"/g)];
  console.log(`   Found ${urls.length} image URLs`);

  let broken = 0;
  let working = 0;

  // Test in batches of 10
  for (let i = 0; i < urls.length; i += 10) {
    const batch = urls.slice(i, i + 10);
    const results = await Promise.all(
      batch.map(async (m) => ({
        match: m[0],
        url: m[1],
        ok: m[1].trim() === "" ? false : await checkUrl(m[1]),
      })),
    );

    for (const { match, url, ok } of results) {
      if (ok) {
        working++;
      } else {
        broken++;
        const newMatch = match.replace(/"[^"]+"/, '""');
        content = content.replace(match, newMatch);
        console.log(`   ❌ ${url.slice(0, 80)}`);
      }
    }
    process.stdout.write(`   ${i + batch.length}/${urls.length}\r`);
  }

  console.log(`\n   ✅ Working: ${working}`);
  console.log(`   ❌ Broken (cleared): ${broken}`);

  if (broken > 0) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`   💾 Updated file`);
  }
}

for (const file of FILES) {
  if (fs.existsSync(file)) {
    await processFile(file);
  }
}

console.log("\n🎉 Done!");

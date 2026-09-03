import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const lessonsDir = path.join(root, "ai");
const lessonFiles = fs.readdirSync(lessonsDir)
  .filter((name) => /^\d{4}-\d{2}-\d{2}-.+\.html$/.test(name));

function normalizeNotionMarkdown(source) {
  return source
    .replace(/<callout[^>]*>/g, '<div class="callout">')
    .replace(/<\/callout>/g, "</div>")
    .replace(/<table[^>]*>/g, "<table>")
    .replace(/^\t/gm, "")
    .replace(/\*\*([^*\n]+?) \*\*\s*\`([^\`]+)\`\s*\*\*([^*\n]+?)\*\*/g, "**$1 \`$2\`$3**")
    .replace(/([^\n])\n(#{1,6}\s)/g, "$1\n\n$2")
    .replace(/([^\n])\n(- |\d+\. )/g, "$1\n\n$2")
    .replace(/(<\/table>|<\/div>|<\/details>)\n([^\n])/g, "$1\n\n$2");
}

for (const filename of lessonFiles) {
  const filePath = path.join(lessonsDir, filename);
  let html = fs.readFileSync(filePath, "utf8");
  const sourceMatch = html.match(
    /<script type="application\/json" id="lesson-source">([\s\S]*?)<\/script>/
  );
  if (!sourceMatch) throw new Error(`Missing lesson source: ${filename}`);

  const markdown = normalizeNotionMarkdown(JSON.parse(sourceMatch[1]));
  const rendered = spawnSync(
    "pandoc",
    ["--from=markdown+raw_html+tex_math_dollars-yaml_metadata_block", "--to=html5"],
    { input: markdown, encoding: "utf8" }
  );
  if (rendered.status !== 0) {
    throw new Error(`Pandoc failed for ${filename}: ${rendered.stderr}`);
  }

  html = html.replace(
    /<div class="lesson-body" id="lesson-body">[\s\S]*?<\/div><\/article>/,
    `<div class="lesson-body" id="lesson-body">\n${rendered.stdout.trim()}\n</div></article>`
  );
  fs.writeFileSync(filePath, html);
  console.log(`Rendered ${filename}`);
}

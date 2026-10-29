import { readFileSync } from "node:fs";

const query = process.argv.slice(2).join(" ").trim();

if (!query) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const { highlights } = JSON.parse(
    readFileSync(new URL("./notes/keynote-highlights.json", import.meta.url), "utf8"),
  );
  const normalizedQuery = query.toLowerCase();
  const matches = highlights.filter(({ title, summary }) =>
    `${title} ${summary}`.toLowerCase().includes(normalizedQuery),
  );

  for (const { title, summary } of matches) {
    console.log(`${title}: ${summary}`);
  }
}

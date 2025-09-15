/* eslint-disable no-console */
// build.js

import fs from "fs-extra";
import Handlebars from "handlebars";
import path from "path";

const rootDir = path.resolve(); // root of the project

const partialsDir = path.join(rootDir, "partials");
const pagesDir = path.join(rootDir, "pages");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");

await fs.emptyDir(distDir);

// Register custom helpers
Handlebars.registerHelper("eq", (a, b) => a === b);

// Register partials
console.log("Scanning partials directory:");
const partialFiles = await fs.readdir(partialsDir);
console.log(partialFiles);

for (const file of partialFiles) {
  const fullPath = path.join(partialsDir, file);
  const stat = await fs.stat(fullPath);

  if (stat.isFile()) {
    const name = path.parse(file).name;
    const content = await fs.readFile(fullPath, "utf8");
    Handlebars.registerPartial(name, content);
  } else {
    console.warn(`Skipping non-file in partials: ${file}`);
  }
}

// Load layout template... (keep this part)
// const layoutTemplate = Handlebars.compile(
//   await fs.readFile(layoutPath, "utf8")
// );

// Render each page into dist/
console.log("Compiling pages...");
const pageFiles = (await fs.readdir(pagesDir)).filter((f) =>
  f.endsWith(".hbs")
);

for (const file of pageFiles) {
  const name = path.parse(file).name;
  const pageTemplate = Handlebars.compile(
    await fs.readFile(path.join(pagesDir, file), "utf8")
  );
  // const html = layoutTemplate({ content: pageTemplate({}) });
  // No layout, just render page templates directly
  const html = pageTemplate({});

  // If it's the index page, create dist/index.html
  if (name === "index") {
    await fs.writeFile(path.join(distDir, "index.html"), html);
  } else {
    // For all other pages, create a folder and put index.html inside it
    const pageDir = path.join(distDir, name); // e.g., dist/contact-us
    await fs.ensureDir(pageDir);
    await fs.writeFile(path.join(pageDir, "index.html"), html);
  }
}
console.log("Page compilation successful.");

console.log("Copying public assets...");
try {
  if (await fs.pathExists(publicDir)) {
    await fs.copy(publicDir, distDir);
    console.log("Successfully copied public folder contents to dist.");
  } else {
    console.log("No public directory found. Skipping copy.");
  }
} catch (err) {
  console.error("Error copying public folder:", err);
}

/* eslint-disable no-console */
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const args = process.argv.slice(2);
const [inputFile] = args;

if (!inputFile) {
  console.error(
    "Please provide a JavaScript file with relative path to uglify."
  );
  process.exitCode = 1;
}

const inputFilePath = path.resolve(inputFile);

// Get the relative path from the source folder
const relativePath = path.relative("src/js", inputFile);
const outputFilePath = path.resolve(
  "public",
  "js",
  path.dirname(relativePath),
  `${path.basename(inputFile, path.extname(inputFile))}.min.js`
);
const outputDir = path.dirname(outputFilePath);

// Ensure the output directory exists
fs.mkdirSync(outputDir, { recursive: true });

const sourceMapFilePath = `${outputFilePath}.map`;

// const command = `uglifyjs ${inputFilePath} --output ${outputFilePath} --source-map "url=${path.basename(
//   sourceMapFilePath
// )},includeSources"`;

const command = `uglifyjs ${inputFilePath} --output ${outputFilePath} --source-map "url=${path.basename(
  sourceMapFilePath
)},includeSources,root=src/js,base=src/js"`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    console.error(`stderr: ${stderr}`);
    process.exitCode = 1;
  }
  console.log(`Successfully uglified ${inputFile} to ${outputFilePath}`);
});

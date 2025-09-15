/* eslint-disable no-console */
// Used by npm script in package.json for compiling Sass to CSS and add source maps
import { exec } from "child_process";
import path from "path";

// const inputFile = process.argv[2];

// if (!inputFile) {
//   console.error("Please provide a Sass file to compile.");
//   process.exit(1);
// }

// const inputFilePath = path.resolve(inputFile);
const inputFilePath = "src/sass/style.scss";
// const outputFileName = `${path.basename(
//   inputFile,
//   path.extname(inputFile)
// )}.min.css`;
const outputFileName = "style.min.css";
const outputFilePath = path.resolve("public", "css", outputFileName);

const command = `sass "${inputFilePath}" "${outputFilePath}" --source-map --source-map-urls=relative --style=compressed --verbose`;

exec(command, (err, _stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    console.error(`stderr: ${stderr}`);
    process.exit(1);
  } else {
    console.log(`Successfully compiled ${inputFilePath} to ${outputFilePath}`);
  }
});

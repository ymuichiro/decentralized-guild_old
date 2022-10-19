import fs from "fs";
import yaml from "js-yaml";
import openapi from "openapi-typescript";
import path from "path";
import { format } from "prettier";

console.log(
  "\x1b[32m> start convert OpenAPI document to type definition files\x1b[39m"
);

const inputPath = path.resolve("schema", "specfile.yml");
const outputPath = {
  hosting: path.resolve("frontend", "src", "@types", "swagger.ts"),
  server: path.resolve("backend", "src", "@types", "swagger.ts"),
};

/** @type {string} */
const schemaJson = yaml.load(fs.readFileSync(inputPath, "utf-8"));
// makePathsEnum ... サーバー側はPathをフルパスで記述していないため、利用しない
openapi(schemaJson, { makePathsEnum: false }).then((output) => {
  console.log("write result file >>", outputPath.server);
  const result = format(output, {
    singleQuote: true,
    semi: true,
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "es5",
    parser: "typescript",
  });
  fs.writeFileSync(outputPath.server, result);
});

// makePathsEnum ... フロントエンド側はフルパスで指定するため、出力する
openapi(schemaJson, { makePathsEnum: true }).then((output) => {
  console.log("write result file >>", outputPath.hosting);
  const result = format(output, {
    singleQuote: true,
    semi: true,
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "es5",
    parser: "typescript",
  });
  fs.writeFileSync(outputPath.hosting, result);
});

import { expect } from "chai";
import {
  ArgdownApplication,
  ParserPlugin,
  ModelPlugin,
  JSONExportPlugin,
  jsonReplacer
} from "../src/index";

let app = new ArgdownApplication();
let parserPlugin = new ParserPlugin();
app.addPlugin(parserPlugin, "parse-input");
let modelPlugin = new ModelPlugin();
app.addPlugin(modelPlugin, "build-model");
let jsonExport = new JSONExportPlugin();
app.addPlugin(jsonExport, "export-json");

describe("JSONExport", function() {
  it("json replacer can cope with non-Argdown data", function() {
    const data = { test: "Hallo Welt!" };
    const result = JSON.stringify(data, jsonReplacer);
    console.log("result: " + result);
    expect(result).to.not.equal('""');
  });
  it("sanity test", function() {
    let source =
      "[Test]: Hello _World_!\n  +<Argument 1>\n    -[Test]\n\n[Test]: Tschüss!";
    let result = app.run({
      process: ["parse-input", "build-model", "export-json"],
      input: source
    });
    expect(result.json).to.exist;
  });
});

import TemplateImporter from "./templateImporter.js";

const header = new TemplateImporter("header");

header.loadHTML().then(() => header.importElement());

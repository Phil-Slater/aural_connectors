import TemplateImporter from "./templateImporter.js";
import { loadHeaderData } from "./header.js";

const header = new TemplateImporter("header");

header
    .loadHTML()
    .then(async () => header.importElement())
    .then(() => loadHeaderData());

import TemplateImporter from "./templateImporter.js";
import { loadHeaderData } from "./header.js";

const header = new TemplateImporter("header");

header
    .loadHTML()
    .then(async () => header.importElement())
    .then(() => loadHeaderData());

const footer = new TemplateImporter("footer");

footer
    .loadHTML()
    .then(async () => footer.importElement())

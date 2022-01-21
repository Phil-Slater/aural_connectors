import TemplateImporter from "./templateImporter.js";
import { loadHeaderData } from "./header.js";
import { loadFooterEvents } from "./footer.js";

const header = new TemplateImporter("header");

header
    .loadHTML()
    .then(async () => header.importElement())
    .then(() => loadHeaderData());

const footer = new TemplateImporter("footer");

footer
    .loadHTML()
    .then(async () => footer.importElement())
    .then(() => loadFooterEvents());
import TemplateImporter from "./templateImporter.js";
import { getEvents, getVenue } from "./ticketmaster.js";

const header = new TemplateImporter("header");

header.loadHTML().then(() => header.importElement());


const infoDiv = document.getElementById('infoDiv')
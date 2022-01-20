import Geohash from "https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0";
import { getConcerts } from "./ticketmaster.js";
import { displayConcerts } from "./displayConcerts.js";

function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        getGeoHash(position.coords.latitude, position.coords.longitude);
    });
}

function appendGeoHashSearchLink(geoHash) {
    const searchDiv = document.getElementById("search");
    const url = `/search.html?searchTerm=${geoHash}&searchType=geoPoint`;
    searchDiv.insertAdjacentHTML(
        "afterend",
        `
        <button class="button"><a href="${url}">Show more results</a></button>
    `
    );
}

async function getGeoHash(latitude, longitude) {
    const geoHash = Geohash.encode(latitude, longitude, 6);
    const response = await getConcerts(geoHash, "geoPoint", 50, 3);
    displayConcerts(response._embedded.events);
    appendGeoHashSearchLink(geoHash);
}

getLocation();

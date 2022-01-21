import Geohash from "https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0";
import { getConcerts } from "./ticketmaster.js";
import { displayConcerts } from "./displayConcerts.js";

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function getLocation() {
    const location = JSON.parse(localStorage.getItem("location"));
    if (location && Date.now() - location.time < 3600 * 1000) {
        return location.geoHash;
    } else {
        const position = await getCurrentPosition();
        const geoHash = getGeoHash(
            position.coords.latitude,
            position.coords.longitude
        );
        const storageItem = {
            geoHash,
            time: Date.now(),
        };
        localStorage.setItem("location", JSON.stringify(storageItem));
        return geoHash;
    }
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

function getGeoHash(latitude, longitude) {
    const geoHash = Geohash.encode(latitude, longitude, 6);
    return geoHash;
}

getLocation()
    .then(async (geoHash) => {
        const response = await getConcerts(geoHash, "geoPoint", 50, 3);
        displayConcerts(response._embedded.events);
        appendGeoHashSearchLink(geoHash);
    })
    .catch(() => {
        const infoContainer = document.getElementById("infoContainer");
        infoContainer.innerHTML = `<div class="horizontalContainer detailsError"><h4>We were unable to get the concerts by your location.</h4></div>`;
    });

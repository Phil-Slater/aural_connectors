import { getConcertDetails } from "./ticketmaster.js";
import { getParams } from "./getParams.js";

const requiredKeys = ["id"];

const params = getParams(requiredKeys);
if (!params.id) {
    window.location.assign("/");
}

async function displayConcertDetails(concertDetails) {
    const concertInfo = document.getElementById("concertInfo");
    const healthCheck = concertDetails.pleaseNote;
    const venueNames = await getVenueNames(concertDetails._embedded.venues);
    const venue = concertDetails._embedded.venues[0];
    const startDate = new Date(
        concertDetails.dates.start.dateTime
    ).toLocaleString();
    const concertHTML = `
    <div id="concertDetails">
        <h1>${concertDetails.name}</h1>
        <h3>${venueNames}</h3>
        <p>${startDate}<p>
        <h>Health Check</h4> 
            ${
                healthCheck
                    ? `<p>${healthCheck}</p>`
                    : "No Health Check information available"
            }
    </div>
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="400" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${
                venue.name
            }=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://fmovies-online.net"></a>
            <br>
            </div>
    </div>
    `;

    displayConcertImages(concertDetails.images);
    concertInfo.innerHTML = concertHTML;
}

async function getArtistNames(concertDetails) {
    const artistNames = document.getElementById("artistNames");
    const artists = concertDetails._embedded.attractions;
    const artistHTML = artists.map((artist) => {
        return `<li><a href="/artists.html?id=${artist.id}">${artist.name}</a></li>`;
    });

    artistNames.innerHTML = artistHTML.join("");
}

async function getVenueNames(venues) {
    const venueHTML = venues.map((venue) => {
        return `<h2>${venue.name}<h2>`;
    });

    return venueHTML.join(" ");
}

async function displayConcertImages(images) {
    const max = Math.max.apply(
        Math,
        images.map(function (img) {
            return img.width;
        })
    );
    const index = images.findIndex((image) => image.width === max);
    concertImages.innerHTML = `<img src="${images[index].url}">`;
}

getConcertDetails(params.id).then((concertDetails) => {
    displayConcertDetails(concertDetails);
    getArtistNames(concertDetails);
});

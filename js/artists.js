import { getArtistDetails } from "./ticketmaster.js";
import { getParams } from "./getParams.js";

const artistDiv = document.getElementById("artistDiv");
const artistImages = document.getElementById("artistImages")
const requiredKeys = ["id"];

const params = getParams(requiredKeys);
if (!params.id) {
    window.location.assign("/");
}

const displayArtist = (artist) => {
    //console.log(artist.classifications[0].genre)
    artistDiv.innerHTML = `<a class="artist" href="/artist.html?id=${artist.id}">
            <h3>${artist.name}</h3>
        </a>
        ${artist.externalLinks.twitter[0] ? `<p><a href="${artist.externalLinks.twitter[0].url}">Twitter</a></p>` : ""}
        ${artist.externalLinks.lastfm[0] ? `<p><a href="${artist.externalLinks.lastfm[0].url}">last.fm</a></p>` : ""}
        ${artist.externalLinks.homepage[0] ? `<p><a href="${artist.externalLinks.homepage[0].url}">Website</a></p>` : ""}
        ${artist.classifications[0].genre ? `<p>Genre: ${artist.classifications[0].genre.name}</p>` : ""}`
};

async function displayArtistImages(images) {
    console.log(images[1].url)
    artistImages.innerHTML = `<img src="${images[1].url}">`

    // const imagesHTML = images.map(image => {
    //     return `<div id="artistImages">
    //      <img src=${image.url} >
    //      </div>`
    // })
    // artistImages.innerHTML = imagesHTML.join("")
}

// const displayVenues = (venues) => {
//     console.log(venues);
// };

// const getResults = async () => {
//     try {
//         if (params.searchType === "venue") {
//             const venues = await getVenues(params.searchTerm);
//             displayVenues(venues);
//         } else {
//             const artistsResponse = await getArtists(
//                 params.id
//             );

//             const artists = artistsResponse._embedded.events;

//             displayArtists(artists);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// };

// getResults();

getArtistDetails(params.id).then((artist) => {
    displayArtist(artist)
    //console.log(artist.images)
    displayArtistImages(artist.images)
});

// ${data.parking ? `<p>${data.parkingDetail}</p>` : " "}
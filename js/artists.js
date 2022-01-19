import { getArtistDetails } from "./ticketmaster.js";
import { getParams } from "./getParams.js";

const artistsDiv = document.getElementById("artists");
const requiredKeys = ["id"];

const params = getParams(requiredKeys);
if (!params.id) {
    window.location.assign("/");
}

const displayArtist = (artist) => {
    console.log(artist)
    artistsDiv.innerHTML = `<a class="artist" href="/artist.html?id=${artist.id}">
            <h3>${artist.name}</h3>
            <h3>some links</h3>
        </a>`;
};

async function displayArtistImages(images) {
    const artistImages = document.getElementById("artistImages")
    console.log(images)
    const imagesHTML = images.map(image => {
        return `<div id="artistImages">
         <img src=${image.url} >
         </div>`
    })
    artistImages.innerHTML = imagesHTML.join("")
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
    console.log(artist.images)
    displayArtistImages(artist.images)
});

// ${data.parking ? `<p>${data.parkingDetail}</p>` : " "}
import { getArtistDetails } from "./ticketmaster.js";
import { getParams } from "./getParams.js";

const artistDiv = document.getElementById("artistDiv");
const artistImages = document.getElementById("artistImages");
const requiredKeys = ["id"];

const params = getParams(requiredKeys);
if (!params.id) {
    window.location.assign("/");
};

const displayArtist = (artist) => {
    let externalLinkItems = []
    if (artist.externalLinks) {
        const valuableKeys = ['twitter', 'lastfm', 'spotify', 'youtube', 'facebook', 'homepage'];
        const externalLinkKeys = valuableKeys.filter(key => artist.externalLinks[key])
        externalLinkItems = externalLinkKeys.map(key => `
        <p><a href="${artist.externalLinks[key][0].url}">${key}</a></p>
      `)
    }
    artistDiv.innerHTML = `<a href="/artist.html?id=${artist.id}">
          <h3>${artist.name}</h3></a>
          ${externalLinkItems.join('')}
          ${artist.classifications[0].genre ? `<p>Genre: ${artist.classifications[0].genre.name}</p>` : ""}`

};

async function displayArtistImages(images) {
    console.log(images[1].url)
    artistImages.innerHTML = `<img src="${images[0].url}">`
};

getArtistDetails(params.id).then((artist) => {
    displayArtist(artist)
    console.log(artist.images)
    displayArtistImages(artist.images)
});
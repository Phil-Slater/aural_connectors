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
        const valuableKeys = ['lastfm', 'spotify', 'twitter', 'youtube', 'facebook', 'homepage'];
        const externalLinkKeys = valuableKeys.filter(key => artist.externalLinks[key])
        externalLinkItems = externalLinkKeys.map(key => `
        <p><a href="${artist.externalLinks[key][0].url}">${key}</a></p>
      `)
    }
    artistDiv.innerHTML = `<h2>${artist.name}</h2>
          ${externalLinkItems.join('')}
          ${artist.classifications[0].genre ? `<p>Genre: ${artist.classifications[0].genre.name}</p>` : ""}`

};

async function displayArtistImages(images) {
    const max = Math.max.apply(Math, images.map(function (img) { return img.width; }))
    const index = images.findIndex(image => image.width === max)
    artistImages.innerHTML = `<img src="${images[index].url}">`
};

getArtistDetails(params.id).then((artist) => {
    displayArtist(artist)
    displayArtistImages(artist.images)
});
import TemplateImporter from "./templateImporter.js";

const header = new TemplateImporter("header");

header.loadHTML().then(() => header.importElement());


const infoDiv = document.getElementById('infoDiv')

window.onload = function getEvents(events) {
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=220&apikey=UexS3u89soxTBHwmbNoYUHdncWFGGI2t')
        .then((response) => {
            return response.json()
        }).then((result) => {
            displayEvents(result)
        })
}

function displayEvents(event) {
    event._embedded.events.forEach((item) => {
        infoDiv.insertAdjacentHTML('beforeend', `<h3>${item.name}</h3><p>${item.classifications[0].genre.name}</p><p>Date: ${item.dates.start.localDate}. Time: ${item.dates.start.localTime}</p><a href="${item.url}">Link</a><p>${item._embedded.venues[0].name}</p><p>${item._embedded.venues[0].city.name}, ${item._embedded.venues[0].state.stateCode}</p><img src="${item._embedded.attractions[0].images[1].url}"/>`)
    })
}
import { getConcertDetails} from "./ticketmaster.js";
import { getParams } from "./getParams.js";


const requiredKeys = ["id"];

const params = getParams(requiredKeys);
if (!params.id) {
    window.location.assign("/");
}


async function displayConcertDetails () {
    const concertInfo = document.getElementById("concertInfo")
    const data = await getConcertDetails(params.id)
    console.log(data)
    const artists = data._embedded.attractions
    const healthCheck = data.pleaseNote
    const venue = data._embedded.venues[0]
    const startDate = new Date(
        data.dates.start.dateTime
    ).toLocaleString();
    const concertHTML = 
    `
    <div id="concertDetails">
        <h1>${data.name}</h1>
        <p>${startDate}<p>
        <h>Health Check</h4> 
            ${healthCheck ? `<p>${healthCheck}</p>` : "No Health Check information available"}
    </div>
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="400" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${venue.name}=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://fmovies-online.net"></a>
            <br>
            <style>.mapouter{margin-right:20px; margin-top:20px;height:400px;width:400px;}</style>
            </div>
    </div>
    `
    console.log(data)

displayConcertImages(data.images)
concertInfo.innerHTML = concertHTML
}

async function getArtistNames () {
    const data = await getConcertDetails(params.id)
    const artistNames = document.getElementById("artistNames")
    const artists = data._embedded.attractions 
    const artistHTML = artists.map(artist => {
        console.log(artist)
       return `<li><a href="/artists.html?id=${artist.id}">${artist.name}<a></li>`
    
    })
     
     artistNames.innerHTML = artistHTML.join(" ");

}

async function displayConcertImages(images) {
    const max = Math.max.apply(Math, images.map(function (img) { return img.width; }))
    const index = images.findIndex(image => image.width === max)
    concertImages.innerHTML = `<img src="${images[index].url}">`
}
 

displayConcertDetails()
getArtistNames()

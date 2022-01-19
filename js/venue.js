import { getVenueDetails, getConcerts } from "./ticketmaster.js";
import { getParams } from "./getParams.js";


const requiredKeys = ["id"];

const params = getParams(requiredKeys);
if (!params.id) {
    window.location.assign("/");
}


async function displayVenueDetails () {
    const venueInfo = document.getElementById("venueInfo")
    const data = await getVenueDetails(params.id)
    const map = document.getElementById("map")
    console.log(data)
    const fullAddress =`${data.address.line1}, ${data.city.name}, ${data.state.stateCode}, ${data.country.countryCode}`
    const venueHTML = 
    `
    <div id="venueDetails">
        <h1>${data.name}</h1>
        <p>${fullAddress}</p>
        <h4>Parking Details: </h4>
        ${data.parking ? `<p>${data.parkingDetail}</p>` : " "}
        <h4>General Rules:</h4> 
            ${data.generalInfo ? `<p>${data.generalInfo.generalRule}</p>` : " "}
        <h4>Venue Accessibility: </h4>
            ${data.accessibleSeatingDetail ? `<p>${data.accessibleSeatingDetail}` : " "}
        <h4>Contact us: </h4>
            ${data.boxOfficeInfo ? `<p>${data.boxOfficeInfo.phoneNumberDetail}</p>` : " "}
           ${data.social ? `<p>${data.social.twitter.handle}<p>` : " "}
    </div>
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=${data.name}${fullAddress}=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://fmovies-online.net"></a>
            <br>
            <style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style>
            <a href="https://www.embedgooglemap.net">google map code for website</a>
            <style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style>
        </div>
    </div>
    `
    console.log(data)
displayVenueImages(data.images)
venueInfo.innerHTML = venueHTML
}

async function displayVenueImages (images) {
    const venueImages = document.getElementById("venueImages")
    const imagesHTML = images.map(image => {
       return ` <div id="venueImages">
         <img src=${image.url} >
         </div>`
     })
     venueImages.innerHTML = imagesHTML.join("")
}

async function displayUpcomingConcerts () {
    const upcomingConcerts = document.getElementById("upcomingConcerts")
    const concertData = await getConcerts("venueId", params.id)
    const events = concertData._embedded.events
    console.log(concertData)
    const concertsHTML = events.map(concert => {
        const startDate = new Date(
            concert.dates.start.dateTime
        ).toLocaleString();
       return `
       <div>
            <a class="concert" href="/concert.html?id=${concert.id}">
                <div class="concertImgContainer">
                    <img class="concertImg" src=${concert.images[0].url} />
                </div>
                <h3>${concert.name}</h3>
                <h4>${startDate}</h4>
                <div class="hover"></div>
            </a>
        </div>
        `    
    })
    upcomingConcerts.innerHTML = concertsHTML.join("")
}

displayVenueDetails()
displayUpcomingConcerts()
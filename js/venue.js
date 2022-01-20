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
        ${data.parking ? `<p>${data.parkingDetail}</p>` : "Info unavailable"}
        <h4>General Rules:</h4> 
            ${data.generalInfo ? `<p>${data.generalInfo.generalRule}</p>` : "Info unavailable"}
        <h4>Venue Accessibility: </h4>
            ${data.accessibleSeatingDetail ? `<p>${data.accessibleSeatingDetail}` : "Info unavailable"}
        <h4>Contact us: </h4>
            ${data.boxOfficeInfo ? `<p>${data.boxOfficeInfo.phoneNumberDetail}</p>` : "Info unavailable"}
    </div>
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="400" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${data.name}${fullAddress}=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://fmovies-online.net"></a>
            <br>
            <style>.mapouter{margin-right:20px; margin-top:20px;height:400px;width:400px;}</style>
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
         ${image.url? `<img src=${image.url}>` : img/venue.png}         
         </div>`
     })
     venueImages.innerHTML = imagesHTML.join("")
}

async function displayUpcomingConcerts () {
    const upcomingConcerts = document.getElementById("upcomingConcerts")
    const concertData = await getConcerts(params.id,"venueId")
    const events = concertData._embedded.events
    console.log(concertData)
    const concertsHTML = events.map(concert => {
        const startDate = new Date(
            concert.dates.start.dateTime
        ).toLocaleString();
       return `
       <div class="box">
            <a class="concert carouselItem" href="/concert.html?id=${concert.id}">
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
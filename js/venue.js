import { getVenueDetails, getConcerts } from "./ticketmaster.js";
import { getParams } from "./getParams.js";

const venueInfo = document.getElementById("venueInfo");
const venueImages = document.getElementById("venueImages");
const upcomingConcerts = document.getElementById("upcomingConcerts");
const foodNearby = document.getElementById("foodNearby");
const lodgingNearby = document.getElementById("lodgingNearby");

const requiredKeys = ["id"];

const params = getParams(requiredKeys);
if (!params.id) {
    window.location.assign("/");
}

async function searchNearbyRequest(location, type) {
    const url = `https://serverless-api.aural-connectors.workers.dev/?lat=${location.latitude}&lon=${location.longitude}&type=${type}`;
    try {
        const response = await fetch(url);
        const results = await response.json();
        return results;
    } catch {
        return [];
    }
}

async function getNearbyFood(location) {
    const results = await searchNearbyRequest(location, "restaurant");
    return results.results;
}

async function getNearbyLodges(location) {
    const results = await searchNearbyRequest(location, "lodging");
    return results.results;
}


function displayVenueDetails(venueDetails) {
    const fullAddress = `${venueDetails.address.line1}, ${venueDetails.city.name}, ${venueDetails.state.stateCode}, ${venueDetails.country.countryCode}`;
    const venueHTML = `
    <div id="venueDetails">
        <h1>${venueDetails.name}</h1>
        <p>${fullAddress}</p>
        <h4>Parking Details: </h4>
        ${
            venueDetails.parking
                ? `<p>${venueDetails.parkingDetail}</p>`
                : "Info unavailable"
        }
        <h4>General Rules:</h4> 
            ${
                venueDetails.generalInfo
                    ? `<p>${venueDetails.generalInfo.generalRule}</p>`
                    : "Info unavailable"
            }
        <h4>Venue Accessibility: </h4>
            ${
                venueDetails.accessibleSeatingDetail
                    ? `<p>${venueDetails.accessibleSeatingDetail}`
                    : "Info unavailable"
            }
        <h4>Contact us: </h4>
            ${
                venueDetails.boxOfficeInfo
                    ? `<p>${venueDetails.boxOfficeInfo.phoneNumberDetail}</p>`
                    : "Info unavailable"
            }
    </div>
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="400" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${
                venueDetails.name
            }${fullAddress}=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://fmovies-online.net"></a>
            <br>
            </div>
    </div>
    `;

    displayVenueImages(venueDetails.images);
    venueInfo.innerHTML = venueHTML;
}

function displayVenueImages(images) {
    const imagesHTML = images.map((image) => {
        const imgSrc = image.url ? image.url : "img/venug.png";
        return `<img src=${imgSrc}>`;
    });
    venueImages.innerHTML = imagesHTML.join("");
}

function displayUpcomingConcerts(concertsData) {
    const events = concertsData._embedded.events;
    const concertsHTML = events.map((concert) => {
        const startDate = new Date(
            concert.dates.start.dateTime
        ).toLocaleString();
        return `
       
        <a class="concert carouselItem" href="/concert.html?id=${concert.id}">
            <div class="concertImgContainer">
                <img class="concertImg" src=${concert.images[0].url} />
            </div>
            <h3>${concert.name}</h3>
            <h4>${startDate}</h4>
            <div class="hover"></div>
        </a>

        `;
    });
    upcomingConcerts.innerHTML = concertsHTML.join("");
}

function createLocationItemsHTML(locations) {
    return locations.map((location) => {
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${location.plus_code.compound_code}&query_place_id=${location.place_id}`;
        return `
        <a class="concert carouselItem mapLink" href="${mapLink}" target="_blank">
            <h3>${location.name}</h3>
            <p><i>${location.vicinity}</i></p>
            <div class="hover"></div>
        </a>
        `;
    });
}

function displayRestaurants(restaurants) {
    if (restaurants.length === 0) {
        foodNearby.innerHTML = "Unable to locate any nearby restaurants.";
    } else {
        const restaurantItems = createLocationItemsHTML(restaurants);
        foodNearby.innerHTML = restaurantItems.join("");
    }
}

function displayLodging(lodges) {
    if (lodges.length === 0) {
        lodgingNearby.innerHTML = "Unable to locate any nearby lodging.";
    } else {
        const lodgingItems = createLocationItemsHTML(lodges);
        lodgingNearby.innerHTML = lodgingItems.join("");
    }
}

getVenueDetails(params.id)
    .then(async (venueDetails) => {
        displayVenueDetails(venueDetails);
        const { location } = venueDetails;
        const restaurants = await getNearbyFood(location);
        displayRestaurants(restaurants);
        const lodges = await getNearbyLodges(location);
        displayLodging(lodges);
    })
    .catch((err) => {
        venueInfo.innerHTML = "";
        venueImages.innerHTML = "Unable to retrieve venue information.";
        displayRestaurants([]);
        displayLodging([]);
    });

getConcerts(params.id, "venueId")
    .then((concertsData) => {
        displayUpcomingConcerts(concertsData);
    })
    .catch((err) => {
        upcomingConcerts.innerHTML = "Unable to retrieve upcoming concerts.";
    });

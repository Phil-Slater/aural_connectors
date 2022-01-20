import { getConcerts, getVenues, getVenueDetails } from "./ticketmaster.js";
import { displayConcerts } from "./displayConcerts.js";
import { getParams } from "./getParams.js";

const searchDiv = document.getElementById("search");
const requiredKeys = ["searchTerm", "searchType"];

const params = getParams(requiredKeys);
if (!params.searchTerm || !params.searchType) {
    window.location.assign("/");
}

const displayVenues = (venues) => {
    const searchHeading = searchDiv.parentElement.children[0];
    const venueItems = venues.map((venue) => {
        const imgURL = venue.images ? venue.images[0].url : "img/building.png";
        return `
            <a class="concert" href="/venue.html?id=${venue.id}">
                <div class="concertImgContainer">
                    <img class="concertImg" src=${imgURL} />
                </div>
                <h3>${venue.name}</h3>
                <p><b>${venue.city.name}, ${venue.country.name}</b></p>
                <div class="hover"></div>
            </a>
        `;
    });
    searchHeading.innerHTML = "Venue Results:";
    searchDiv.innerHTML = venueItems.join("");
};

const getResults = async () => {
    try {
        if (params.searchType === "venue") {
            const venuesResponse = await getVenues(params.searchTerm);
            const { venues } = venuesResponse._embedded;
            displayVenues(venues);
        } else {
            const concertsResponse = await getConcerts(
                params.searchTerm,
                params.searchType
            );

            const { events: concerts } = concertsResponse._embedded;

            displayConcerts(concerts);
        }
    } catch (error) {
        // display error getting results message
    }
};

getResults();

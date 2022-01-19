import { getConcerts, getVenues, getVenueDetails } from "./ticketmaster.js";
import { getParams } from "./getParams.js";

const searchDiv = document.getElementById("search");
const requiredKeys = ["searchTerm", "searchType"];

const params = getParams(requiredKeys);
if (!params.searchTerm || !params.searchType) {
    window.location.assign("/");
}

const displayConcerts = (concerts) => {
    const concertItems = concerts.map((concert) => {
        console.log(concert);
        const venue = concert._embedded.venues[0];
        let venueName = venue.name;
        if (!venueName) {
            venueName = "";
            getVenueDetails(venue.id).then((venueDetails) => {
                console.log(venueDetails);
                // searchDiv.querySelector(`.${venue.id}`).innerHTML = venueDetails;
            });
        }
        const startDate = new Date(
            concert.dates.start.dateTime
        ).toLocaleString();
        return `
        <a class="concert" href="/concert.html?id=${concert.id}">
            <div class="concertImgContainer">
                <img class="concertImg" src=${concert.images[0].url} />
            </div>
            <h3>${concert.name}</h3>
            <p><i>${venueName}</i> <b>${venue.city.name}, ${venue.country.name}</b></p>
            <h4>${startDate}</h4>
            <div class="hover"></div>
        </a>
    `;
    });

    searchDiv.innerHTML = concertItems.join("");
};

const displayVenues = (venues) => {
    console.log(venues);
    const venueItems = venues.map((venue) => {
        let imgURL;
        if (venue.images) {
            imgURL = venue.images[0].url;
        }
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
    console.log("hi");
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

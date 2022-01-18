import { getConcerts, getVenues } from "./ticketmaster.js";
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
        const startDate = new Date(
            concert.dates.start.dateTime
        ).toLocaleString();
        return `
        <div class="concert">
            <div class="concertImgContainer">
                <img class="concertImg" src=${concert.images[0].url} />
            </div>
            <h3>${concert.name}</h3>
            <p><i>${venue.name}</i></p>
            <h4>${startDate}</h4>
            <div class="hover"></div>
        </div>
    `;
    });

    searchDiv.innerHTML = concertItems.join("");
};

const displayVenues = (venues) => {
    console.log(venues);
};

const getResults = async () => {
    try {
        if (params.searchType === "venue") {
            const venues = await getVenues(params.searchTerm);
            displayVenues(venues);
        } else {
            const concertsResponse = await getConcerts(
                params.searchTerm,
                params.searchType
            );

            const concerts = concertsResponse._embedded.events;

            displayConcerts(concerts);
        }
    } catch (error) {
        // display error getting results message
    }
};

getResults();

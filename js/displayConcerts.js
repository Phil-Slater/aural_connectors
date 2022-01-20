// export function
const searchDiv = document.getElementById("search");

export const displayConcerts = (concerts) => {
    const concertItems = concerts.map((concert) => {
        console.log(concert);
        const venue = concert._embedded.venues[0];
        let venueName = venue.name;
        if (!venueName) {
            venueName = "";
        }

        let countryOrState = venue.country.name;
        if (venue.state) {
            countryOrState = venue.state.stateCode
                ? venue.state.stateCode
                : venue.state.name;
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
            <p><i>${venueName}</i> <b>${venue.city.name}, ${countryOrState}</b></p>
            <h4>${startDate}</h4>
            <div class="hover"></div>
        </a>
    `;
    });

    searchDiv.innerHTML = concertItems.join("");
};

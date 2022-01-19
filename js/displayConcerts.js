// export function 
const searchDiv = document.getElementById('search')

export function displayConcerts(concerts) {
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




/* <div class="concert">
            <div class="concertImgContainer">
                <img class="concertImg" src=${concert.images[0].url} />
            </div>
            <h3>${concert.name}</h3>
            <p><i>${venue.name}</i></p>
            <h4>${startDate}</h4>
            <div class="hover"></div>
        </div> */
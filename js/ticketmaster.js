const apikey = "apikey=UexS3u89soxTBHwmbNoYUHdncWFGGI2t";
const baseUrl = "https://app.ticketmaster.com/discovery/v2";

export async function getConcerts(searchTerm, searchType) {
    try {
        const url = `${baseUrl}/events.json?classificationName=music&${searchType}=${searchTerm}&sort=date,asc&${apikey}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getConcertDetails(id) {
    try {
        const url = `${baseUrl}/events/${id}.json?${apikey}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getVenues(searchTerm) {
    try {
        const url = `${baseUrl}/venues.json?classificationName=music&keyword=${searchTerm}&${apikey}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getVenueDetails(id) {
    try {
        const url = `${baseUrl}/venues/${id}.json?${apikey}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getGenres(searchTerm) {
    try {
        const url = `${baseUrl}/classifications.json?keyword=${searchTerm}&${apikey}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getArtists(searchTerm) {
    try {
        const url = `${baseUrl}/attractions.json?keyword=${searchTerm}&classificationName=music&${apikey}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch (error) {
        console.log(error);
    }
}

// export function displayEvents(event) {
//     event._embedded.events.forEach((item) => {
//         infoDiv.insertAdjacentHTML('beforeend', `<h3>${item.name}</h3><p>${item.classifications[0].genre.name}</p><p>Date: ${item.dates.start.localDate}. Time: ${item.dates.start.localTime}</p><a href="${item.url}">Link</a><p>${item._embedded.venues[0].name}</p><p>${item._embedded.venues[0].city.name}, ${item._embedded.venues[0].state.stateCode}</p><img src="${item._embedded.attractions[0].images[1].url}"/>`)
//     })
// }

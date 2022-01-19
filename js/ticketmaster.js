const apikey = "apikey=UexS3u89soxTBHwmbNoYUHdncWFGGI2t";
const baseUrl = "https://app.ticketmaster.com/discovery/v2";

export async function getConcerts(searchTerm, searchType, radius = 50, count = null) {
    try {
<<<<<<< HEAD
        const url = `${baseUrl}/events.json?classificationName=music&${searchType}=${searchTerm}&sort=date,asc&${apikey}`;
        const response = await fetch(url);
=======
        const today = new Date()
        const time = today.toISOString().split('.')[0] + "Z"
        const countSearch = count ? `&size=${count}` : ""
        const url = `${baseUrl}/events.json?classificationName=music&${searchType}=${searchTerm}&sort=date,asc${countSearch}&radius=${radius}&startDateTime=${time}&${apikey}`
        const response = await fetch(url)
>>>>>>> geohash
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
<<<<<<< HEAD
        const url = `${baseUrl}/events/${id}.json?${apikey}`;
        const response = await fetch(url);
=======
        const url = `${baseUrl}/events/${id}.json?${apikey}`
        const response = await fetch(url)
>>>>>>> geohash
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
<<<<<<< HEAD
        const url = `${baseUrl}/venues.json?classificationName=music&keyword=${searchTerm}&${apikey}`;
        const response = await fetch(url);
=======
        const url = `${baseUrl}/venues.json?classificationName=music&keyword=${searchTerm}&${apikey}`
        const response = await fetch(url)
>>>>>>> geohash
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
<<<<<<< HEAD
        const url = `${baseUrl}/venues/${id}.json?${apikey}`;
        const response = await fetch(url);
=======
        const url = `${baseUrl}/venues/${id}.json?${apikey}`
        const response = await fetch(url)
>>>>>>> geohash
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
<<<<<<< HEAD
        const url = `${baseUrl}/classifications.json?keyword=${searchTerm}&${apikey}`;
        const response = await fetch(url);
=======
        const url = `${baseUrl}/classifications.json?keyword=${searchTerm}&${apikey}`
        const response = await fetch(url)
>>>>>>> geohash
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
<<<<<<< HEAD
        const url = `${baseUrl}/attractions.json?keyword=${searchTerm}classificationName=music&${apikey}`;
        const response = await fetch(url);
=======
        const url = `${baseUrl}/attractions.json?keyword=${searchTerm}&${apikey}`
        const response = await fetch(url)
>>>>>>> geohash
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

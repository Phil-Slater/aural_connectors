
// by city
export async function getEvents() {
    try {
        url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${searchBox.value}&sort=date,asc&apikey=UexS3u89soxTBHwmbNoYUHdncWFGGI2t`
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


// gives us a list of venues that are having concerts, but no list of events
export async function getVenue() {
    try {
        url = `https://app.ticketmaster.com/discovery/v2/venues.json?classificationName=music&apikey=UexS3u89soxTBHwmbNoYUHdncWFGGI2t`
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


// returns list of events from keyword search (venue as a keyword works)
export async function getVenue() {
    try {
        url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchBox.value}&classificationName=music&sort=date,asc&apikey=UexS3u89soxTBHwmbNoYUHdncWFGGI2t`
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}





// export function displayEvents(event) {
//     event._embedded.events.forEach((item) => {
//         infoDiv.insertAdjacentHTML('beforeend', `<h3>${item.name}</h3><p>${item.classifications[0].genre.name}</p><p>Date: ${item.dates.start.localDate}. Time: ${item.dates.start.localTime}</p><a href="${item.url}">Link</a><p>${item._embedded.venues[0].name}</p><p>${item._embedded.venues[0].city.name}, ${item._embedded.venues[0].state.stateCode}</p><img src="${item._embedded.attractions[0].images[1].url}"/>`)
//     })
// }


https://app.ticketmaster.com/discovery/v2/events.json?keyword=statefarmarena&classificationName=music&sort=date,asc&apikey=UexS3u89soxTBHwmbNoYUHdncWFGGI2t
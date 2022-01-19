import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';
import { getConcerts } from './ticketmaster.js'
import { displayConcerts } from './displayConcerts.js';


function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        getGeoHash(position.coords.latitude, position.coords.longitude)
    })
}

async function getGeoHash(latitude, longitude) {
    const geoHash = Geohash.encode(latitude, longitude, 6);
    console.log(geoHash)
    await getConcerts(geoHash, "geoPoint", 50, 3).then((response) => {
        displayConcerts(response._embedded.events)
    })
}

getLocation()

// getLocation().then((response) => {
//     console.log(response)
//     return getConcerts(response, "geoPoint", 50, 3)
// }).then((concertResponse) => {
//     displayConcerts(concertResponse)
// })






// export async function getConcertsByLocation(geoHash) {
//     try {
//         const url = `${baseUrl}/events.json?geoPoint=${geoHash}&radius=50&classificationName=music&sort=relevance,desc&size=3&${apikey}`
//         const response = await fetch(url)
//         if (response.status === 200) {
//             return await response.json()
//         } else {
//             throw new Error('error getting data')
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
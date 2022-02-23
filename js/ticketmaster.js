import { stateList } from "./stateList.js";

const apikey = "UexS3u89soxTBHwmbNoYUHdncWFGGI2t";
const baseUrl = "https://app.ticketmaster.com/discovery/v2";

const buildQueryParameters = (params) => {
    let queryItems = Object.entries(params).map(
        ([key, value]) => `${key}=${value}`
    );
    return queryItems.join("&");
};

const parseCityFormat = (searchTerm) => {
    // Check if zip code first
    const zipCode = parseInt(searchTerm);
    if (searchTerm.length === 5 && !isNaN(zipCode)) {
        return { postalCode: searchTerm };
    }

    // Next check if in city, state format
    const [city1, state, ...rest] = searchTerm.split(",");
    if (state) {
        if (stateList.includes(state.trim().toLowerCase())) {
            return {
                city: city1,
                stateCode: state,
            };
        }
    }

    // check if state code included without use of commas after initial term
    const [city2, ...secondaryTerms] = searchTerm.split(" ");
    if (secondaryTerms) {
        const matchedState = secondaryTerms.find((term) =>
            stateList.includes(term.trim().toLowerCase())
        );
        if (matchedState) {
            return {
                city: city2,
                stateCode: matchedState,
            };
        }
    }

    return {
        city: searchTerm,
    };
};

/* 
    Accepted searchTypes:
        attractionId,       (artist)
        city,               (may include city name only, [city, state], or postal code)
        classificationId,   (genre)
        venue
*/
export async function getConcerts(
    searchTerm,
    searchType,
    radius = 50,
    count = null
) {
    try {
        const today = new Date();
        const time = today.toISOString().split(".")[0] + "Z";
        let params = {
            classificationName: "music",
            sort: "date,asc",
            radius: radius,
            startDateTime: time,
            apikey: apikey,
        };

        if (searchType === "city") {
            const cityParams = parseCityFormat(searchTerm);
            params = {
                ...params,
                ...cityParams,
            };
        } else {
            params[searchType] = searchTerm;
        }

        if (count) {
            params.size = count;
        }

        const url = `${baseUrl}/events.json?${buildQueryParameters(params)}`;
        /* 
            ${searchType}=${searchTerm}
        */
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch {
        throw new Error("error getting data");
    }
}

export async function getConcertDetails(id) {
    try {
        const params = {
            apikey: apikey,
        };
        const url = `${baseUrl}/events/${id}.json?${buildQueryParameters(
            params
        )}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch {
        throw new Error("error getting data");
    }
}

export async function getVenues(searchTerm) {
    try {
        const params = {
            classificationName: "music",
            keyword: searchTerm,
            apikey: apikey,
        };

        const url = `${baseUrl}/venues.json?${buildQueryParameters(params)}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch {
        throw new Error("error getting data");
    }
}

export async function getVenueDetails(id) {
    try {
        const params = {
            apikey: apikey,
        };
        const url = `${baseUrl}/venues/${id}.json?${buildQueryParameters(
            params
        )}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch {
        throw new Error("error getting data");
    }
}

export async function getGenres(searchTerm) {
    try {
        const params = {
            keyword: searchTerm,
            apikey: apikey,
        };
        const url = `${baseUrl}/classifications.json?${buildQueryParameters(
            params
        )}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch {
        throw new Error("error getting data");
    }
}

export async function getArtists(searchTerm) {
    try {
        const params = {
            keyword: searchTerm,
            apikey: apikey,
        };

        const url = `${baseUrl}/attractions.json?${buildQueryParameters(
            params
        )}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch {
        throw new Error("error getting data");
    }
}

export async function getArtistDetails(id) {
    try {
        const params = {
            apikey: apikey,
        };
        const url = `${baseUrl}/attractions/${id}.json?${buildQueryParameters(
            params
        )}`;
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("error getting data");
        }
    } catch {
        throw new Error("error getting data");
    }
}

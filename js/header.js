import { getArtists, getGenres } from "./ticketmaster.js";
import { getParams } from "./getParams.js";
let searchForm;
let searchInput;
let searchTypeSelect;

const noResultsDiv = document.getElementById("noResultsDiv");

const navigateToSearchPage = (searchTerm, searchType, category) => {
    const rawSearch = category ? `&rawSearch=${category}` : "";
    window.location.assign(
        `/search.html?searchTerm=${searchTerm}&searchType=${searchType}${rawSearch}`
    );
};

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time);
    });
}

const displaySearchError = (message) => {
    console.log("hi");
    const errorDiv = document.createElement("div");
    errorDiv.id = "error";
    errorDiv.innerHTML = message;
    document.body.appendChild(errorDiv);
    wait(1)
        .then(() => {
            errorDiv.className = "errorDisplay";
            return wait(4000);
        })
        .then(() => {
            errorDiv.className = "";
            return wait(1000);
        })
        .then(() => {
            document.body.removeChild(errorDiv);
        });
};

const displayOptionsModal = (options, search) => {
    if (options.length === 1) {
        return navigateToSearchPage(
            options[0].id,
            search.type,
            options[0].name
        );
    }
    const modalBG = document.createElement("div");
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <h3>Potential ${search.label} Matches for "${search.term}"</h3>
        <p><i>Select one:</i></p>
    `;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    const optionItems = options.map((option) => {
        const optionButton = document.createElement("button");
        optionButton.className = "button";
        optionButton.innerHTML = option.name;
        optionButton.addEventListener("click", () =>
            navigateToSearchPage(option.id, search.type, option.name)
        );
        return optionButton;
    });
    optionsDiv.replaceChildren(...optionItems);
    modal.appendChild(optionsDiv);
    modalBG.className = "modal-bg";
    modalBG.appendChild(modal);
    modalBG.addEventListener("click", function (event) {
        if (event.target === this) {
            this.parentElement.removeChild(this);
        }
    });
    document.body.insertAdjacentElement("beforebegin", modalBG);
};

const handleSearchArtist = async (searchTerm) => {
    try {
        const response = await getArtists(searchTerm);
        if (response._embedded) {
            const { attractions: artists } = response._embedded;
            const search = {
                term: searchTerm,
                type: "attractionId",
                label: "Artist",
            };
            displayOptionsModal(artists, search);
        } else {
            noResultsDiv.innerHTML = `<h4>We couldn't find any results for ${searchTerm}.</h4>`;
            displaySearchError(`No artist results for "${searchTerm}"`);
        }
    } catch {
        displaySearchError(`No artist results for "${searchTerm}"`);
    }
};

const handleSearchGenre = async (searchTerm) => {
    try {
        const response = await getGenres(searchTerm);
        if (response._embedded) {
            const { classifications } = response._embedded;
            const musicClassification = classifications.find(
                (classification) => classification.segment.name === "Music"
            );
            const { genres } = musicClassification.segment._embedded;
            const search = {
                term: searchTerm,
                type: "classificationId",
                label: "Genre",
            };
            displayOptionsModal(genres, search);
        } else {
            noResultsDiv.innerHTML = `<h4>We couldn't find any results for ${searchTerm}.</h4>`;
            displaySearchError(`No genre results for "${searchTerm}"`);
        }
    } catch {
        displaySearchError(`No genre results for "${searchTerm}"`);
    }
};

const handleSearchClick = (event) => {
    if (searchForm.checkValidity()) {
        event.preventDefault();
        const searchTerm = searchInput.value;
        const searchType = searchTypeSelect.value;
        if (searchType === "attractionId") {
            handleSearchArtist(searchTerm);
        } else if (searchType === "classificationId") {
            handleSearchGenre(searchTerm);
        } else {
            navigateToSearchPage(searchTerm, searchType);
        }
    }
};

export const loadHeaderData = () => {
    searchForm = document.getElementById("searchForm");
    searchInput = document.getElementById("searchInput");
    searchTypeSelect = document.getElementById("searchTypeSelect");
    const searchButton = document.getElementById("searchButton");

    const params = getParams(["searchTerm", "searchType", "rawSearch"]);
    if (params.searchType !== "geoPoint") {
        if (params.rawSearch) {
            searchInput.value = params.rawSearch;
        } else if (params.searchTerm) {
            searchInput.value = params.searchTerm;
        }
        searchTypeSelect.value = params.searchType ? params.searchType : "city";
    }

    searchButton.addEventListener("click", handleSearchClick);

    searchTypeSelect.addEventListener("change", (event) => {
        searchTypeSelect.style.backgroundImage = `url(/img/${event.target.value}.png)`;
    });
};
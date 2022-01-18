import { getParams } from "./getParams.js";
let searchForm;
let searchInput;
let searchTypeSelect;

const handleSearchClick = (event) => {
    if (searchForm.checkValidity()) {
        event.preventDefault();
        const searchTerm = searchInput.value;
        const searchType = searchTypeSelect.value;
        window.location.assign(
            `/search.html?searchTerm=${searchTerm}&searchType=${searchType}`
        );
    }
};

export const loadHeaderData = () => {
    searchForm = document.getElementById("searchForm");
    searchInput = document.getElementById("searchInput");
    searchTypeSelect = document.getElementById("searchTypeSelect");
    const searchButton = document.getElementById("searchButton");

    const params = getParams(["searchTerm", "searchType"]);
    searchInput.value = params.searchTerm ? params.searchTerm : "";
    searchTypeSelect.value = params.searchTypeSelect
        ? params.searchType
        : "city";
    searchButton.addEventListener("click", handleSearchClick);

    searchTypeSelect.addEventListener("change", (event) => {
        searchTypeSelect.style.backgroundImage = `url(/img/${event.target.value}.png)`;
    });
};

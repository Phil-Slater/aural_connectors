const aboutUs = document.getElementById("aboutUs");

async function getUserInfo() {
    let userNames = ["jon-cundiff", "Phil-Slater", "Katie-Freeman"];
    const gitHubURL = `https://api.github.com/users`;

    const data = Promise.all(
        userNames.map(async (userName) => {
            const res = await fetch(`${gitHubURL}/${userName}`);
            return await res.json();
        })
    ).then((result) => {
        return displayUserInfo(result);
    });
}

function displayUserInfo(userData) {
    userData.map((user) => {
        const {
            avatar_url: image,
            bio: bio,
            html_url: link,
            name: name,
            location: city,
        } = user;

        const userInfo = `
    <div class="profile">
        <img class="profileImg" src=${image}/>
        <a href=${link}>${name ? name : "Profile"}</a>
        ${city ? `<small> ${city} </small>` : " "}
        ${bio ? `<p>${bio}</p>` : " "}
    </div>
    `;
        aboutUs.insertAdjacentHTML("beforeend", userInfo);
    });
}

getUserInfo();
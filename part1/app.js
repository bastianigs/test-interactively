
const usersList = document.getElementById( "users" );
const filter = document.getElementById( "filter" );

let defUsersArr = []; // to be able to come back to the order from feed
let usersArr = []; // the array we can play with, and render based on

let photosArr = [];

let lastFilter = "def"; // storing the last status of filtering, to avoid one extra .sort() from applyFilter() case "za"
//--------------------------------
// console.log( usersArr );
const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.status !== 200) throw new Error( response.message );
    const data = await response.json();

    const responsePhotos = await fetch("https://jsonplaceholder.typicode.com/photos");
    if (responsePhotos.status !== 200) throw new Error( responsePhotos.message );
    const dataPhotos = await responsePhotos.json();

    data.forEach( (item) => usersArr.push( item ) );
    data.forEach( (item) => defUsersArr.push( item ) );

    dataPhotos.forEach( (item) => photosArr.push( item ) );
};

//--------------------------------

getUsers()
    .then( () => {
        console.log( "Sending data to the renderUsers function..." );
        renderUsers();
    })
    .catch( err => {
        console.log( "Couldn't fetch the data:", err );
    })

filter.addEventListener( "change", (e) => {
    const val = filter.value;
    applyFilter( val );
});

usersList.addEventListener( "click", (e) => {
    if (e.target.parentElement.id.includes( "userweb-" )) {
        // console.log( "found" );
        let userId = e.target.parentElement.id.substring(8);
        const website = document.querySelector( "#user-" + userId + " .card-website" );
        window.location.href = "https://" + website.innerText;
    }
})

//--------------------------------

function applyFilter( filter ) {
    usersList.innerHTML = ""; // emptying the users grid

    switch (filter) {
        case "def": {
            usersArr = []; // emptying the array
            defUsersArr.forEach( (item) => usersArr.push(item) );
        } break;

        case "az": {
            usersArr.sort( (a, b) => {
                return a.name.localeCompare(b.name);
            });
        } break;

        case "za": {
            if (lastFilter !== "az") {
                applyFilter( "az" );
                usersList.innerHTML = ""; // emptying the users grid again, to avoid having az-za mixed together
            }
            usersArr.reverse();
        } break;
    }

    // console.log( usersArr );
    lastFilter = filter;
    renderUsers();
}

function renderUsers() {
    let list = "";

    usersArr.forEach( item => {
        list += `
                <div id="user-${item.id}" class="user-card">
                    <div class="card-photo">
                        <img src="${photosArr[item.id].thumbnailUrl}" alt="${item.name}">
                        <p class="card-name">${item.name}</p>
                        <p class="card-username">${item.username}</p>
                    </div>
                    <div class="card-info">
                        <a class="card-email" href="mailto: ${item.email}"><img class="card-svg" src="./assets/mail.svg" alt="mail-svg" />${item.email}</a>
                        <div class="card-address">
                            <p class="address-title">Address</p>
                            <p class="address-street"><span class="info-hint">Street:</span>${item.address.street}</p>
                            <p class="address-suite"><span class="info-hint">Suite:</span>${item.address.suite}</p>
                            <p class="address-city"><span class="info-hint">City:</span>${item.address.city}</p>
                            <p class="address-zipcode"><span class="info-hint">Zipcode:</span>${item.address.zipCode}</p>
                            <div class="address-geo">
                                <p class="geo-pos">
                                    <span class="info-hint">Coords:</span>
                                    <span class="geo-lat">${item.address.geo.lat}</span>, 
                                    <span class="geo-lng">${item.address.geo.lng}</span>
                                </p>
                            </div>
                        </div>
                        <a class="card-phone" href="tel: ${item.email}"><img class="card-svg" src="./assets/phone.svg" alt="phone-svg" />${item.phone}</a>
                        <a class="card-website" href="https://${item.website}"><img class="card-svg" src="./assets/link.svg" alt="website-svg" />${item.website}</a>
                        <div class="card-company">
                            <p class="company-title">Company</p>
                            <p class="company-name"><span class="info-hint">Name:</span>${item.company.name}</p>
                            <p class="company-phrase"><q>${item.company.catchPhrase}</q></p>
                            <p class="company-bs">${item.company.bs}</p>
                        </div>
                    </div>
                    <div id="userweb-${item.id}" class="card-button">
                        <input class="websiteBtn" type="button" value="Visit Website">
                    </div>
                </div>
            `;
    });
            
    usersList.innerHTML = list;
}
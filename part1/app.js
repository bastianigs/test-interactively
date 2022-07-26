
const usersList = document.getElementById( "users" );
const filter = document.getElementById( "filter" );

let defUsersArr = []; // to be able to come back to the order from feed
let usersArr = []; // the array we can play with, and render based on

let photosArr = [];

let lastFilter = "def"; // storing the last status of filtering, to avoid one extra .sort() from applyFilter() case "za"
//--------------------------------
console.log( usersArr );
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

    return ({ users: usersArr, photos: photosArr });
}

//--------------------------------

getUsers()
    .then( (data) => {
        // console.log( data.users, data.photos );
        console.log( "Sending data to the renderUsers function..." );
        renderUsers( data.users, data.photos );
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
            if (lastFilter !== "az") applyFilter( "az" );
            usersArr.reverse();
        } break;
    }

    console.log( usersArr );
    lastFilter = filter;
    renderUsers( usersArr, photosArr );
}

function renderUsers( users, photos ) {
    // console.log( "-> renderUsers received data:", users );

    users.forEach( item => {
        // user card
        const userCard = document.createElement( "div" );
        userCard.classList.add( "user-card" );
        userCard.id = "user-" + item.id;

        // photo
        const cardPhoto = document.createElement( "div" );
        cardPhoto.classList.add( "card-photo" );
            // img
            const photo = document.createElement( "img" );
            photo.src = photos[item.id].thumbnailUrl;
            photo.alt = item.name;
            cardPhoto.appendChild( photo );

            const cardName = document.createElement( "p" );
            cardName.classList.add( "card-name" );
            const cardNameText = document.createTextNode( item.name );  
            cardName.appendChild( cardNameText );

            const cardUsername = document.createElement( "p" );
            cardUsername.classList.add( "card-username" );
            const cardUsernameText = document.createTextNode( item.username );  
            cardUsername.appendChild( cardUsernameText );

            cardPhoto.appendChild( cardName );
            cardPhoto.appendChild( cardUsername );

        // details
        const cardInfo = document.createElement( "div" );
        cardInfo.classList.add( "card-info" );

            // const cardName = document.createElement( "p" );
            // cardName.classList.add( "card-name" );
            // const cardNameText = document.createTextNode( item.name );  
            // cardName.appendChild( cardNameText );

            // const cardUsername = document.createElement( "p" );
            // cardUsername.classList.add( "card-username" );
            // const cardUsernameText = document.createTextNode( item.username );  
            // cardUsername.appendChild( cardUsernameText );

            const cardEmail = document.createElement( "a" );
            cardEmail.classList.add( "card-email" );
            cardEmail.href = "mailto: " + item.email;
                const cardEmailSVG = document.createElement( "img" );
                cardEmailSVG.classList.add( "card-svg" );
                cardEmailSVG.src = "./assets/mail.svg";
                cardEmailSVG.alt = "phone symbol";
                cardEmail.appendChild( cardEmailSVG );
            const cardEmailText = document.createTextNode( item.email );  
            cardEmail.appendChild( cardEmailText );

            // div Address
            const cardAddress = document.createElement( "div" );
            cardAddress.classList.add( "card-address" );

                    const addressTitle = document.createElement( "p" );
                    addressTitle.classList.add( "address-title" );
                    const addressTitleText = document.createTextNode( "Address" );  
                    addressTitle.appendChild( addressTitleText );

                    const addressStreet = document.createElement( "p" );
                    addressStreet.classList.add( "address-street" );
                        const streetLabel = document.createElement( "span" );
                        streetLabel.classList.add( "info-hint" );
                        const streetLabelText = document.createTextNode( "Street:" );
                        streetLabel.appendChild( streetLabelText );
                        addressStreet.appendChild( streetLabel );
                    const addressStreetText = document.createTextNode( item.address.street );
                    addressStreet.appendChild( addressStreetText );

                    const addressSuite = document.createElement( "p" );
                    addressSuite.classList.add( "address-suite" );
                        const suiteLabel = document.createElement( "span" );
                        suiteLabel.classList.add( "info-hint" );
                        const suiteLabelText = document.createTextNode( "Suite:" );
                        suiteLabel.appendChild( suiteLabelText );
                        addressSuite.appendChild( suiteLabel );
                        const addressSuiteText = document.createTextNode( item.address.suite );
                    addressSuite.appendChild( addressSuiteText );

                    const addressCity = document.createElement( "p" );
                    addressCity.classList.add( "address-city" );
                        const cityLabel = document.createElement( "span" );
                        cityLabel.classList.add( "info-hint" );
                        const cityLabelText = document.createTextNode( "City:" );
                        cityLabel.appendChild( cityLabelText );
                        addressCity.appendChild( cityLabel );
                    const addressCityText = document.createTextNode( item.address.city );
                    addressCity.appendChild( addressCityText );

                    const addressZipcode = document.createElement( "p" );
                    addressZipcode.classList.add( "address-zipcode" );
                        const zipcodeLabel = document.createElement( "span" );
                        zipcodeLabel.classList.add( "info-hint" );
                        const zipcodeLabelText = document.createTextNode( "Zipcode:" );
                        zipcodeLabel.appendChild( zipcodeLabelText );
                        addressZipcode.appendChild( zipcodeLabel );
                    const addressZipcodeText = document.createTextNode( item.address.zipcode );
                    addressZipcode.appendChild( addressZipcodeText );

                    // div geo
                    const addressGeo = document.createElement( "div" );
                    addressGeo.classList.add( "address-geo" );

                        const geoPos = document.createElement( "p" );
                        geoPos.classList.add( "geo-pos" );

                        const geoLabel = document.createElement( "span" );
                        geoLabel.classList.add( "info-hint" );
                        const geoLabelText = document.createTextNode( "Coords:" );
                        geoLabel.appendChild( geoLabelText );
                        geoPos.appendChild( geoLabel );

                            const geoLat = document.createElement( "span" );
                            geoLat.classList.add( "geo-lat" );
                            const geoLatText = document.createTextNode( item.address.geo.lat + ", " );
                            geoLat.appendChild( geoLatText );

                            const geoLng = document.createElement( "span" );
                            geoLng.classList.add( "geo-lng" );
                            const geoLngText = document.createTextNode( item.address.geo.lng );
                            geoLng.appendChild( geoLngText );

                            geoPos.appendChild( geoLat );
                            geoPos.appendChild( geoLng );

                        addressGeo.appendChild( geoPos );

                    cardAddress.appendChild( addressTitle );
                    cardAddress.appendChild( addressStreet );
                    cardAddress.appendChild( addressSuite );
                    cardAddress.appendChild( addressCity );
                    cardAddress.appendChild( addressZipcode );
                    cardAddress.appendChild( addressGeo );

            const cardPhone = document.createElement( "a" );
            cardPhone.classList.add( "card-phone" );
            cardPhone.href = "tel: " + item.email;
                const cardPhoneSVG = document.createElement( "img" );
                cardPhoneSVG.classList.add( "card-svg" );
                cardPhoneSVG.src = "./assets/phone.svg";
                cardPhoneSVG.alt = "phone symbol";
                cardPhone.appendChild( cardPhoneSVG );
            const cardPhoneText = document.createTextNode( item.phone );
            cardPhone.appendChild( cardPhoneText );

            const cardWebsite = document.createElement( "a" );
            cardWebsite.classList.add( "card-website" );
            cardWebsite.href = "https://" + item.website;
                const cardWebsiteSVG = document.createElement( "img" );
                cardWebsiteSVG.classList.add( "card-svg" );
                cardWebsiteSVG.src = "./assets/link.svg";
                cardWebsiteSVG.alt = "website symbol";
                cardWebsite.appendChild( cardWebsiteSVG );
            const cardWebsiteText = document.createTextNode( item.website );
            cardWebsite.appendChild( cardWebsiteText );

            // div Company
            const cardCompany = document.createElement( "div" );
            cardCompany.classList.add( "card-company" );

            const companyTitle = document.createElement( "p" );
            companyTitle.classList.add( "company-title" );
            const companyTitleText = document.createTextNode( "Company" );  
            companyTitle.appendChild( companyTitleText );

                    const companyName = document.createElement( "p" );
                    companyName.classList.add( "company-name" );
                        const compNameLabel = document.createElement( "span" );
                        compNameLabel.classList.add( "info-hint" );
                        const compNameLabelText = document.createTextNode( "Name:" );
                        compNameLabel.appendChild( compNameLabelText );
                        companyName.appendChild( compNameLabel );
                    const companyNameText = document.createTextNode( item.company.name );
                    companyName.appendChild( companyNameText );

                    const companyPhrase = document.createElement( "p" );
                    companyPhrase.classList.add( "company-phrase" );
                    const phraseQuote = document.createElement( "q" );
                    const companyPhraseText = document.createTextNode( item.company.catchPhrase );
                    phraseQuote.appendChild( companyPhraseText );
                    companyPhrase.appendChild( phraseQuote );

                    const companyBs = document.createElement( "p" );
                    companyBs.classList.add( "company-bs" );
                    const companyBsText = document.createTextNode( item.company.bs );
                    companyBs.appendChild( companyBsText );

                    cardCompany.appendChild( companyTitle );
                    cardCompany.appendChild( companyName );
                    cardCompany.appendChild( companyPhrase );
                    cardCompany.appendChild( companyBs );


        // btn - visit website
        const cardButton = document.createElement( "div" );
        cardButton.classList.add( "card-button" );
        cardButton.id = "userweb-" + item.id;

            const btn = document.createElement( "input" );
            btn.classList.add( "websiteBtn" );
            btn.type = "button";
            btn.value = "Visit Website";
            cardButton.appendChild( btn );

        userCard.appendChild( cardPhoto );
        userCard.appendChild( cardInfo );
            // cardInfo.appendChild( cardName );
            // cardInfo.appendChild( cardUsername );
            cardInfo.appendChild( cardEmail );
            cardInfo.appendChild( cardAddress );
            cardInfo.appendChild( cardPhone );
            cardInfo.appendChild( cardWebsite );
            cardInfo.appendChild( cardCompany );
        userCard.appendChild( cardButton );

        usersList.appendChild( userCard );
    });
}
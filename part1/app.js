
const usersList = document.getElementById( "users" );

//--------------------------------

const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.status !== 200) throw new Error( response.message );
    const data = await response.json();

    const responsePhotos = await fetch("https://jsonplaceholder.typicode.com/photos");
    if (responsePhotos.status !== 200) throw new Error( responsePhotos.message );
    const dataPhotos = await responsePhotos.json();

    return ({ users: data, photos: dataPhotos });
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

usersList.addEventListener( "click", (e) => {
    if (e.target.parentElement.id.includes( "userweb-" )) {
        // console.log( "found" );
        let userId = e.target.parentElement.id.substring(8);
        const website = document.querySelector( "#user-" + userId + " .card-website" );
        window.location.href = "https://" + website.innerText;
    }
})

//--------------------------------


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

        // details
        const cardInfo = document.createElement( "div" );
        cardInfo.classList.add( "card-info" );

            // name username email div(address) phone website div(company)
            const cardName = document.createElement( "p" );
            cardName.classList.add( "card-name" );
            const cardNameText = document.createTextNode( item.name );  
            cardName.appendChild( cardNameText );

            const cardUsername = document.createElement( "p" );
            cardUsername.classList.add( "card-username" );
            const cardUsernameText = document.createTextNode( item.username );  
            cardUsername.appendChild( cardUsernameText );

            const cardEmail = document.createElement( "p" );
            cardEmail.classList.add( "card-email" );
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
                    addressTitle.classList.add( "address-street" );
                    const addressStreetText = document.createTextNode( item.address.street );
                    addressStreet.appendChild( addressStreetText );

                    const addressSuite = document.createElement( "p" );
                    addressTitle.classList.add( "address-suite" );
                    const addressSuiteText = document.createTextNode( item.address.suite );
                    addressSuite.appendChild( addressSuiteText );

                    const addressCity = document.createElement( "p" );
                    addressTitle.classList.add( "address-city" );
                    const addressCityText = document.createTextNode( item.address.city );
                    addressCity.appendChild( addressCityText );

                    const addressZipcode = document.createElement( "p" );
                    addressTitle.classList.add( "address-zipcode" );
                    const addressZipcodeText = document.createTextNode( item.address.zipcode );
                    addressZipcode.appendChild( addressZipcodeText );

                    // div geo
                    const addressGeo = document.createElement( "div" );
                    addressGeo.classList.add( "address-geo" );

                        const geoPos = document.createElement( "p" );
                        geoPos.classList.add( "geo-pos" );

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

            const cardPhone = document.createElement( "p" );
            cardPhone.classList.add( "card-phone" );
                const cardPhoneSVG = document.createElement( "img" );
                cardPhoneSVG.src = "./assets/phone.svg";
                cardPhoneSVG.alt = "phone symbol";
                cardPhone.appendChild( cardPhoneSVG );
            const cardPhoneText = document.createTextNode( item.phone );
            cardPhone.appendChild( cardPhoneText );

            const cardWebsite = document.createElement( "p" );
            cardWebsite.classList.add( "card-website" );
                const cardWebsiteSVG = document.createElement( "img" );
                cardWebsiteSVG.src = "./assets/link.svg";
                cardWebsiteSVG.alt = "website symbol";
                cardWebsite.appendChild( cardWebsiteSVG );
            const cardWebsiteText = document.createTextNode( item.website );
            cardWebsite.appendChild( cardWebsiteText );

            // div Company
            const cardCompany = document.createElement( "div" );
            cardCompany.classList.add( "card-company" );

                    const companyName = document.createElement( "p" );
                    companyName.classList.add( "company-name" );
                    const companyNameText = document.createTextNode( item.company.name );
                    companyName.appendChild( companyNameText );

                    const companyPhrase = document.createElement( "p" );
                    companyPhrase.classList.add( "company-name" );
                    const companyPhraseText = document.createTextNode( item.company.catchPhrase );
                    companyPhrase.appendChild( companyPhraseText );

                    const companyBs = document.createElement( "p" );
                    companyBs.classList.add( "company-name" );
                    const companyBsText = document.createTextNode( item.company.bs );
                    companyBs.appendChild( companyBsText );

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
            cardInfo.appendChild( cardName );
            cardInfo.appendChild( cardUsername );
            cardInfo.appendChild( cardEmail );
            cardInfo.appendChild( cardAddress );
            cardInfo.appendChild( cardPhone );
            cardInfo.appendChild( cardWebsite );
            cardInfo.appendChild( cardCompany );
        userCard.appendChild( cardButton );

        usersList.appendChild( userCard );
    });
}
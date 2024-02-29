const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // clear previous data and new data
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // console.log(isShowAll);

    if (!isShowAll) {
        phones = phones.slice(0, 9);
    }

    phones.forEach(phone => {
        // console.log(phone);

        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;

        // set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p></p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    `
        // append child
        phoneContainer.appendChild(phoneCard);
    })
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle show details button
const handleShowDetails = async (id) => {
    // console.log('show details', id);

    // load phone details
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

// show phone details

const showPhoneDetails = (phone) => {
    // show the modal
    console.log(phone);

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
       <img class="mt-5 mb-5" src="${phone.image}">
       <p class="mt-3"><span class="font-semibold">Storage: </span>${phone.mainFeatures.storage}</p>
       <p class="mt-3"><span class="font-semibold">Memory: </span>${phone.mainFeatures.memory}</p>
       <p class="mt-3"><span class="font-semibold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
       <p class="mt-3"><span class="font-semibold">Chipset: </span>${phone.mainFeatures.chipSet}</p> 
       <p class="mt-3"><span class="font-semibold">Sensors: </span>${phone.mainFeatures.sensors}</p>
       <p class="mt-3"><span class="font-semibold hidden">Release Date: </span>${phone.releaseDate}</p>
       `;

    myshow_details_modal.showModal();
}

// handle search button

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all button

const handleShowAll = () => {
    handleSearch(isShowAll = true);
}
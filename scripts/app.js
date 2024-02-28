const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // clear previous data and new data
    phoneContainer.textContent = '';

    phones.forEach(phone => {
        console.log(phone);

        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        
        // set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p></p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    `
        // append child
        phoneContainer.appendChild(phoneCard);
    })
}

// handle search button

const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}
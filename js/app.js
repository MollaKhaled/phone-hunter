const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data)
}
const displayPhones = phones => {
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.innerHTML = '';
  // display 20 phone only
  phones = phones.slice(0, 10);

  // display no phones
  const noPhone = document.getElementById('no-found-message');
  if (phones.length === 0) {
    noPhone.classList.remove('d-none')
  }
  else {
    noPhone.classList.add('d-none')
  }

  // display all phones

  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="col">
   <div class="card h-100">
     <img src="${phone.image}" class="rounded mx-auto d-block m-4 p-4" alt="...">
     <div class="card-body">
       <h4 class="card-title">${phone.phone_name}</h4>
       <h5 class="card-title">${phone.brand}</h5>
       <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
     </div>
   </div>
 </div>
   `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop loader
  toggleSpinner(false);
}
document.getElementById('search-button').addEventListener('click', function () {
  // start loader
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText)
  document.getElementById('search-field').value = '';
})

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}

// loadPhones();
const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit)
}
const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.textContent = '';
  // display 10 phone only
  const showAll = document.getElementById('show-all');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none')
  }
  else {
    showAll.classList.add('d-none')
  }
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
       <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal" >Show Details</button>
     </div>
   </div>
 </div>
   `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop loader
  toggleSpinner(false);
}
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit)
  
}
document.getElementById('search-button').addEventListener('click', function () {
  // start loader
  processSearch(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e){ 
  if (e.key === 'Enter'){
    processSearch(10);
  }
});

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none')
  }
}
// not the best way to showAll
  document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch();
})

const loadPhoneDetails = async(id) =>{
  const url=`https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data) ;
}
 const displayPhoneDetails = phone => {
  console.log(phone);
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
  <p> Release Date: ${phone.releaseDate ? phone.releaseDate :'NO Release Date Found'}
  `;

 }


loadPhones('apple');
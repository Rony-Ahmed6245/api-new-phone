const loadPhone = async (searchText="13 ", isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json() ;
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones , isShowAll)
}
loadPhone()



const displayPhones = (phones , isShowAll) =>{
    console.log( phones.length)
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';


    // show all btn  
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }
 

//   console.log("is show " , isShowAll )
  if(!isShowAll){
    phones = phones.slice(0, 12);
  }
        
    

    
   
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-white shadow-xl pt-4`;
        phoneCard.innerHTML =`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button onclick="showDeatils('${phone.slug}')" class="btn btn-primary">show deatils</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });
    toggleSpenner(false)
}

const showDeatils = async (id)=>{

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data)
    const phone = data.data
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('phoneName')
    phoneName.innerText = phone.name
    const showDetailContainer =document.getElementById('showDetailContainer');
    showDetailContainer.innerHTML=`
    <img src="${phone.image}" alt="">
    <p>${phone?.mainFeatures?.storage}</p>
    `
    showDeatilModal.showModal()
}







const handelSearch =(isShowAll) => {
    toggleSpenner(true)
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value ;
    // searchField.value = ''
    // console.log(searchText)
    loadPhone(searchText , isShowAll)
}


const toggleSpenner = ( isLoadding )=> {
    const spinner = document.getElementById('spinner');

    if(isLoadding){
        spinner.classList.remove('hidden')
    }else{
        spinner.classList.add('hidden')
    }
}


const showAll = () => {
    handelSearch(true)
}


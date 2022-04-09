var form = document.querySelector('.search-container');
var country_container = document.querySelector('.country-container');
var country_name= document.querySelector('#search-input');



function Get_data_country(url){
    fetch(url).then((response)=>{
        return response.json();

    }).then((data)=>{
        Set_country(data[0]);
    })
    .catch((error)=>{
        Message_error();
    })
}

function Set_country(data){
    
    let flag = data.flags.png;
    let name = data.name.common;    
    let capital = data.capital[0];
    let continent = data.continents[0];
    let population = data.population;
    let currency = data.currencies[Object.keys(data.currencies)].name + 
                ' ( '+ data.currencies[Object.keys(data.currencies)].symbol+' )';

    let languages = Object.values(data.languages).toString().split(',').join(', ');

    country_container.innerHTML = 

    `<div class="flag-container">
        <img src="${flag}" alt="">
    </div>

    <h1 id="coutry-name">${name}</h1>

    <div class="country-info">
        <div>
            <p>Capital: </p>
            <span>${capital}</span>
        </div>
        <div>
            <p>Continent: </p>
            <span>${continent}</span>
        </div>
        <div>
            <p>Population: </p>
            <span>${population}</span>
        </div>
        <div>
            <p>Currency: </p>
            <span>${currency}</span>
        </div>
        <div>
            <p>Common Languages: </p>
            <span>${languages}</span>
        </div>
    </div>`

}

function Message_error(){
    country_container.innerHTML = '<h3 class="message-error">Correctly type the country name!</h3>';
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    Get_data_country(`https://restcountries.com/v3.1/name/${country_name.value}`)
})

form.addEventListener('keypress',(event)=>{
    if(event.keyCode == 13){ /* Enter press */
        Get_data_country(`https://restcountries.com/v3.1/name/${country_name.value}`)
    }
    
})
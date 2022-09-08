const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const inp = document.querySelector(".city");
const load = document.querySelector(".lds-ellipsis");
const main = document.querySelector(".main");

async function getWeather(city) {
    const data = await fetch(url(city));
    const res = await data.json();
    weatherCard(res);
    console.log(res);
    
}

function weatherCard(data) {
    const card = document.createElement("div");
    card.className = "card";

    if (data.cod == '404') {
        card.innerHTML = `
        <h6>${data.message}</h6>
        `;
    } else {
        card.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">
        <h4>${cKelvin(data.main.temp).toFixed(2)}°C
        <br>
        <p>${data.weather[0].main}</p>
        </h4>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">`;        
    }

    main.innerHTML = "";
    main.append(card);
}


function cKelvin(tmp) {
    return tmp - 273.15;
}
const search = liveUpdate(txt => {
    load.classList.add("active");
    if (txt !== "") {
        getWeather(txt);
        inp.value = "";
    }
})

function liveUpdate(cb, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    }
}


inp.addEventListener("input", (e) => {
    const { value } = e.target;
    if (value !== "") {
        load.classList.remove("active");
        search(value);
    }
})
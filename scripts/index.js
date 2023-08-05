const apikey = "5492d4042266bd4518cd1f36a17a4740";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${cityValue}&appid=${apikey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json();
        console.log(data)
        const name = data.name;
        const country = data.sys.country;
        const fullname = name + ", "+country;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}`,
            `Wind speed: ${data.wind.speed}`,
        ]
        weatherDataEl.querySelector(".name-city").innerHTML = fullname;
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="">`
        weatherDataEl.querySelector(".temperature").innerHTML = temperature+"°C";
        weatherDataEl.querySelector(".description").innerHTML = description;
        weatherDataEl.querySelector(".details").innerHTML = `<div>${details[0]}°C</div>
        <div>${details[1]}%</div>
        <div>${details[2]}m/s</div>`
    } catch (error) {
        weatherDataEl.querySelector(".name-city").innerHTML = "";
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").innerHTML = "";
        weatherDataEl.querySelector(".description").innerHTML = "";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}
//http://api.weatherapi.com/v1/current.json?key=35c34071cf054025a5c31303262504&q=London&aqi=no


const temparatureField = document.querySelector(".temp"); //Getting the temperature from the API response
const timeLocationField = document.querySelector(".time_location"); //Getting the location & time container
const conditionField = document.querySelector(".condition p"); //Getting the condition from the API response
const conditionIcon = document.querySelector(".condition-icon"); //Getting the condition icon element
const humidityField = document.querySelector(".humidity"); //Getting the humidity field
const windField = document.querySelector(".wind"); //Getting the wind field
const feelsLikeField = document.querySelector(".feels-like"); //Getting the feels-like field
const searchField = document.querySelector(".submit-location"); //Getting the search field from the API response
const form = document.querySelector("form"); //Getting the form from the DOM

form.addEventListener("submit", searchForLocation); //Adding an event listener to the form

let target = 'Lucknow'; //Default location

const fetchdetails = async () => { //Function to fetch the weather details using API endpoint
    try {
        const url = 'https://api.weatherapi.com/v1/current.json?key=35c34071cf054025a5c31303262504&q=' + target + '&aqi=no'; //API URL
        const response = await fetch(url); //Fetching the API

        if (!response.ok) throw new Error("City not found"); // Handle invalid API responses

        const data = await response.json(); //Converting the API to JSON format
        let location = data.location.name; //Getting the location name from the API response
        let temp = data.current.temp_c; //Getting the temperature from the API response
        let condition = data.current.condition.text; //Getting the condition from the API response
        let time = data.location.localtime; //Getting the time from the API response
        let humidity = data.current.humidity; //Getting the humidity
        let wind = data.current.wind_kph; //Getting the wind speed
        let feelsLike = data.current.feelslike_c; //Getting the feels-like temperature
        let icon = data.current.condition.icon; //Getting the weather icon from the API

        updateWeatherData(location, temp, condition, time, humidity, wind, feelsLike, icon); //Updating the weather data
    } catch (error) {
        console.error("Failed to fetch weather data: ", error); //
    }
}

function updateWeatherData(location, temp, condition, time, humidity, wind, feelsLike, icon) { //Function to update the weather data
    timeLocationField.innerText = `${location}\n${time}`; //Updating both location and time safely
    temparatureField.innerText = `${temp}°C`; //Updating the temperature with unit symbol
    if (conditionField) conditionField.innerText = condition; //Updating the condition safely
    if (conditionIcon) conditionIcon.src = "https:" + icon; //Updating the icon safely
    if (humidityField) humidityField.innerText = `Humidity: ${humidity}%`; //Updating the humidity safely
    if (windField) windField.innerText = `Wind: ${wind} km/h`; //Updating the wind safely
    if (feelsLikeField) feelsLikeField.innerText = `Feels like: ${feelsLike}°C`; //Updating the feels-like safely
}

function searchForLocation(e) { //Function to search for location
    e.preventDefault(); //Preventing the default behavior of the form
    let inputVal = document.querySelector(".city_input").value; //Getting the value of the city input

    if (inputVal.trim() !== "") { //Ensuring we don't submit a blank location
        target = inputVal;
        fetchdetails(); //Fetching the details
    }
}
fetchdetails(); //Calling the fetchdetails function

const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");


//weather-data

/*const weather = {

    temperature : {
        value: 18,
        unit: "celsius"
    },

    description : "few clouds",
    inconId : "01d",
    city : "London",
    country : "GB"
};*/

const weather = {};
weather.temperature = {
    unit : "celsius"
}

function displayWeather(){

iconElement.innerHTML = `<img src = "icon/${weather.inconId}.png>`;
tempElement.innerHTML = `${weather.temperature.value}* <span> C </span>`;
descElement.innerHTML = weather.description;

locationElement.innerHTML = `${weather.city},<span> ${weather.country}</span>`;

}

function celsiusToFahrenheit()
{

}

tempElement.addEventListener("click", function(){

 if(weather.temperature.value === undefined)
   return;

  if(weather.temperature.unit === "celsius")
  {
     const fahrenHeitTemp = celsiusToFahrenheit(weather.temperature.value);
     fahrenHeitTemp = Math.floor(fahrenHeitTemp);
     tempElement.innerHTML = `${fahrenHeitTemp}* <span>F</span>`
     weather.temperature.unit = "fahrenheit";
  }
  else{
      tempElement.innerHTML = `${weather.temperature.value} * <span> C </span>`;
      weather.temperature.unit = "celsius";
  }

});

//getting geographic location

//getCurrentPosition(setPosition, shoeError);

function setPosition(position) {

let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
 getWeather(latitude, longitude);

}

function showError(error)
{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`
};

if("geolocation" in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
   notificationElement.style.display = "block";
   notificationElement.innerHTML = "<p> Browswer doesn't support geolocation </p>"
}

//API Provider
//open weather app;

//http://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&appid=0ebf0e29926cc939f557a936228e1129

//API request and response

const key = "82005d27a116c288c8f0fcb866998a0";
const KELVIN = 273;

function getWeather(latitude, longitude)
{
    let api =   `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api).then(function(response)
    {
        let data = response.json();
        return data;
    }).then( function(data)
    {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.inconId = data.weather[0].icon;
        weather.country = data.sys.country;
   }).then( function(){
       displayWeather();
   })
}


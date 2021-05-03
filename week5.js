// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function(event) {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)
  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`,async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location
    let locationInput = document.querySelector(`#location`)
    // - Get the user-entered location from the element's value
    let location = locationInput.value  

    // - Get a reference to the element containing the user-entered days for forecast
    let daysInput = document.querySelector(`#days`)
    // - Get the user-entered days from the element's value
    let days = daysInput.value

    console.log(location,days)
   
    // - Check to see if the user entered anything; if so:
    if(location.length>0){
      // - Construct a URL to call the WeatherAPI.com API and retrieve data for user entered location and days
      let url = `https://api.weatherapi.com/v1/forecast.json?key=5a40e006e07e4fdcb6f154007212704&q=${location}&days=${days}`
      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)
      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()
      // - Write the json-formatted data to the JavaScript console
      console.log(json)
      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let interpretedLocation = json.location
      let currentWeather = json.current
      let dailyForecast = json.forecast

      // - Get a reference to the current element
      let currentElement = document.querySelector(`.current`)
       // - Display parsed location, current temperature and current conditions 
       currentElement.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
          <div class="font-bold">
            <img src="https:${currentWeather.condition.icon}" class="inline-block">
            <span class="temperature">${currentWeather.feelslike_f}</span>° 
            and
            <span class="conditions">${currentWeather.condition.text}</span>
          </div>
        </div>`

      // - Check to see if the user entered anything; if so:
      if(days.length>0){
        // - Get a reference to the forecast element
        let forecastElement = document.querySelector(`.forecast`)
        // - Display "X" Day Forecast in the forecast element 
        forecastElement.innerHTML = `
        <div class="text-center space-y-8">
          <div class="font-bold text-3xl">${days} Day Forecast</div>
        </div>`

        // - Store forecastday data in a variable 
        dayF = dailyForecast.forecastday

        // - Using for-loop to display day-wise forecast
        for(var i=0 in dayF){ 
          // tried the conevntional let i=0...i++ format but it showed error that identifier has already been declared. Hence, looked online and tried this for-loop syntax 
          // Display day-wise data in the forecast element
          forecastElement.insertAdjacentHTML(`beforeend`,`
          <div class="text-center space-y-8">
            <div>
              <img src="https:${dayF[i].day.condition.icon}" class="mx-auto">
              <h1 class="text-2xl text-bold text-gray-500">${dayF[i].date}</h1>
              <h2 class="text-xl">High ${dayF[i].day.maxtemp_f} – Low ${dayF[i].day.mintemp_f}</h2>
              <p class="text-gray-500">${dayF[i].day.condition.text}</h1>
            </div>
          </div>`
          )
        }
      }
    }
      
    })
})
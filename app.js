const apiKey = "d1ecc3c7abf081dc1bd84f567ecb954e"

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("cityInput")

const formEl = document.querySelector("form")
var getWeather = () => {
  const cityValue = cityInputEl.value
  getWeatherData(cityValue)
}
getWeatherData = async (cityValue) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    )
    if (!response.ok) {
      throw new Error("Network response was not okay")
    }
    const data = await response.json()
    console.log(data)
    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon
    const details = [
      `Feels like : ${Math.round(data.main.feels_like)}°C`,
      `Humidity : ${data.main.humidity}%`,
      `WindSpeed : ${data.wind.speed}m/sec`,
    ]
    console.log(details)
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`
    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`
    weatherDataEl.querySelector(".description").textContent = description
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("")
  } catch (error) {}
}

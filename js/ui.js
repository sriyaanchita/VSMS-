export function updateMainUI(data, unit) {
    document.querySelector(".city-name").innerText = data.name;

    const temp = unit === "C"
        ? Math.round(data.main.temp)
        : Math.round((data.main.temp * 9/5) + 32);

    
    document.querySelector(".temp-display").innerText = `${temp}°${unit}`;

    document.querySelector(".humidity-val").innerText =
        `${data.main.humidity}%`;

    document.querySelector(".wind-val").innerText =
        `${data.wind.speed} km/h`;

    document.querySelector(".weather-desc").innerText =
        data.weather[0].description;

    document.getElementById("mainIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    document.querySelector(".date-string").innerText =
        new Date().toDateString();
}

export function updateAQI(aqiData) {
    if (!aqiData) return; 

    const val = aqiData.list[0].main.aqi;
    const map = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

    
    document.querySelector(".aqi-idx").innerText =
        `${val} - ${map[val - 1]}`;
}

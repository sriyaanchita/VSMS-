import { fetchWeather, fetchForecast, fetchAQI, fetchByCoords } from "./js/api.js";
import { updateMainUI, updateAQI } from "./js/ui.js";
import { renderHourly, renderDaily } from "./js/forecast.js";
import { getLocation } from "./js/location.js";

let currentUnit = "C";
let currentCity = "";

// 🔍 LOAD CITY
async function loadCity(city) {
    try {
        city = city.trim(); // ✅ fix

        const data = await fetchWeather(city);
        currentCity = data.name;

        updateMainUI(data, currentUnit);

        // ✅ Forecast
        const forecast = await fetchForecast(city);
       renderHourly(forecast, currentUnit);
renderDaily(forecast, currentUnit);

const aqi = await fetchAQI(data.coord.lat, data.coord.lon);
if (aqi) updateAQI(aqi);

    } catch (err) {
        showError("City not found or API issue");
    }
}

// 🔎 SEARCH BUTTON FIX
document.getElementById("searchBtn").addEventListener("click", () => {
    const val = document.getElementById("searchInput").value;
    loadCity(val);
});

// ENTER KEY
document.getElementById("searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") loadCity(e.target.value);
});

// 📍 GPS
document.getElementById("locateBtn").addEventListener("click", () => {
    getLocation(async (lat, lon) => {
        const data = await fetchByCoords(lat, lon);
        loadCity(data.name);
    });
});

document.getElementById("unitC").onclick = () => {
    currentUnit = "C";

    document.getElementById("unitC").classList.add("active-tab");
    document.getElementById("unitF").classList.remove("active-tab");

    if (currentCity) loadCity(currentCity);
};

document.getElementById("unitF").onclick = () => {
    currentUnit = "F";

    document.getElementById("unitF").classList.add("active-tab");
    document.getElementById("unitC").classList.remove("active-tab");

    if (currentCity) loadCity(currentCity);
};

// ⭐ FAVORITES (IMPROVED)
document.getElementById("favBtn").addEventListener("click", () => {
    let favs = JSON.parse(localStorage.getItem("fav")) || [];

    if (!favs.includes(currentCity)) {
        favs.push(currentCity);
        localStorage.setItem("fav", JSON.stringify(favs));
        alert("Added to favorites");
    } else {
        alert("Already in favorites");
    }
});

// ❌ ERROR UI
function showError(msg) {
    const err = document.getElementById("errorUI");
    document.getElementById("errorMessage").innerText = msg;
    err.classList.remove("hidden");
    setTimeout(() => err.classList.add("hidden"), 3000);
}


// 🚀 INIT
loadCity("Chennai");
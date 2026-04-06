const API_KEY = "39d6dee590d13d30326f7815aaaeeaed"; // 🔥 MUST BE ACTIVE

export async function fetchWeather(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("City not found");
    return res.json();
}

export async function fetchForecast(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    return res.json();
}

export async function fetchAQI(lat, lon) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    return res.json();
}

export async function fetchByCoords(lat, lon) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    return res.json();
}
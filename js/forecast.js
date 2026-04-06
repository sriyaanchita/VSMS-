export function renderHourly(data) {
    const container = document.querySelector(".hourly-container");
    container.innerHTML = "";

    for (let i = 0; i < 8; i++) {
        const item = data.list[i];

        const time = item.dt_txt.split(" ")[1].slice(0,5);

        const div = document.createElement("div");

        div.className = `
            flex flex-col items-center
            bg-white/5 p-3 rounded-xl
            min-w-[70px]
        `;

        div.innerHTML = `
            <span class="text-xs text-slate-400">${time}</span>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" class="w-8 h-8">
            <span class="font-bold">${Math.round(item.main.temp)}°</span>
        `;

        container.appendChild(div);
    }
}

export function renderDaily(data) {
    const container = document.querySelector(".daily-container");
    container.innerHTML = "";

    for (let i = 0; i < data.list.length; i += 8) {
        const item = data.list[i];

        const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "short"
        });

        const div = document.createElement("div");

        div.className = `
            flex items-center justify-between
            p-4 rounded-xl
            bg-white/5 hover:bg-white/10
            transition-all
        `;

        div.innerHTML = `
            <span class="w-16 font-semibold">${date}</span>

            <div class="flex items-center gap-3 flex-1 justify-center">
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" class="w-8 h-8">
                <span class="text-sm text-slate-400 capitalize">
                    ${item.weather[0].description}
                </span>
            </div>

            <div class="flex gap-4">
                <span class="font-bold">${Math.round(item.main.temp)}°</span>
                <span class="text-slate-500">
                    ${Math.round(item.main.temp_min)}°
                </span>
            </div>
        `;

        container.appendChild(div);
    }
}
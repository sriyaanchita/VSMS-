export function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(
        (pos) => callback(pos.coords.latitude, pos.coords.longitude),
        () => alert("Location permission denied")
    );
}
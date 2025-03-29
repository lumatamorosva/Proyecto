/*Geolocation API*/
function initMap() {
    // Verifica si el navegador soporta la geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = 9.994909;
            const lon = -84.230364;
            const shopLocation = { lat: lat, lng: lon };

            // Crear el mapa centrado
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: shopLocation
            });

            // Crear un marcador en la ubicación
            const marker = new google.maps.Marker({
                position: shopLocation,
                map: map,
                title: "Encuentranos justo aquí!"
            });
        }, function() {
            handleLocationError(true);
        });
    } else {
        handleLocationError(false);
    }
}
function handleLocationError(browserHasGeolocation) {
    alert("Error: La geolocalización falló. Asegúrate de que los permisos de locaclización estén habilitados.");
}

// Llamada inicial para cargar el mapa
initMap();
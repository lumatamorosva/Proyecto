/*Geolocation API*/
function initMap() {
            // Coordenadas de la ubicación
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
        }

// Llamada inicial para cargar el mapa
initMap();

/*Contacto*/
const listener = document.querySelector("convertlink");
listener.addEventListener("click", () => alert("This is a listener"));

function greeting(){
    alert("Hello");
}